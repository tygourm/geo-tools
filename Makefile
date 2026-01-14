init:
	pnpm i --frozen-lockfile
	uv sync --all-packages --frozen

start: init
	trap "kill 0" EXIT; \
	cd client && pnpm start & \
	cd server && DEV=True LOGS_LEVEL=DEBUG uv run server & \
	wait

build: init
	pnpm -r build
	uv build --all-packages --wheel

serve: build
	trap "kill 0" EXIT; \
	cd client && pnpm serve & \
	cd server && uv run server & \
	wait

docker_build:
	docker build -f docker/client/Dockerfile -t geo-tools-client:0.0.0 .
	docker build -f docker/server/Dockerfile -t geo-tools-server:0.0.0 .

docker_serve: docker_build
	docker compose -f docker/docker-compose.yaml up -d
	docker compose -f docker/docker-compose.yaml logs -f

docker_clean:
	docker compose -f docker/docker-compose.yaml down
	docker system prune -af --volumes

write: init
	pnpm prettier -w .
	uv run ruff format --no-cache

check: init
	pnpm prettier -c . && pnpm -r exec eslint --fix
	uv run ruff check --fix --no-cache && uv run ty check --error-on-warning

clean:
	rm -rf .venv/
	find . -type d -name dist -prune -exec rm -rf {} +
	find . -type d -name logs -prune -exec rm -rf {} +
	find . -type d -name __pycache__ -prune -exec rm -rf {} +
	find . -type d -name node_modules -prune -exec rm -rf {} +
