# Generated by Django 4.2.4 on 2023-09-15 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0003_projectcategory_alter_project_funds_used_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="project_category",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="projects",
                to="tasks.projectcategory",
            ),
            preserve_default=False,
        ),
    ]
