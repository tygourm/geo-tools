from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse

router = APIRouter()


@router.get("")
def greetings(request: Request) -> PlainTextResponse:
    return PlainTextResponse(f"Hello, {request.headers.get('Origin', 'World')}!")
