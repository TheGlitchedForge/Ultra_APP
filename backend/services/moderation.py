import re
from typing import Tuple
import httpx
import os

BAD_WORDS = ["fuck", "shit", "bitch", "asshole"]

def censor_text(text: str) -> str:
    # normal keyword censor
    for w in BAD_WORDS:
        text = re.sub(w, "*" * len(w), text, flags=re.IGNORECASE)
    return text

async def ai_moderate(text: str) -> Tuple[str, bool]:
    """
    Use AI moderation API to check for:
    - offensive content
    - adult content
    Returns: censored_text, flagged (bool)
    """
    api_key = os.getenv("MODERATION_API_KEY")  # OpenAI or other AI moderation
    url = "https://api.openai.com/v1/moderations"  # example
    headers = {"Authorization": f"Bearer {api_key}"}
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json={"input": text}, headers=headers)
        result = resp.json()
        flagged = result.get("results", [{}])[0].get("flagged", False)
    censored = censor_text(text)
    return censored, flagged
