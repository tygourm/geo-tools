import logging
import logging.handlers
from pathlib import Path
from sys import stdout

from server.core.settings import Settings


def init_logger(settings: Settings) -> None:
    Path(settings.logs_dir).mkdir(parents=True, exist_ok=True)

    formatter = logging.Formatter(settings.logs_format)

    stream_handler = logging.StreamHandler(stdout)
    stream_handler.setLevel(settings.logs_level)
    stream_handler.setFormatter(formatter)

    file_handler = logging.handlers.RotatingFileHandler(
        Path(settings.logs_dir) / settings.logs_filename,
        backupCount=settings.logs_backup_count,
        maxBytes=settings.logs_max_bytes,
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)

    logging.basicConfig(
        level=settings.logs_level,
        handlers=[stream_handler, file_handler],
    )


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
