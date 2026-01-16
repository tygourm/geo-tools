from fastapi import APIRouter

from server.infra.api.agents.router import router as agents

router = APIRouter()
router.include_router(agents, prefix="/agents", tags=["agents"])
