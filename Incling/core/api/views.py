from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from core.models import Tile, Task
from core.api.serializers import TileSerializer, TaskSerializer


################
#### Tiles #####
################
@api_view(["GET"])
def get_tile(request, id):
    try:
        tile = Tile.objects.get(id=id)
    except Tile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TileSerializer(tile)
    return Response(serializer.data)


@api_view(["GET"])
def get_all_tiles(request):
    tiles = Tile.objects.all()

    serializer = TileSerializer(tiles, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_tile(request):
    serializer = TileSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def edit_tile(request, id):
    try:
        tile = Tile.objects.get(id=id)
    except Tile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TileSerializer(tile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data={"edit_tile": "edit successful"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE", "GET"])
def delete_tile(request, id):
    try:
        tile = Tile.objects.get(id=id)
    except Tile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    operation = tile.delete()
    if operation:
        return Response(data={"delete_tile": "delete successful"})
    return Response(data={"delete_tile": "delete failed"})


################
#### Tasks #####
################
@api_view(["GET"])
def get_task(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(["GET"])
def get_all_tasks(request, tile_id):
    tasks = Task.objects.filter(assigned_tile=tile_id)

    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_task(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def edit_task(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data={"edit_task": "edit successful"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE", "GET"])
def delete_task(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    operation = task.delete()
    if operation:
        return Response(data={"delete_task": "delete successful"})
    return Response(data={"delete_task": "delete failed"})
