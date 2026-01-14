# geo-tools

Geographic tools for offline prompt-based GeoJSON generation and visualization.

## Setup

Install the dependencies.

```bash
make init
```

## Development

Start the application in development mode.

```bash
make start
```

## Production

Build the application for production.

```bash
make build
```

Start the application in production mode.

```bash
make serve
```

## Deployment

Build the Docker images.

```bash
make docker_build
```

Start the deployment.

```bash
make docker_serve
```

Clean up the deployment.

```bash
make docker_clean
```

## Miscellaneous

### Format / Lint

Format the codebase.

```bash
make write
```

Lint the codebase.

```bash
make check
```

### Cleanup

Clean up the codebase.

```bash
make clean
```
