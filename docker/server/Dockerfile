ARG USER=server
ARG GROUP=server
ARG PYTHON=python:3.12-slim-bookworm


### Base stage ###
FROM $PYTHON AS base
RUN pip install uv
WORKDIR /app


### Install stage ###
FROM base AS installer

COPY uv.lock .
COPY server/pyproject.toml .

RUN uv export -o requirements.txt --no-emit-workspace && \
    pip wheel -r requirements.txt -w /wheels --no-deps --no-cache-dir


### Build stage ###
FROM base AS builder

COPY server .

RUN uv build --wheel -o /wheels


### Run stage ###
FROM $PYTHON
ARG USER
ARG GROUP
RUN groupadd $GROUP && \
    useradd -m -g $GROUP -u 1000 $USER
WORKDIR /home/$USER/app

COPY server/static static

COPY --from=installer /wheels /wheels
RUN pip install /wheels/* --no-deps --no-cache-dir && \
    rm -rf /wheels

COPY --from=builder /wheels /wheels
RUN pip install /wheels/* --no-deps --no-cache-dir && \
    rm -rf /wheels

RUN chown -R $USER:$GROUP /home/$USER
USER $USER
CMD ["server"]
