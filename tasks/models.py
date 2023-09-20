from django.conf import settings
from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.db.models import QuerySet, Q, Count
from taggit.managers import TaggableManager


class TaskType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    depiction = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class ProjectCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    depiction = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Position(models.Model):
    name = models.CharField(max_length=255, unique=True)
    duties = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name

    def duties_to_a_list(self) -> list:
        return list(self.duties.split(";"))[:-1]


class Team(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name

    def sum_of_budget(self) -> int:
        return sum(project.budget for project in self.projects.all())


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Worker(AbstractUser):
    position = models.ForeignKey(
        Position,
        on_delete=models.CASCADE,
        related_name="workers",
        blank=True,
        null=True
    )
    team = models.ManyToManyField(
        Team,
        related_name="workers",
       blank=True,
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="user permissions",
        blank=True,
        related_name="worker_permissions"
    )

    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name="groups",
        blank=True,
        related_name="worker_groups"
    )
    rating_points = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.username} ({self.first_name} {self.last_name})"

    def finished_tasks(self) -> QuerySet:
        return self.tasks.annotate(
            assignees_count=Count('assignees')
        ).filter(
            is_completed=True,
            assignees_count__gt=0
        ).distinct()

    def underway_tasks(self) -> QuerySet:
        return self.tasks.annotate(
            assignees_count=Count('assignees')
        ).filter(
            Q(is_completed=False) & Q(assignees_count__gt=0)
        ).distinct()


class WorkerEvaluation(models.Model):
    SCORE_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )
    evaluator = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='reviews_by')
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='reviews_of')
    score = models.IntegerField(choices=SCORE_CHOICES)


class Project(models.Model):
    PRIORITY_CHOICES = [
        ("U", "Urgent"),
        ("A", "Average"),
        ("S", "Side-tracked")
    ]

    name = models.CharField(max_length=255)
    depiction = models.TextField()
    priority = models.CharField(
        max_length=1,
        choices=PRIORITY_CHOICES,
        default="S"
    )
    time_constraints = models.DateField()
    project_category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    team = models.ManyToManyField(
        Team,
        blank=True,
        related_name="projects"
    )
    budget = models.DecimalField(decimal_places=2, max_digits=8, default=0)
    funds_used = models.DecimalField(decimal_places=2, max_digits=8, default=0, blank=True)
    progress = models.DecimalField(decimal_places=2, max_digits=5, null=True, blank=True, default=0)
    tags = TaggableManager(blank=True)

    def get_project_progress(self):
        blocks = self.projectblock_set.all()
        total_block_count = blocks.count()
        completed_block_count = blocks.filter(task__is_completed=True).distinct().count()

        if total_block_count > 0:
            project_progress = (completed_block_count / total_block_count) * 100
            return round(project_progress, 2)
        else:
            return 0.0

    def __str__(self) -> str:
        return self.name


class ProjectBlock(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()

    def get_block_progress(self):
        total_tasks = self.task_set.count()  # Общее количество заданий в блоке
        completed_tasks = self.task_set.filter(is_completed=True).count()  # Количество завершенных заданий в блоке

        if total_tasks > 0:
            return round((completed_tasks / total_tasks) * 100, 2)
        else:
            return 0.0


class Task(models.Model):
    PRIORITY_CHOICES = [
        ("U", "Urgent"),
        ("A", "Average"),
        ("S", "Side-tracked")
    ]

    name = models.CharField(max_length=255)
    depiction = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    block = models.ForeignKey(ProjectBlock, on_delete=models.CASCADE, null=True, blank=True)
    time_constraints = models.DateField()
    is_completed = models.BooleanField(default=False)
    priority = models.CharField(
        max_length=1,
        choices=PRIORITY_CHOICES,
        default="S"
    )

    task_type = models.ForeignKey(
        TaskType,
        on_delete=models.CASCADE,
        related_name="tasks"
    )
    assignees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="tasks",
        blank=True
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="user permissions",
        blank=True,
        related_name="task_permissions"
    )

    tags = TaggableManager(blank=True)

    def tags_remained(self) -> int:
        count = self.tags.count() - 1
        return count if count > 0 else 0

    def __str__(self) -> str:
        return f"{self.name} (priority: {self.priority})"
