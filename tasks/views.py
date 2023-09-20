from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import transaction
from django.db.models import QuerySet, Count, F
from django.http import HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy, reverse
from django.views import generic
from django.db.models import Q
from django.views.generic.base import View, TemplateView

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

from .models import Tag, Task, TaskType, ProjectCategory, Position, Worker, Project, Team, WorkerEvaluation, \
    ProjectBlock

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

    def get_object(self, queryset=None):
        # Получаем объект Team
        team = super().get_object(queryset)

        # Получаем всех связанных с командой Worker
        team.workers = team.worker_set.all()

        return team


class WorkerDetailView(LoginRequiredMixin, generic.DetailView):
    model = Worker
    queryset = get_user_model().objects.select_related("position")
    template_name = "workflow_organizer/worker_detail.html"

    # Получите данные о пользователе и воркере
    # user = request.user
    # worker = get_object_or_404(Worker, id=worker_id)

    # Получите список общих команд
    # common_teams = user.teams.filter(id__in=worker.teams.all())

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

    # context = {
    #     'user_teams': user.teams.all(),
    #     'common_teams': common_teams,
    # }
    #
    # return render(request, 'worker_detail.html', context)


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
        context["completed_projects"] = Project.objects.filter(progress=100).count()
        return context


class ProjectCreate(LoginRequiredMixin, generic.CreateView):
    queryset = Project.objects.all()
    form_class = ProjectForm
    template_name = "workflow_organizer/project_form.html"

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:dashboard")

    def form_invalid(self, form):
        return super().form_invalid(form)

    def post(self, request, *args, **kwargs):
        self.object = None
        form = ProjectForm(request.POST)
        if form.is_valid():
            with transaction.atomic():
                obj = form.save(commit=False)
                obj.user = request.user
                obj.save()

                block_data = [
                    {'name': 'Блок 1', 'description': 'Описание блока 1'},
                    {'name': 'Блок 2', 'description': 'Описание блока 2'},
                    # Добавьте другие блоки, если необходимо
                ]

                for block_info in block_data:
                    block = ProjectBlock.objects.create(project=obj, **block_info)
                    Task.objects.create(project=obj, block=block, description=f"Задание 1 в блоке {block.name}", is_completed=False)
                    Task.objects.create(project=obj, block=block, description=f"Задание 2 в блоке {block.name}", is_completed=False)
                    Task.objects.create(project=obj, block=block, description=f"Задание 3 в блоке {block.name}", is_completed=False)

            return redirect(self.get_success_url())
        return self.form_invalid(form)


class ProjectUpdate(LoginRequiredMixin, generic.UpdateView):
    model = Project
    form_class = ProjectForm
    template_name = "workflow_organizer/project_form.html"

    def get_success_url(self):
        return reverse_lazy("workflow_organizer:project-detail", kwargs={"pk": self.kwargs["pk"]})

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = ProjectForm(request.POST, instance=self.object)
        if form.is_valid():
            with transaction.atomic():
                obj = form.save(commit=False)
                obj.user = request.user
                obj.save()

                blocks = obj.projectblock_set.all()
                for block in blocks:
                    new_task_count = form.cleaned_data[f'block_{block.id}_task_count']
                    # Обновите количество заданий с is_completed=False для каждого блока
                    Task.objects.filter(block=block, is_completed=False).delete()
                    for _ in range(new_task_count):
                        Task.objects.create(block=block, description=f"Новое задание в блоке {block.name}", is_completed=False)

            return redirect(self.get_success_url())
        return super().post(request, *args, **kwargs)


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
        user = Worker.objects.get(id=self.kwargs['pk'])

        try:
            team = request.user.team
            if user in team.workers.all() or not request.user.team.exists():
                team.workers.remove(user)
            else:
                team.workers.add(user)

        except Team.DoesNotExist:
            return HttpResponseBadRequest("User is not associated with any team")

        return redirect(reverse_lazy('workflow_organizer:worker-detail', kwargs={'pk': self.kwargs['pk']}))


class SwitchTeamView(LoginRequiredMixin, View):

    def post(self, request, *args, **kwargs):
        user = request.user
        new_team = Team.objects.filter(id=self.kwargs['pk']).first()

        user.team = new_team
        user.save()

        return redirect('workflow_organizer:dashboard')
