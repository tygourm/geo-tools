from fastapi import APIRouter

from server.infra.api.greetings.greetings_router import router as greetings

router = APIRouter()
router.include_router(greetings, prefix="/greetings", tags=["greetings"])
