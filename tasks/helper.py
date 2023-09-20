def calculate_average_progress(projects):
    total_progress = 0
    total_projects = len(projects)

    if total_projects == 0:
        return 0  # Возвращаем 0, если нет проектов

    for project in projects:
        total_progress += project.progress

    average_progress = total_progress / total_projects
    return average_progress


def budget_status_completed(projects):
    total_budget = 0
    total_used = 0

    for project in projects:
        total_budget += project.budget
        total_used += project.funds_used

    gross_percent = 0
    if total_used > total_budget:
        gross_percent = (total_used - total_budget) / total_budget * 100
        predominant_status = f"Exceeded"

    elif total_used < total_budget:
        gross_percent = total_used / total_budget * 100
        predominant_status = f"Used"

    else:
        gross_percent = 100.0
        predominant_status = "Fully utilized"

    return predominant_status, gross_percent


def budget_status_uncompleted(projects):
    total_budget = 0
    total_used = 0

    for project in projects:
        total_budget += project.budget
        total_used += project.funds_used

    gross_percent = 0
    if total_used > total_budget:
        gross_percent = (total_used - total_budget) / total_budget * 100
        predominant_status = f"Exceeded"

    elif total_used < total_budget:
        gross_percent = total_used / total_budget * 100
        predominant_status = f"Used"

    elif total_used == total_budget:
        gross_percent = 100.0
        predominant_status = "Fully utilized"

    else:
        gross_percent = 0
        predominant_status = "No funds used"

    return predominant_status, gross_percent
