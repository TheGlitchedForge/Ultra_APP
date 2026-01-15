import os
import httpx

AI_MODELS = ["gemini", "openai", "anthropic"]

async def query_ai(prompt: str, model="auto") -> str:
    """
    Chooses AI dynamically if model='auto'
    """
    if model == "auto":
        # basic logic: questions with math go to one, others to another
        if any(w in prompt.lower() for w in ["calculate", "math", "solve"]):
            model = "openai"
        else:
            model = "gemini"

    if model == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")
        # pseudo request
        return f"[Gemini AI response to '{prompt}']"

    elif model == "openai":
        api_key = os.getenv("OPENAI_API_KEY")
        # pseudo request
        return f"[OpenAI response to '{prompt}']"

    elif model == "anthropic":
        api_key = os.getenv("ANTHROPIC_API_KEY")
        return f"[Anthropic response to '{prompt}']"

    else:
        return "[No AI selected]"
