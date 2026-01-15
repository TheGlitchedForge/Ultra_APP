from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import sys
import os

# --------------------------
# Make sure routers outside backend can be imported
# --------------------------
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# --------------------------
# Import routers and DB
# --------------------------
from routers import auth, chat, posts, search, admin  # admin optional if you have it
from database import metadata, engine

# --------------------------
# Create FastAPI app
# --------------------------
app = FastAPI(title="Mega App Backend")

# --------------------------
# Create tables (if not exist)
# --------------------------
metadata.create_all(engine)

# --------------------------
# Include routers
# --------------------------
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])
app.include_router(search.router, prefix="/search", tags=["search"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])  # optional

# --------------------------
# Root endpoint
# --------------------------
@app.get("/")
def root():
    return {"status": "running", "message": "Welcome to Mega App API"}

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
