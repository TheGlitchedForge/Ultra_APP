from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from main import manager

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: int):
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # moderation here (AI + keyword)
            content = data.get("content")
            sender_id = data.get("sender_id")
            message = {"sender_id": sender_id, "content": content}
            await manager.broadcast(room_id, message)
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
