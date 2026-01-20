from collections.abc import AsyncGenerator

from ag_ui.core.types import RunAgentInput
from ag_ui.encoder import EventEncoder
from ag_ui_langgraph import LangGraphAgent
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from server.core.injector import injector
from server.core.logger import get_logger
from server.core.settings import settings

router = APIRouter()
logger = get_logger(__name__)


@router.post("/run")
async def run_agent(input_data: RunAgentInput) -> StreamingResponse:
    encoder = EventEncoder()
    graph = injector.new_graph()
    agent = LangGraphAgent(name=settings.title, graph=graph)

    async def event_generator() -> AsyncGenerator[str]:
        async for event in agent.run(input_data):
            logger.debug(event)
            yield encoder.encode(event)  # ty: ignore[invalid-argument-type]

    return StreamingResponse(event_generator(), media_type=encoder.get_content_type())
