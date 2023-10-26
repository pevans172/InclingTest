from django.db import models

from .fields import OrderField


class Tile(models.Model):
    class Statuses(models.TextChoices):
        PENDING = "PE", "Pending"
        LIVE = "LI", "Live"
        ARCHIVED = "AR", "Archived"

    launch_date = models.DateTimeField("launch date")
    status = models.CharField(max_length=2, choices=Statuses.choices, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Task(models.Model):
    class Types(models.TextChoices):
        SURVEY = "SU", "Survey"
        DISCUSSION = "DC", "Discussion"
        DIARY = "DI", "Diary"

    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=200)
    order = OrderField()
    type = models.CharField(max_length=2, choices=Types.choices, blank=False)
    assigned_tile = models.ForeignKey(
        Tile, related_name="tasks", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"
