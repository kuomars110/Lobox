# Docker Setup for MultiSelect Component

This document explains how to use Docker with the MultiSelect React component project.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Available Docker Configurations

The project provides two Docker configurations:

1. **Production Build**: Builds the app and serves it with Nginx
2. **Development Environment**: Runs the app in development mode with hot reloading

## Running the Production Build

To build and run the production version:

```bash
# Build and start the container
docker-compose up --build

# Or in detached mode
docker-compose up -d --build
```

This will:

- Build the React application
- Create an optimized production build
- Serve it using Nginx on port 3000
- Access the app at http://localhost:3000

## Running the Development Environment

To run the app in development mode with hot reloading:

1. Open `docker-compose.yml`
2. Comment out the `app` service and uncomment the `dev` service
3. Run:

```bash
docker-compose up --build
```

This will:

- Mount your source code inside the container
- Run the app in development mode with hot reloading
- Access the app at http://localhost:3000

## Docker Commands Reference

```bash
# Start services
docker-compose up

# Start services in detached mode
docker-compose up -d

# Rebuild containers
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Execute commands in the container
docker-compose exec app sh
```

## Container Structure

### Production Container

- **Base Image**: Node Alpine for building, Nginx Alpine for serving
- **Exposed Port**: 80 (mapped to 3000 on the host)
- **Volume Mounts**: nginx.conf mounted for custom configuration

### Development Container

- **Base Image**: Node Alpine
- **Exposed Port**: 3000
- **Volume Mounts**: Source code is mounted for hot reloading
