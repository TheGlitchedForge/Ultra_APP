from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Post, Comment

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PostCreate(BaseModel):
    channel_id: int
    author_id: int
    title: str
    body: str

@router.post("/post")
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    db_post = Post(channel_id=post.channel_id, author_id=post.author_id, title=post.title, body=post.body)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

class CommentCreate(BaseModel):
    post_id: int
    author_id: int
    body: str

@router.post("/comment")
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    db_comment = Comment(post_id=comment.post_id, author_id=comment.author_id, body=comment.body)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment
