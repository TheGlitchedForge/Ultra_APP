from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List

router = APIRouter()

# channel_id → list of connected clients
voice_rooms: Dict[str, List[WebSocket]] = {}

@router.websocket("/ws/{channel_id}")
async def voice_ws(websocket: WebSocket, channel_id: str):
    await websocket.accept()
    if channel_id not in voice_rooms:
        voice_rooms[channel_id] = []
    voice_rooms[channel_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            # broadcast signaling messages to other peers
            for conn in voice_rooms[channel_id]:
                if conn != websocket:
                    await conn.send_json(data)
    except WebSocketDisconnect:
        voice_rooms[channel_id].remove(websocket)
