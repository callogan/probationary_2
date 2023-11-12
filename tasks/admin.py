from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import (
    Task,
    TaskType,
    Project,
    ProjectBlock,
    ProjectCategory,
    Worker,
    Position,
    Team,
    WorkerEvaluation,
)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "time_constraints",
        "progress",
        "priority",
        "project_category",
        "team",
        "tag_list",
        "project_blocks_display",
    )

    def project_blocks_display(self, obj):
        blocks = ", ".join([block.name for block in obj.projectblock_set.all()])
        return blocks

    project_blocks_display.short_description = "Project Blocks"
    list_filter = ("progress", "priority", "project_category", "tags__name")
    search_fields = ("name",)

    def tag_list(self, project_object):
        return ", ".join(tag.name for tag in project_object.tags.all())


@admin.register(Worker)
class WorkerAdmin(UserAdmin):
    list_display = UserAdmin.list_display + ("position",)
    fieldsets = UserAdmin.fieldsets + (
        ("Additional info", {"fields": ("position", "teams")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional info", {"fields": ("position", "teams")}),
    )
    list_filter = ("teams",)
    search_fields = ("username",)


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_completed",
        "time_constraints",
        "priority",
        "task_type",
        "tag_list",
    )
    list_filter = ("is_completed", "priority", "task_type", "tags__name")
    search_fields = ("name",)

    def tag_list(self, task_object):
        return ", ".join(tag.name for tag in task_object.tags.all())


admin.site.register(Team)
admin.site.register(TaskType)
admin.site.register(ProjectCategory)
admin.site.register(ProjectBlock)
admin.site.register(Position)
admin.site.unregister(Group)
admin.site.register(WorkerEvaluation)
