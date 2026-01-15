from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Table
from sqlalchemy.orm import relationship
from database import metadata, engine
from datetime import datetime

# User roles
roles = ["admin", "mod", "member"]

class User(metadata):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="member")
    created_at = Column(DateTime, default=datetime.utcnow)

class Channel(metadata):
    __tablename__ = "channels"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    description = Column(Text)
    creator_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class Post(metadata):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    channel_id = Column(Integer, ForeignKey("channels.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    body = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Comment(metadata):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    body = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

# Chat rooms
class ChatRoom(metadata):
    __tablename__ = "chatrooms"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    is_direct = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ChatMember(metadata):
    __tablename__ = "chatmembers"
    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("chatrooms.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

class ChatMessage(metadata):
    __tablename__ = "chatmessages"
    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("chatrooms.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
