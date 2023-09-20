# Generated by Django 4.2.4 on 2023-09-20 08:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0007_task_is_completed"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="project",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="tasks.project",
            ),
        ),
        migrations.CreateModel(
            name="ProjectBlock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tasks.project"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="task",
            name="block",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="tasks.projectblock",
            ),
        ),
    ]
