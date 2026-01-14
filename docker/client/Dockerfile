### Base stage ###
FROM node:22-bookworm-slim AS base
RUN corepack enable && \
    corepack prepare pnpm@10.28.0
WORKDIR /app


### Install stage ###
FROM base AS installer

COPY client/pnpm-lock.yaml .
COPY client/package.json .

RUN pnpm i --frozen-lockfile


## Build stage ###
FROM base AS builder

COPY --from=installer /app/node_modules node_modules
COPY client .

RUN pnpm build


### Run stage ###
FROM nginx:1.29-alpine
WORKDIR /usr/share/nginx/html

COPY docker/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist .

ENTRYPOINT ["sh", "-c", "./vite-envs.sh && nginx -g 'daemon off;'"]
