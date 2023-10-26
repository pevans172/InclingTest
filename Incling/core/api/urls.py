from django.urls import path

from . import views

urlpatterns = [
    #### Tiles #####
    path("tile/create/", views.create_tile, name="create_tile"),
    path("tile/get_all/", views.get_all_tiles, name="get_all_tiles"),
    path("tile/get/<int:id>/", views.get_tile, name="get_tile"),
    path("tile/edit/<int:id>/", views.edit_tile, name="edit_tile"),
    path("tile/delete/<int:id>/", views.delete_tile, name="delete_tile"),
    #### Tasks #####
    path("task/create/", views.create_task, name="create_task"),
    path("task/get_all/<int:tile_id>/", views.get_all_tasks, name="get_all_tasks"),
    path("task/get/<int:id>/", views.get_task, name="get_task"),
    path("task/edit/<int:id>/", views.edit_task, name="edit_task"),
    path("task/delete/<int:id>/", views.delete_task, name="delete_task"),
]
