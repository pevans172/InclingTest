from django.contrib import admin

from .models import Task, Tile


class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "created_at"]


class TaskInline(admin.TabularInline):
    model = Task
    extra = 0


class TileAdmin(admin.ModelAdmin):
    list_display = ["id", "status", "launch_date"]
    inlines = [TaskInline]


admin.site.register(Task, TaskAdmin)
admin.site.register(Tile, TileAdmin)
