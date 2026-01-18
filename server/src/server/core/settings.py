from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    dev: bool = False

    title: str = "Geo Tools"
    version: str = "0.0.0"

    host: str = "127.0.0.1"
    port: int = 8000
    workers: int = 1

    logs_dir: str = "logs"
    logs_filename: str = "server.log"
    logs_format: str = "%(asctime)s [%(name)s] %(levelname)s %(message)s"
    logs_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
    logs_backup_count: int = 10
    logs_max_bytes: int = 10 * 1024 * 1024

    ollama_base_url: str = "http://localhost:11434"

    model_config = SettingsConfigDict()


settings = Settings()
