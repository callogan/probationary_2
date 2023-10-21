from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from taggit.forms import TagField

from .models import Task, Project, TaskType, Position, Worker, Team, WorkerEvaluation, ProjectCategory, ProjectBlock


class DateInput(forms.DateInput):
    input_type = "date"


class WorkerCreateForm(UserCreationForm):
    username = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            "placeholder": "Username*",
            "style": "padding: 10px"
        }),
        label="",
        required=True
    )
    first_name = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            "placeholder": "First Name*",
            "style": "padding: 10px"
        }),
        label="",
        required=True
    )
    last_name = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            "placeholder": "Last Name*",
            "style": "padding: 10px"
        }),
        label="",
        required=True
    )
    email = forms.EmailField(widget=forms.EmailInput(attrs={
            "placeholder": "Email*",
            "style": "padding: 10px"
        }),
        required=True,
        label=""
    )
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            "placeholder": "Password*",
            "style": "padding: 10px"
        }),
        label="",
        required=True
    )
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            "placeholder": "Confirm password*",
            "style": "padding: 10px"
        }),
        label="",
        required=True
    )
    position = forms.ModelChoiceField(
        widget=forms.Select(attrs={"style": "padding: 10px;"}),
        queryset=Position.objects.all(),
        required=False
    )
    team = forms.ModelChoiceField(
        widget=forms.Select(attrs={"style": "padding: 10px;"}),
        queryset=Team.objects.all(),
        required=False
    )

    rating_points = forms.IntegerField(initial=0, required=False)

    class Meta(UserCreationForm.Meta):
        model = Worker
        fields = UserCreationForm.Meta.fields + (
            "first_name", "last_name", "position", "team", "rating_points", "email", "password1", "password2"
        )


class WorkerRatingPointsUpdateForm(forms.ModelForm):
    class Meta:
        model = Worker
        fields = ['rating_points']


class TaskForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }),
        label="",
        required=True
    )
    depiction = forms.CharField(widget=forms.Textarea(attrs={
        "placeholder": "Depiction*",
        "style": "padding: 10px; height: 100px"
    }),
        label=""
    )
    time_constraints = forms.DateField(widget=DateInput(attrs={
        "style": "padding: 8px 0 0 55px; height: 43px; width: 200px"
    }))
    priority = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=Task.PRIORITY_CHOICES
    )
    task_type = forms.ModelChoiceField(
        queryset=TaskType.objects.all(),
        widget=forms.Select(attrs={"style": "padding: 10px;"}),
    )
    assignees = forms.ModelMultipleChoiceField(
            queryset=get_user_model().objects.all(),
            widget=forms.CheckboxSelectMultiple,
            required=False
        )
    tags = TagField(required=False)

    class Meta:
        model = Task
        fields = "__all__"


class TaskTypeForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }),
        label="",
        required=True
    )
    depiction = forms.CharField(widget=forms.Textarea(attrs={
        "placeholder": "Depiction",
        "style": "padding: 10px; height: 200px"
    }),
        label=""
    )

    class Meta:
        model = TaskType
        fields = "__all__"


class TaskTypeSearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        required=False,
        label="",
        widget=forms.TextInput(attrs={
            "placeholder": "Search by task type name...",
            "style": "padding: 10px"
        })
    )


class ProjectCategoryForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }),
        label="",
        required=True
    )
    depiction = forms.CharField(widget=forms.Textarea(attrs={
        "placeholder": "Depiction",
        "style": "padding: 10px; height: 200px"
    }),
        label=""
    )

    class Meta:
        model = ProjectCategory
        fields = "__all__"


class ProjectCategorySearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        required=False,
        label="",
        widget=forms.TextInput(attrs={
            "placeholder": "Search by task type name...",
            "style": "padding: 10px"
        })
    )


class PositionForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }))
    duties = forms.CharField(widget=forms.Textarea(attrs={
        "placeholder": "Depiction",
        "style": "padding: 10px; height: 100px"
    }),
        help_text="Please, separate each duty with the symbol ' ; '",
        label=""
    )

    class Meta:
        model = Position
        fields = "__all__"


class PositionSearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        required=False,
        label="",
        widget=forms.TextInput(attrs={
            "placeholder": "Lookout by the position name... ",
            "style": "padding: 10px; width: 300px;"
        })
    )


class ProjectForm(forms.ModelForm):

    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }),
        label="",
        required=True
    )
    depiction = forms.CharField(widget=forms.Textarea(attrs={
        "placeholder": "Depiction",
        "style": "padding: 10px; height: 100px"
    }),
        label=""
    )
    team = forms.ModelChoiceField(
        widget=forms.Select(attrs={"style": "padding: 10px;"}),
        queryset=Team.objects.all()
    )
    time_constraints = forms.DateField(widget=DateInput(attrs={
        "style": "padding: 8px 0 0 55px; height: 43px; width: 200px"
    }))
    priority = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=Project.PRIORITY_CHOICES
    )
    project_category = forms.ModelChoiceField(
        queryset=ProjectCategory.objects.all(),
        widget=forms.Select(attrs={"style": "padding: 10px;"}),
    )
    budget = forms.DecimalField(widget=forms.NumberInput(attrs={
        "style": "padding: 10px;",
        "placeholder": "Budget"
    }), label="", decimal_places=2, max_digits=8)
    funds_used = forms.DecimalField(widget=forms.NumberInput(attrs={
        "style": "padding: 10px;",
        "placeholder": "Funds used"
    }), label="", decimal_places=2, max_digits=8, required=False)
    progress = forms.DecimalField(widget=forms.NumberInput(attrs={
        "style": "padding: 10px;",
        "placeholder": "Progress"
    }), label="", decimal_places=2, max_digits=5, required=False)

    tags = TagField(required=False)

    # Другие поля формы

    project_blocks = forms.MultipleChoiceField(
        choices=[],
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        project_blocks = ProjectBlock.predefined_blocks()
        block_choices = [(str(block["index"]), block["name"]) for block in project_blocks]

        self.fields['project_blocks'].choices = block_choices

        is_creating_project = not self.instance.pk if self.instance else True

        for block in project_blocks:
            block_id = block['index']

            self.fields[f'block_{block_id}_assigned'] = forms.ModelChoiceField(
                queryset=Team.objects.none(),
                required=False
            )

            # перевірка чи є проект новим
            is_creating_project = not self.instance.pk if self.instance else True

            # Додавання полів для кожного блоку і відповідних виконаних завдань
            for i in range(7):
                self.fields[f'block_{i}_total_tasks'] = forms.IntegerField(required=False)

            if is_creating_project:
                self.fields[f'block_{block_id}_completed_tasks'] = forms.IntegerField(
                    initial=0, widget=forms.HiddenInput(), required=False
                )
            else:
                self.fields[f'block_{block_id}_completed_tasks'] = forms.IntegerField(required=False)

        if self.instance.pk and self.instance.team:
            team_members = self.instance.team.members.all()
            for field_name, field in self.fields.items():
                if field_name.startswith('block_') and field_name.endswith('_assigned'):
                    field.queryset = team_members

    def save(self, commit=True):
        if self.instance.pk and self.instance.team:
            team_members = self.instance.team.members.all()
            for field_name, field in self.fields.items():
                if field_name.startswith('block_') and field_name.endswith('_assigned'):
                    field.queryset = team_members

        # Добавьте здесь вашу логику сохранения формы, если она отличается от предоставленной

        return super().save(commit=commit)

        # def clean(self):
        #     cleaned_data = super().clean()
        #     for i in range(7):
        #         total_tasks = cleaned_data.get(f'block_{i}_total_tasks')
        #         completed_tasks = cleaned_data.get(f'block_{i}_completed_tasks')
        #
        #         # Check if completed_tasks is greater than total_tasks
        #         if total_tasks is not None and completed_tasks is not None and completed_tasks > total_tasks:
        #             self.errors[""] = self.error_class(["Completed tasks cannot exceed total tasks."])
        #             print(f"Block {i}: Completed tasks ({completed_tasks}) exceed total tasks ({total_tasks})")
        #             print("it's a dereliction")
        #
        # def debug_form_errors(self):
        #     return getattr(self, 'debug_form_errors', None)

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['project_blocks'].queryset = ProjectBlock.objects.all()
    #
    #     for block in self.fields['project_blocks'].queryset:
    #         self.fields[f'block_{block.id}_tasks'] = forms.IntegerField(required=False)


    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #
    #     # Добавляем поля для указания количества заданий в каждом блоке
    #     blocks = ProjectBlock.objects.filter(project=self.instance)
    #     for block in blocks:
    #         initial_task_count = block.task_set.filter(is_completed=False).count()
    #         self.fields[f'block_{block.id}_task_count'] = forms.IntegerField(
    #             label=f"Number of tasks in {block.name}",
    #             initial=initial_task_count,
    #             required=False,  # Можно оставить поле пустым
    #             min_value=0
    #         )

    # Обновляем кол-во заданий в блоках
    # def save(self, commit=True):
    #     if commit:
    #         for field_name, field_value in self.cleaned_data.items():
    #             if field_name.startswith('block_') and field_name.endswith('_task_count'):
    #                 block_id = int(field_name.split('_')[1])
    #                 block = ProjectBlock.objects.get(pk=block_id)
    #                 current_task_count = block.task_set.filter(is_completed=False).count()
    #                 new_task_count = field_value
    #
    #                 if current_task_count < new_task_count:
    #                     for _ in range(new_task_count - current_task_count):
    #                         Task.objects.create(block=block, description=f"Новое задание в блоке {block.name}",
    #                                             is_completed=False)
    #                 elif current_task_count > new_task_count:
    #                     tasks_to_delete = block.task_set.filter(is_completed=False)[
    #                                       :current_task_count - new_task_count]
    #                     tasks_to_delete.delete()
    #
    #     if commit:
    #         return super().save(commit=commit)
    #     else:
    #         return None

    class Meta:
        model = Project
        # fields = "__all__"

        fields = [
            'name',
            'depiction',
            'team',
            'time_constraints',
            "priority",
            'project_category',
            "budget",
            "funds_used",
            "progress",
            "tags",
            # "project_block"
        ]


class TeamForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        "placeholder": "Name*",
        "style": "padding: 10px"
    }),
        label="",
        required=True
    )

    class Meta:
        model = Team
        fields = "__all__"


class WorkerEvaluationForm(forms.Form):
    score = forms.ChoiceField(label='Evaluation', choices=WorkerEvaluation.SCORE_CHOICES)
