from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routers import auth, chat, posts, search
from database import metadata, engine

app = FastAPI()

# Create tables
metadata.create_all(engine)

# Include routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(posts.router)
app.include_router(search.router)

# Simple WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, list[WebSocket]] = {}

    async def connect(self, room_id: int, websocket: WebSocket):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, room_id: int, websocket: WebSocket):
        self.active_connections[room_id].remove(websocket)

    async def broadcast(self, room_id: int, message: dict):
        for connection in self.active_connections.get(room_id, []):
            await connection.send_json(message)

manager = ConnectionManager()
