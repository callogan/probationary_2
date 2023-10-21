import re
from collections import OrderedDict

from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import QuerySet, Count, F
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy, reverse
from django.utils import timezone
import datetime
from django.views import generic
from django.db.models import Q
from django.views.generic.base import View, TemplateView
from django.contrib import messages

from .forms import (
    TaskForm,
    TaskTypeForm,
    TaskTypeSearchForm,
    ProjectCategoryForm,
    ProjectCategorySearchForm,
    PositionForm,
    PositionSearchForm,
    WorkerCreateForm,
    ProjectForm,
    TeamForm,
    WorkerEvaluationForm,
)

from .models import Task, TaskType, ProjectCategory, Position, Worker, Project, Team, WorkerEvaluation, ProjectBlock

from .helper import (
    calculate_average_progress,
    budget_status_completed,
    budget_status_uncompleted
)


def index(request):
    """View function for the home page of the site."""

    context = {
        "num_teams": Team.objects.count(),
        "num_projects": Project.objects.count(),
        "num_workers": get_user_model().objects.count()
    }

    return render(request, "workflow_organizer/index.html", context=context)


class TaskTypeListView(LoginRequiredMixin, generic.ListView):
    model = TaskType
    template_name = "workflow_organizer/task_type_list.html"
    context_object_name = "task_type_list"
    paginate_by = 3

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(TaskTypeListView, self).get_context_data(**kwargs)
        name = self.request.GET.get("name", "")
        context["search_form"] = TaskTypeSearchForm(initial={
            "name": name
        })
        return context

    def get_queryset(self):
        queryset = TaskType.objects.all()

        form = TaskTypeSearchForm(self.request.GET)
        if form.is_valid():
            return queryset.filter(name__icontains=form.cleaned_data["name"])
        return queryset


class TaskTypeCreate(LoginRequiredMixin, generic.CreateView):
    model = TaskType
    form_class = TaskTypeForm
    template_name = "workflow_organizer/task_type_form.html"
    success_url = reverse_lazy("workflow_organizer:task-type-list")


class TaskTypeUpdate(LoginRequiredMixin, generic.UpdateView):
    model = TaskType
    form_class = TaskTypeForm
    template_name = "workflow_organizer/task_type_form.html"
    success_url = reverse_lazy("workflow_organizer:task-type-list")


class TaskTypeDelete(LoginRequiredMixin, generic.DeleteView):
    model = TaskType
    template_name = "workflow_organizer/task_type_confirm_delete.html"
    success_url = reverse_lazy("workflow_organizer:task-type-list")


class ProjectCategoryListView(LoginRequiredMixin, generic.ListView):
    model = ProjectCategory
    template_name = "workflow_organizer/project_category_list.html"
    context_object_name = "project_category_list"
    paginate_by = 3

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(ProjectCategoryListView, self).get_context_data(**kwargs)
        name = self.request.GET.get("name", "")
        context["search_form"] = ProjectCategorySearchForm(initial={
            "name": name
        })
        return context

    def get_queryset(self):
        queryset = ProjectCategory.objects.all()
        form = ProjectCategorySearchForm(self.request.GET)

        if form.is_valid():
            return queryset.filter(name__icontains=form.cleaned_data["name"])
        return queryset


class ProjectCategoryCreate(LoginRequiredMixin, generic.CreateView):
    model = ProjectCategory
    form_class = ProjectCategoryForm
    template_name = "workflow_organizer/project_category_form.html"
    success_url = reverse_lazy("workflow_organizer:project-category-list")


class ProjectCategoryUpdate(LoginRequiredMixin, generic.UpdateView):
    model = ProjectCategory
    form_class = ProjectCategoryForm
    template_name = "workflow_organizer/project_category_form.html"
    success_url = reverse_lazy("workflow_organizer:project-category-list")


class ProjectCategoryDelete(LoginRequiredMixin, generic.DeleteView):
    model = ProjectCategory
    template_name = "workflow_organizer/project_category_confirm_delete.html"
    success_url = reverse_lazy("workflow_organizer:project-category-list")


class PositionListView(LoginRequiredMixin, generic.ListView):
    model = Position
    paginate_by = 3
    template_name = "workflow_organizer/position_list.html"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(PositionListView, self).get_context_data(**kwargs)
        name = self.request.GET.get("name", "")
        context["search_form"] = PositionSearchForm(initial={
            "name": name
        })
        return context

    def get_queryset(self) -> QuerySet:
        queryset = Position.objects.all()
        form = PositionSearchForm(self.request.GET)

        if form.is_valid():
            queryset = Position.objects.filter(
                name__icontains=form.cleaned_data["name"]
            )
        return queryset


class PositionCreate(LoginRequiredMixin, generic.CreateView):
    model = Position
    form_class = PositionForm
    template_name = "workflow_organizer/position_form.html"
    success_url = reverse_lazy("workflow_organizer:position-list")


class PositionUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Position
    form_class = PositionForm
    template_name = "workflow_organizer/position_form.html"
    success_url = reverse_lazy("workflow_organizer:position-list")


class PositionDelete(LoginRequiredMixin, generic.DeleteView):
    model = Position
    template_name = "workflow_organizer/position_confirm_delete.html"
    success_url = reverse_lazy("workflow_organizer:position-list")


class TeamDetailView(LoginRequiredMixin, generic.DetailView):
    model = Team
    template_name = "workflow_organizer/team_detail.html"


class WorkerDetailView(LoginRequiredMixin, generic.DetailView):
    model = Worker
    queryset = get_user_model().objects.select_related("position")
    template_name = "workflow_organizer/worker_detail.html"

    def get(self, request, pk, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)

        form = WorkerEvaluationForm()
        worker = Worker.objects.get(pk=pk)
        last_evaluation = WorkerEvaluation.objects.filter(
            evaluator=request.user,
            worker=worker
        )
        if last_evaluation:
            last_evaluation = last_evaluation[0]
            form.fields['score'].initial = last_evaluation.score
        context["form"] = form
        context["worker"] = worker
        return self.render_to_response(context)

    def post(self, request, pk, *args, **kwargs):
        form = WorkerEvaluationForm(request.POST)
        worker = Worker.objects.get(pk=pk)
        evaluator = request.user
        evaluation: WorkerEvaluation = WorkerEvaluation.objects.filter(evaluator=evaluator, worker=worker)
        if form.is_valid():
            score = form.cleaned_data['score']
            score = int(score)
            if evaluation:
                evaluation = evaluation[0]
                evaluation.score = score
                evaluation.save()
            else:
                evaluation: WorkerEvaluation = WorkerEvaluation(evaluator=evaluator, worker=worker, score=score)
                evaluation.save()

            worker.rating_points += score
            worker.save()

        return redirect(reverse('workflow_organizer:worker-detail', kwargs={"pk": worker.pk}))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        worker = self.get_object()

        user_assignees = Task.objects.filter(assignees=self.request.user)
        worker_assignees = Task.objects.filter(assignees=worker)

        has_common_task = user_assignees.filter(pk__in=worker_assignees).exists()
        context['has_common_task'] = has_common_task
        last_rating = WorkerEvaluation.objects.filter(evaluator=self.request.user, worker=worker)
        context['last_rating'] = last_rating

        return context


class WorkerCreate(generic.CreateView):
    model = Worker
    form_class = WorkerCreateForm
    template_name = "registration/register.html"
    success_url = reverse_lazy("workflow_organizer:index")


class WorkerUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Worker
    form_class = WorkerCreateForm
    template_name = "workflow_organizer/worker_form.html"
    success_url = reverse_lazy('workflow_organizer:worker-detail')

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:worker-detail", kwargs={
            "pk": self.kwargs["pk"]
        })

    def get_object(self, queryset=None):
        worker_id = self.kwargs.get('pk')
        return get_object_or_404(Worker, id=worker_id)


class WorkerDelete(LoginRequiredMixin, generic.DeleteView):
    model = Worker
    success_url = reverse_lazy("workflow_organizer:index")
    template_name = "workflow_organizer/worker_confirm_delete.html"


class ToggleAssignTaskView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        assignee = request.user
        task = Task.objects.get(id=self.kwargs['pk'])

        if task in assignee.tasks.all():
            assignee.tasks.remove(task)
        else:
            assignee.tasks.add(task)

        return redirect(reverse_lazy('workflow_organizer:task-detail', kwargs={'pk': self.kwargs['pk']}))


class TaskDetailView(LoginRequiredMixin, generic.DetailView):
    model = Task
    queryset = Task.objects.select_related(
        "task_type"
    ).prefetch_related("assignees")
    template_name = "workflow_organizer/task_detail.html"


class TaskCreate(LoginRequiredMixin, generic.CreateView):
    model = Task
    form_class = TaskForm
    template_name = "workflow_organizer/task_form.html"
    success_url = reverse_lazy("workflow_organizer:task-panel")

    def post(self, request, *args, **kwargs):
        self.object = None
        form = TaskForm(request.POST)
        if form.is_valid():
            obj = form.save(commit=False)

            obj.user = request.user

            obj.save()
            form.save_m2m()

            return self.form_valid(form)

        else:
            return self.form_invalid(form)


class TaskUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Task
    form_class = TaskForm
    template_name = "workflow_organizer/task_form.html"

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:task-detail", kwargs={
            "pk": self.kwargs["pk"]
        })

    def post(self, request, *args, **kwargs):
        form = TaskForm(request.POST, instance=self.get_object())
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            if obj is not None:
                obj.save()
                form.save_m2m()
        return super().post(request, *args, **kwargs)


class TaskDelete(LoginRequiredMixin, generic.DeleteView):
    model = Task
    success_url = reverse_lazy("workflow_organizer:index")
    template_name = "workflow_organizer/task_confirm_delete.html"


class DashboardView(TemplateView):
    template_name = "workflow_organizer/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        teams = Team.objects.annotate(projects_count=Count("projects"))
        context["projects"] = Project.objects.select_related("team")
        context["teams"] = teams

        return context


class TaskPanelView(TemplateView):
    template_name = "workflow_organizer/task_panel.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        tag = self.request.GET.get("tag") or ""
        tags = Task.tags.filter(name=tag) if tag else Task.tags.all()

        if tag:
            queue_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(assignees_count=0, tags__name=tag) \
                .distinct()
        else:
            queue_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(assignees_count=0) \
                .distinct()

        if tag:
            underway_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(Q(is_completed=False) & Q(assignees_count__gt=0),
                        tags__name=tag) \
                .distinct()
        else:
            underway_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(Q(is_completed=False) & Q(assignees_count__gt=0)) \
                .distinct()

        if tag:
            completed_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(is_completed=True, assignees_count__gt=0, tags__name=tag) \
                .distinct()
        else:
            completed_tasks = Task.objects.annotate(assignees_count=Count("assignees")) \
                .filter(is_completed=True, assignees_count__gt=0).distinct()

        context['queue_tasks'] = queue_tasks
        context['underway_tasks'] = underway_tasks
        context['completed_tasks'] = completed_tasks
        context['tags'] = tags

        return context


class ProjectTrackingPanelView(TemplateView):
    template_name = "workflow_organizer/project_tracking_panel.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        total_projects = Project.objects.all()
        completed_projects_number = Project.objects.filter(progress=100).count()

        completed_projects = Project.objects.filter(progress=100)
        uncompleted_projects = Project.objects.filter(~Q(progress=100))

        average_progress_uncompleted = calculate_average_progress(uncompleted_projects)

        predominant_status_completed, average_percent_completed = budget_status_completed(completed_projects)
        predominant_status_uncompleted, average_percent_uncompleted = budget_status_uncompleted(uncompleted_projects)

        progress_list = []
        for project in Project.objects.all():
            if project.progress == 100:
                progress_list.append(100)
            elif project.progress:
                progress_list.append(project.progress)
            else:
                progress_list.append(0)

        context['total_projects'] = total_projects
        context['completed_projects_number'] = completed_projects_number
        context['progress'] = progress_list
        context['time_constraints'] = Project.objects.values_list('time_constraints', flat=True)
        context['funds'] = Project.objects.values_list('budget', flat=True)
        context['average_progress_uncompleted'] = average_progress_uncompleted
        context['predominant_status_completed'] = predominant_status_completed
        context['average_percent_completed'] = average_percent_completed
        context['predominant_status_uncompleted'] = predominant_status_uncompleted
        context['average_percent_uncompleted'] = average_percent_uncompleted

        return context


class WorkersListView(LoginRequiredMixin, generic.ListView):
    model = Worker
    template_name = 'workflow_organizer/workers_list.html'
    context_object_name = 'users'
    ordering = ['-rating_points']
    paginate_by = 10

    def get_queryset(self):
        users = super().get_queryset()
        users = users.annotate(place=F('id'))

        return users

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        top_workers = context['object_list'][:3]
        other_workers = context['object_list'][3:]

        context['top_users'] = top_workers
        context['other_users'] = other_workers

        first_place_worker = top_workers[0] if top_workers else None
        second_place_worker = top_workers[1] if len(top_workers) > 1 else None
        third_place_worker = top_workers[2] if len(top_workers) > 2 else None

        context['first_place_worker'] = first_place_worker
        context['second_place_worker'] = second_place_worker
        context['third_place_worker'] = third_place_worker

        return context


class ProjectDetailView(generic.DetailView):
    model = Project
    template_name = "workflow_organizer/project_detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        project = context['object']  # Получаем текущий объект Project из контекста

        # Определяем текущую фазу проекта на основе прогресса
        if project.get_project_progress() == 100:
            current_phase = "Завершено"
        elif project.get_project_progress():
            current_phase = "Фаза реализации"
        else:
            current_phase = "Не начат"

        context["current_phase"] = current_phase  # Добавляем текущую фазу в контекст

        now = timezone.now()

        deadline = project.time_constraints
        deadline = datetime.datetime(deadline.year, deadline.month, deadline.day, tzinfo=timezone.utc)

        diff = deadline - now
        if diff.days > 0:
            context['days_left'] = diff.days
        else:
            context['passed_deadline'] = True

        context["budget"] = project.budget
        context["funds_used"] = project.funds_used

        # overrun = project.funds_used - project.budget
        # overrun_percent = overrun / project.budget * 100
        # context['overrun_percent'] = overrun_percent

        if project.funds_used > project.budget:
            overrun = project.funds_used - project.budget
            overrun_percent = overrun / project.budget * 100
            context['overrun'] = overrun
            context['overrun_text'] = f'Бюджет превышен на {overrun_percent}%'
            context['overrun_percent'] = overrun_percent

        elif project.funds_used <= project.budget:
            used_percent = project.funds_used / project.budget * 100
            progress_percent = project.funds_used / project.budget * 100
            context['used_text'] = f'Израсходовано {used_percent}% средств от бюджета'
            context['progress_percent'] = progress_percent

        # context["overrun"] = overrun

        context["completed_projects"] = Project.objects.filter(progress=100).count()
        return context


class ProjectCreate(LoginRequiredMixin, generic.CreateView):
    queryset = Project.objects.all()
    model = Project
    form_class = ProjectForm
    template_name = "workflow_organizer/project_form_create.html"

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:dashboard")

    def form_invalid(self, form):
        return super().form_invalid(form)

    def get(self, *args, **kwargs):
        blocks = ProjectBlock.predefined_blocks()
        form = ProjectForm()

        context = {
            'form': form,
            'project_blocks': blocks,
            'object': None
        }

        return render(self.request, 'workflow_organizer/project_form_create.html', context)

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            form = ProjectForm(request.POST)
            if form.is_valid():
                project = form.save()
                project.user = request.user
                # project.save()

                selected_blocks = form.cleaned_data['project_blocks']
                predefined_blocks = ProjectBlock.predefined_blocks()

                new_block_names = set()  # Используем множество для автоматического удаления дубликатов

                keys = []

                indices = [block['index'] for block in predefined_blocks]

                for index in indices:
                    keys.append(f'block_{index}_completed_tasks')
                    keys.append(f'block_{index}_total_tasks')

                for key in keys:
                    # Извлекаем индекс из ключа
                    block_index = int(key.split('_')[1])

                    # Проверяем, что block_index существует в form.data по ключу new_project_blocks
                    if str(block_index) in form.data.getlist('project_blocks', []):
                        for block in predefined_blocks:
                            if block['index'] == block_index:
                                new_block_names.add(block['name'])

                    for key in keys:
                        if key in form.data and form.data[key]:
                            block_index = int(key.split('_')[1])

                            for block in predefined_blocks:
                                if block['index'] == block_index:
                                    new_block_names.add(block['name'])

                new_block_names = list(new_block_names)

                #ИНДЕКСЫ И КОРРЕСПОНДИРУЮЩИЕ ИМЕНА ВСЕХ ВВЕДЁННЫХ БЛОКОВ
                block_name_id_corp = {}

                # Добавьте новые блоки в словарь
                for block_name in new_block_names:
                    for predefined_block in predefined_blocks:
                        if predefined_block['name'] == block_name:
                            block_name_id_corp[predefined_block['index']] = block_name

                row_new_blocks = [key for key in block_name_id_corp.keys() if isinstance(key, int)]

                # VALIDATION MAP

                checked_blocks = {}
                if 'project_blocks' in form.data:
                    value = form.data.getlist('project_blocks')

                    if isinstance(value, list):
                        checked_blocks['project_blocks'] = value
                    else:
                        checked_blocks['project_blocks'] = [value]

                # Создайте словарь для группировки ключей с одинаковыми цифрами
                block_keys = {}

                for key in form.data:
                    parts = key.split('_')

                    if parts[0] == 'block':
                        block_num = parts[1]
                    else:
                        continue

                    if block_num not in block_keys:
                        block_keys[block_num] = []

                    if form.data[key] != '':
                        block_keys[block_num].append(key)

                    if 'blocks' in block_keys:
                        del block_keys['blocks']

                    to_delete = []
                    for k, v in block_keys.items():
                        if not v:
                            to_delete.append(k)

                    for k in to_delete:
                        del block_keys[k]

                validation_map = {}
                for key, values in block_keys.items():
                    validation_map[key] = values

                for checked_key, checked_values in checked_blocks.items():
                    for i in range(len(checked_values)):
                        value = checked_values[i]

                        if value not in validation_map:
                            validation_map[value] = [checked_key]

                for checked_key, checked_values in checked_blocks.items():

                    for value in checked_values:

                        if isinstance(value, list):
                            # значение - список

                            for v in value:
                                if v in validation_map and checked_key not in validation_map[v]:
                                    validation_map[v].append(checked_key)

                        else:
                            # значение - строка
                            if value in validation_map and checked_key not in validation_map[value]:
                                validation_map[value].append(checked_key)

                sorted_validation_map = {int(key): value for key, value in validation_map.items()}
                validation_map = dict(sorted(sorted_validation_map.items(), key=lambda item: item[0]))

                # END VALIDATION MAP BLOCK

                def get_expected_fields(project_id):

                    if 0 <= int(project_id) <= 6:
                        fields_ = [f'block_{project_id}_total_tasks', 'project_blocks']

                    return fields_

                new_blocks = sorted(row_new_blocks)

                initial_errors_blocks = []
                initial_errors_tasks = []

                #peremptory one block to chose validation
                if not form.data.get('project_blocks'):
                    initial_errors_blocks.append("Необходимо выбрать хотя бы один блок проекта")

                any_tasks_filled = False
                for field in form.data:
                    if field.startswith('block_') and field.endswith('_total_tasks'):
                        if form.data[field]:
                            any_tasks_filled = True
                            break

                if not any_tasks_filled:
                    initial_errors_tasks.append("Необходимо заполнить хотя бы одно поле количества задач для блоков")

                if initial_errors_blocks or initial_errors_tasks:
                    for error in initial_errors_blocks:
                        messages.error(request, error)
                    for error in initial_errors_tasks:
                        messages.error(request, error)

                    form = ProjectForm(data=request.POST)

                    blocks = ProjectBlock.predefined_blocks()

                    context = {
                        'form': form,
                        'project': project,
                        'project_blocks': blocks,
                    }

                    return render(request, 'workflow_organizer/project_form_create.html', context)


                #Main validation logic

                errors_blocks = []
                errors_tasks = []
                expected_fields = []

                for id, fields in validation_map.items():
                    # if int(id) < len(new_blocks):
                    expected_fields = get_expected_fields(id)

                    #ПРОПУЩЕННЫЕ ПРИ ВВЕДЕНИИ ПОЛЯ
                    missing_fields = set(expected_fields) - set(fields)

                    for field in missing_fields:
                        if field == 'project_blocks':
                            message = f"Необходимо поставить галочку возле Блока проекта {block_name_id_corp[int(id)]}"
                            messages.error(request, message)
                            errors_blocks.append(message)
                        if field.startswith('block_') and field.endswith('_total_tasks'):
                            block_index = field.split('_')[1]
                            message = f"Необходимо заполнить поле total_tasks у Блока проекта {block_name_id_corp[int(block_index)]}"
                            messages.error(request, message)
                            errors_tasks.append(message)

                if not errors_blocks and not errors_tasks and not initial_errors_blocks and not initial_errors_tasks:
                    block = None
                    for id, fields in validation_map.items():
                        block_data = ProjectBlock.predefined_blocks()[id]
                        total_tasks_field_name = f'block_{id}_total_tasks'
                        form_total_tasks = form.data.get(total_tasks_field_name)
                        total_tasks = int(form_total_tasks or 0)

                        ProjectBlock.objects.create(
                            project=project,
                            name=block_data['name'],
                            depiction='Functional block',
                            total_tasks=total_tasks,
                            completed_tasks=0
                        )

                        print(form.data)
                        print("ROW DATA")
                        print(form.cleaned_data)
                        print("CLEANED DATA")
                        assigned_to = form.cleaned_data.get(f'block_{id}_assigned')
                        if block and assigned_to:
                            block.assigned_to = assigned_to

                            if block is not None:
                                block.save()

                    form.save()

                    return redirect('workflow_organizer:project-detail', pk=project.pk)
                else:
                    blocks = ProjectBlock.predefined_blocks()
                    context = {
                        'form': form,
                        'project_blocks': blocks
                    }
                    return render(request, 'workflow_organizer/project_form_create.html', context)

class ProjectUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Project
    form_class = ProjectForm
    template_name = "workflow_organizer/project_form_update.html"

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:project-detail", kwargs={
            "pk": self.kwargs["pk"]
        })

    def get(self, request, *args, **kwargs):
        project = get_object_or_404(Project, pk=kwargs['pk'])
        form = ProjectForm(instance=project)
        blocks = ProjectBlock.predefined_blocks()

        predefined_blocks = ProjectBlock.predefined_blocks()
        all_blocks = project.projectblock_set.all()

        selected_names = []

        for block in all_blocks:
            name = block.name
            selected_names.append(name)

        name_to_real_blocks = {b.name: b for b in project.projectblock_set.all()}
        existing_names = list(name_to_real_blocks.keys())

        name = form.data.get('name')
        depiction = form.data.get('depiction')
        team = form.data.get('team')
        time_constraints = form.data.get('time_constraints')
        priority = form.data.get('priority')
        project_category = form.data.get('project_category')
        budget = form.data.get('budget')
        funds_used = form.data.get('funds_used')
        progress = form.data.get('progress')

        total_tasks_sum = 0
        completed_tasks_sum = 0

        for block in project.projectblock_set.all():
            total_tasks_input_name = f'block_{block.id}_total_tasks'
            completed_tasks_input_name = f'block_{block.id}_completed_tasks'

            total_tasks = form.data.get(total_tasks_input_name)
            completed_tasks = form.data.get(completed_tasks_input_name)

            if total_tasks is not None:
                total_tasks_sum += total_tasks

            if completed_tasks is not None:
                completed_tasks_sum += completed_tasks

        context = {
            'form': form,
            'project_blocks': blocks,
            'object': project,
            'existing_names': existing_names,
            "name": name,
            "depiction": depiction,
            "team": team,
            "time_constraints": time_constraints,
            "priority": priority,
            "project_category": project_category,
            "budget": budget,
            "funds_used": funds_used,
            "progress": progress,
            "existing_blocks": all_blocks,
            "predefined_blocks": predefined_blocks
        }

        return render(request, 'workflow_organizer/project_form_update.html', context)

    def post(self, request, *args, **kwargs):

        if request.method == 'POST':
            project = get_object_or_404(Project, pk=kwargs['pk'])

            form = ProjectForm(request.POST, instance=self.get_object())

            if form.is_valid():

                project = form.save()
                project.user = request.user

                name_to_real_blocks = {b.name: b for b in project.projectblock_set.all()}
                existing_names = list(name_to_real_blocks.keys())

                blocks = ProjectBlock.predefined_blocks()
                all_blocks = project.projectblock_set.all()

                predefined_blocks = ProjectBlock.predefined_blocks()

                # Названия существующих ключей, которые были выбраны при редактировании (галочка и/или числовые инпуты)
                block_names = set()  # Используем множество для автоматического удаления дубликатов

                for block in all_blocks:
                    keys = [f'block_{block.id}_completed_tasks', f'block_{block.id}_total_tasks']

                    # Добавляем имя блока в block_names, если block.id существует в form.data['existing_project_blocks']
                    if str(block.id) in form.data.get('existing_project_blocks', []):
                        block_names.add(block.name)

                    for key in keys:
                        if key in form.data and form.data[key]:
                            block_names.add(block.name)

                #ИМЕНА СУЩЕСТВУЮЩИХ ВЫБРАННЫХ БЛОКОВ
                block_names = list(block_names)

                # генерация имён новых блоков
                new_block_names = set()  # Используем множество для автоматического удаления дубликатов

                keys = []

                indices = [block['index'] for block in predefined_blocks]

                for index in indices:
                    keys.append(f'new_block_{index}_completed_tasks')
                    keys.append(f'new_block_{index}_total_tasks')

                for key in keys:
                    # Извлекаем индекс из ключа
                    block_index = int(key.split('_')[2])

                    # Проверяем, что block_index существует в form.data по ключу new_project_blocks
                    if str(block_index) in form.data.getlist('new_project_blocks', []):
                        for block in predefined_blocks:
                            if block['index'] == block_index:
                                new_block_names.add(block['name'])

                    for key in keys:
                        if key in form.data and form.data[key]:
                            block_index = int(key.split('_')[2])

                            for block in predefined_blocks:
                                if block['index'] == block_index:
                                    new_block_names.add(block['name'])

                new_block_names = list(new_block_names)

                # Создайте словарь на основе old_block_names и new_block_names
                block_name_id_corp = {}

                # Создайте словарь на основе введённых блоков, которые существуют на момент редактирования
                for block_name in block_names:
                    blocks = ProjectBlock.objects.filter(name=block_name)

                    for block in blocks:
                        # Извлекаем индекс из строки 'block_{block.id}_completed_tasks' и 'block_{block.id}_total_tasks'
                        index = block.id
                        completed_tasks_key = f'block_{index}_completed_tasks'
                        total_tasks_key = f'block_{index}_total_tasks'

                        if (str(index) in form.data.get('existing_project_blocks', [])
                                or form.data.get(completed_tasks_key, '') != ''
                                or form.data.get(total_tasks_key, '') != ''):
                            block_name_id_corp[index] = block_name

                # Добавьте новые блоки в словарь
                for block_name in new_block_names:
                    for predefined_block in predefined_blocks:
                        if predefined_block['name'] == block_name:
                            block_name_id_corp[predefined_block['index']] = block_name

                new_blocks = [key for key in block_name_id_corp.keys() if isinstance(key, int) and 0 <= key <= 6]

                selected_names = block_names + new_block_names

                # VALIDATION MAP BLOCK

                # Печать найденных цифр
                # Преобразование словаря в список кортежей ключ-значение и фильтрация значений
                # Создайте список словарей для хранения ключей и их соответствующих значений
                checked_blocks = {}
                for key in ['existing_project_blocks', 'new_project_blocks']:
                    if key in form.data:
                        value = form.data.getlist(key)

                        if isinstance(value, list):
                            checked_blocks[key] = value
                        else:
                            checked_blocks[key] = [value]

                # Создайте словарь для группировки ключей с одинаковыми цифрами
                block_keys = {}

                for key in form.data:
                    parts = key.split('_')

                    if parts[0] == 'block':
                        block_num = parts[1]
                    elif parts[0] == 'new':
                        block_num = parts[2]
                    else:
                        continue

                    if block_num not in block_keys:
                        block_keys[block_num] = []

                    if form.data[key] != '':
                        block_keys[block_num].append(key)

                    if 'blocks' in block_keys:
                        del block_keys['blocks']

                    to_delete = []
                    for k, v in block_keys.items():
                        if not v:
                            to_delete.append(k)

                    for k in to_delete:
                        del block_keys[k]

                validation_map = {}
                for key, values in block_keys.items():
                    validation_map[key] = values

                for checked_key, checked_values in checked_blocks.items():
                    for i in range(len(checked_values)):
                        value = checked_values[i]

                        if value not in validation_map:
                            validation_map[value] = [checked_key]

                for checked_key, checked_values in checked_blocks.items():

                    for value in checked_values:

                        if isinstance(value, list):
                            # значение - список

                            for v in value:
                                if v in validation_map and checked_key not in validation_map[v]:
                                    validation_map[v].append(checked_key)

                        else:
                            # значение - строка
                            if value in validation_map and checked_key not in validation_map[value]:
                                validation_map[value].append(checked_key)

                # END OF VALIDATION MAP BLOCK
                def get_expected_fields(project_id):

                    if 0 <= int(project_id) <= 6:
                        fields_ = [f'new_block_{project_id}_total_tasks', f'new_block_{project_id}_completed_tasks',
                                   'new_project_blocks']
                    else:
                        fields_ = [f'block_{project_id}_total_tasks', f'block_{project_id}_completed_tasks',
                                   'existing_project_blocks']

                    return fields_

                #deletion block
                if selected_names:
                    delete_block = False

                    for block in project.projectblock_set.all():
                        if block.name not in selected_names:

                            if validation_map:
                                has_total_tasks = False
                                has_project_blocks = False

                                for key, value in validation_map.items():
                                    if isinstance(value, list):

                                        for item in value:
                                            if (item.startswith('new_') and item.endswith('_total_tasks')) or (item.startswith('block_') and item.endswith('_total_tasks')):
                                                has_total_tasks = True

                                            if item == 'new_project_blocks' or item == 'existing_project_blocks':
                                                has_project_blocks = True

                                if has_total_tasks and has_project_blocks:
                                    delete_block = True

                        if delete_block:
                            block.delete()

                else:
                    messages.error(request, "Project has to have at least one block")
                    return redirect('workflow_organizer:project-update', pk=project.pk)

                for name in selected_names:
                    if name not in existing_names:
                        #validation block
                        for id, fields in validation_map.items():
                            if len(fields) < 3:
                                expected_fields = get_expected_fields(id)  # Здесь предполагается, что у вас есть функция get_expected_fields

                                # Проверяем, что все ожидаемые поля присутствуют в fields
                                missing_fields = set(expected_fields) - set(fields)

                                for field in missing_fields:
                                    if field.startswith('new_') and field.endswith('_total_tasks'):
                                        message = f"Необходимо заполнить поле total_tasks у Блока проекта {block_name_id_corp[int(block_index)]}"
                                        # Проверяем, нет ли такого сообщения в стеке
                                        existing_messages = [str(msg) for msg in messages.get_messages(request)]
                                        if message not in existing_messages:
                                            messages.error(request, message)
                                    if field == 'new_project_blocks':
                                        # Сообщение об ошибке для отсутствия отмеченного блока проекта
                                        message = f"Необходимо поставить галочку возле Блока проекта {block_name_id_corp[int(id)]}"
                                        # Проверяем, нет ли такого сообщения в стеке
                                        existing_messages = [str(msg) for msg in messages.get_messages(request)]
                                        if message not in existing_messages:
                                            messages.error(request, message)

                            else:
                                if int(id) in new_blocks:
                                    index = id

                                    if "block__total_tasks" in form.data:
                                        total_tasks = dict(form.data)["block__total_tasks"][int(index)]
                                    else:
                                        # Обработка случая, когда ключ отсутствует в QueryDict
                                        total_tasks = None  # или какое-либо другое значение по умолчанию
                                    if total_tasks is not None and total_tasks.isdigit():
                                        total_tasks = int(total_tasks)
                                    else:
                                        total_tasks = 0

                                    total_tasks = form.data[
                                        f'new_block_{predefined_blocks[int(index)]["index"]}_total_tasks']

                                    total_tasks_str = form.data.get(
                                        f'new_block_{predefined_blocks[int(index)]["index"]}_total_tasks', '')
                                    if total_tasks_str:
                                        total_tasks_value = int(total_tasks_str)
                                    else:
                                        total_tasks_value = 0

                                    new_project_block = ProjectBlock.objects.create(
                                        project=project,
                                        name=name,
                                        depiction='Some depiction',
                                        total_tasks=total_tasks_value,
                                        completed_tasks=0
                                    )

                                    new_project_block.save()

                    else:
                        for id, fields in validation_map.items():
                            if len(fields) < 3:
                                expected_fields = get_expected_fields(id)  # Здесь предполагается, что у вас есть функция get_expected_fields

                                # Проверяем, что все ожидаемые поля присутствуют в fields
                                missing_fields = set(expected_fields) - set(fields)

                                for field in missing_fields:
                                    if field.startswith('block_') and field.endswith('_total_tasks'):
                                        # Сообщение об ошибке для отсутствующего total_tasks в блоке проекта
                                        block_index = field.split('_')[1]
                                        message = f"Необходимо заполнить поле total_tasks у Блока проекта {block_name_id_corp[int(block_index)]}"
                                        # Проверяем, нет ли такого сообщения в стеке
                                        existing_messages = [str(msg) for msg in messages.get_messages(request)]
                                        if message not in existing_messages:
                                            messages.error(request, message)
                                    if field.startswith('block_') and field.endswith('_completed_tasks'):
                                        # Сообщение об ошибке для отсутствующего completed_tasks в блоке проекта
                                        block_index = field.split('_')[1]
                                        message = f"Необходимо заполнить поле completed_tasks у Блока проекта {block_name_id_corp[int(block_index)]}"
                                        # Проверяем, нет ли такого сообщения в стеке
                                        existing_messages = [str(msg) for msg in messages.get_messages(request)]
                                        if message not in existing_messages:
                                            messages.error(request, message)
                                    if field == 'existing_project_blocks':
                                        message = f"Необходимо поставить галочку возле Блока проекта {block_name_id_corp[int(id)]}"
                                        # Проверяем, нет ли такого сообщения в стеке
                                        existing_messages = [str(msg) for msg in messages.get_messages(request)]
                                        if message not in existing_messages:
                                            messages.error(request, message)

                                # processed = True


                                # context = {
                                #     'form': form,
                                #     'project': project,
                                #     'project_blocks': blocks,
                                #     'predefined_blocks': predefined_blocks,
                                #     'existing_names': existing_names,
                                #     'existing_blocks': all_blocks,
                                #     'selected_names': selected_names
                                # }
                                # return render(request, 'workflow_organizer/project_form_update.html', context)

                            else:

                                block = name_to_real_blocks[name]
                                completed_tasks = int(form.data.get(f'block_{block.id}_completed_tasks') or 0)
                                total_tasks = int(form.data.get(f'block_{block.id}_total_tasks') or 0)

                                if completed_tasks <= total_tasks:
                                    block.completed_tasks = str(completed_tasks)
                                    block.total_tasks = str(total_tasks)
                                    block.save()
                                else:
                                    # В случае превышения completed_tasks над total_tasks
                                    # Добавьте сообщение об ошибке
                                    # error_message = "Количество выполненных заданий не может превышать общее количество заданий."
                                    error_message = "Completed tasks cannot exceed total tasks"
                                    messages.error(request, error_message)

                                    context = {
                                        'form': form,
                                        'project': project,
                                        'project_blocks': blocks,
                                        'predefined_blocks': predefined_blocks,
                                        'existing_names': existing_names,
                                        'existing_blocks': all_blocks,
                                        'selected_names': selected_names
                                    }
                                    return render(request, 'workflow_organizer/project_form_update.html', context)

                project.save()

                # Определение контекста
                context = {
                    'form': form,
                    'project': project,
                    'project_blocks': blocks,
                    'predefined_blocks': predefined_blocks,
                    'existing_names': existing_names,
                    'existing_blocks': all_blocks,
                    'selected_names': selected_names
                }

                print(form.data)
                print("ROW DATA")
                print(form.cleaned_data)
                print("CLEANED DATA")
                # Рендеринг с использованием контекста
                return render(request, 'workflow_organizer/project_detail.html', context)


class ProjectDelete(LoginRequiredMixin, generic.DeleteView):
    model = Project
    success_url = reverse_lazy("workflow_organizer:dashboard")
    template_name = "workflow_organizer/project_confirm_delete.html"


class ToggleAssignProjectView(LoginRequiredMixin, View):

    def get(self, request, *args, **kwargs):
        team = request.user.team
        project = Project.objects.get(id=self.kwargs['pk'])

        if project in team.projects.all():
            team.projects.remove(project)
        else:
            team.projects.add(project)

        return redirect(reverse_lazy('workflow_organizer:project-detail', kwargs={'pk': self.kwargs['pk']}))


class TeamCreate(LoginRequiredMixin, generic.CreateView):
    model = Team
    form_class = TeamForm
    success_url = reverse_lazy("workflow_organizer:dashboard")


class TeamUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Team
    form_class = TeamForm
    template_name = "workflow_organizer/team_form.html"

    def get_success_url(self):
        return reverse('workflow_organizer:dashboard',
                       kwargs={'pk': self.object.pk})


class TeamDelete(LoginRequiredMixin, generic.DeleteView):
    model = Team
    success_url = reverse_lazy("workflow_organizer:dashboard")
    template_name = "workflow_organizer/team_confirm_delete.html"


class ToggleAddToTeamView(LoginRequiredMixin, View):

    def get(self, request, *args, **kwargs):
        worker = Worker.objects.get(id=self.kwargs['pk'])
        team_id = kwargs['team_id']
        team = get_object_or_404(Team, pk=team_id)
        if worker in team.workers.all():
            # Удаление
            team.workers.remove(worker)
            team.save()

        else:
            # Добавление
            team.workers.add(worker)
            team.save()

        return redirect(reverse_lazy('workflow_organizer:worker-detail', kwargs={'pk': worker.id}))


class SwitchTeamView(LoginRequiredMixin, View):

    def post(self, request, *args, **kwargs):
        user = request.user
        new_team = Team.objects.filter(id=self.kwargs['pk']).first()

        action = self.kwargs['action']

        if action == 'delete':
            # Пользователь покидает команду
            new_team.members.remove(user)
            new_team.save()

        else:
            # Поступить в новую команду
            new_team.members.add(user)
            new_team.save()

        return redirect('workflow_organizer:dashboard')
