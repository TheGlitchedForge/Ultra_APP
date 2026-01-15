from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import query_ai

router = APIRouter()

class SearchRequest(BaseModel):
    query: str
    ai_model: str = "auto"

@router.post("/search")
async def ai_search(req: SearchRequest):
    result = await query_ai(req.query, req.ai_model)
    return {"response": result}
