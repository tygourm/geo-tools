from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from uvicorn import run

from server.core.lifespan import lifespan
from server.core.settings import settings
from server.infra.api.api_router import router as api

app = FastAPI(
    debug=settings.dev,
    title=settings.title,
    version=settings.version,
    docs_url=None,
    redoc_url=None,
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,  # ty: ignore[invalid-argument-type]
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.include_router(api, prefix="/api", tags=["api"])
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse("/docs")


@app.get("/docs", include_in_schema=False)
async def docs() -> HTMLResponse:
    return get_swagger_ui_html(
        title=app.title,
        openapi_url="/openapi.json",
        swagger_js_url="/static/swagger.js",
        swagger_css_url="/static/swagger.css",
        swagger_favicon_url="/static/favicon.svg",
    )


def main() -> None:
    run(
        "server.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.dev,
        workers=settings.workers,
        reload_dirs=["src/server"] if settings.dev else None,
    )
