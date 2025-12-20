# 🚀 Bun Playground - Monorepo Next.js + NestJS

> A modern full-stack monorepo with Next.js frontend, NestJS backend, powered by Bun and Docker.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Docker](#-docker)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)

## 🛠 Tech Stack

- **Runtime:** [Bun](https://bun.sh) v1.3.3
- **Frontend:** Next.js 16.0.7 (React, TypeScript)
- **Backend:** NestJS 11.0.1 (TypeScript)
- **Monorepo:** Bun Workspaces
- **Containerization:** Docker & Docker Compose
- **Linting:** ESLint 9 (Flat Config)
- **Formatting:** Prettier

## 📁 Project Structure

```
bun-playground/
├── apps/
│   ├── frontend/          # Next.js application (Port 3000)
│   │   ├── app/           # App router pages
│   │   ├── Dockerfile     # Frontend Docker config
│   │   └── package.json
│   └── backend/           # NestJS application (Port 3001)
│       ├── src/           # Backend source code
│       ├── Dockerfile     # Backend Docker config (multi-stage)
│       └── package.json
├── packages/
│   └── shared/            # Shared code (types, utils, constants)
├── docker-compose.yml     # Multi-service orchestration
├── .env                   # Environment variables (single source of truth)
├── .env.example           # Environment template
├── package.json           # Root workspace configuration
└── tsconfig.json          # Shared TypeScript config
```

## ✅ Prerequisites

Make sure you have the following installed:

- **Bun** >= 1.3.3 ([Install Bun](https://bun.sh/docs/installation))
- **Docker** & **Docker Compose** (for containerized deployment)
- **Node.js** (optional, for compatibility checks)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/danphannguyen/bun-playground.git
cd bun-playground
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` to customize your configuration (ports, URLs, etc.)

### 3. Install dependencies

```bash
bun install
```

### 4. Choose your development mode

#### Option A: Local Development (Hot Reload)

```bash
# Start both frontend and backend in development mode
bun dev

# Or start individually:
bun dev:frontend  # Next.js on http://localhost:3000
bun dev:backend   # NestJS on http://localhost:3001
```

#### Option B: Docker Development

```bash
# Build and start all services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

Access the applications:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **API Docs:** http://localhost:3001/api

## 💻 Development

### Local Development Workflow

1. **Start development servers:**
   ```bash
   bun dev
   ```

2. **Make changes** - Hot reload is enabled for both apps

3. **Lint your code:**
   ```bash
   bun lint
   ```

4. **Run tests:**
   ```bash
   bun test
   ```

5. **Build for production:**
   ```bash
   bun build
   ```

### Code Quality

```bash
# Lint all packages
bun lint

# Lint specific app
bun run --filter frontend lint
bun run --filter backend lint

# Run tests
bun test
```

## 🐳 Docker

### Development with Docker

```bash
# Build and start containers
docker compose up --build

# View logs
docker compose logs -f

# Stop containers
docker compose down

# Stop and remove volumes
docker compose down -v
```

### Docker Features

- ✅ **Multi-stage builds** for optimized backend images
- ✅ **Hot reload** with volume mounts
- ✅ **Multi-platform support** (linux/amd64, linux/arm64)
- ✅ **Resource limits** (512MB backend, 1GB frontend)
- ✅ **Health checks** and service dependencies
- ✅ **Isolated network** for inter-service communication

### Production Deployment

```bash
# Build production images
docker compose build

# Push to registry
docker tag bun-playground-backend:latest your-registry/backend:latest
docker push your-registry/backend:latest

docker tag bun-playground-frontend:latest your-registry/frontend:latest
docker push your-registry/frontend:latest
```

## 📜 Available Scripts

### Root Level (Monorepo)

```bash
bun dev              # Start all apps in dev mode
bun dev:backend      # Start backend only
bun dev:frontend     # Start frontend only
bun build            # Build all apps
bun build:backend    # Build backend only
bun build:frontend   # Build frontend only
bun start            # Start all apps in production mode
bun lint             # Lint all packages
bun test             # Run all tests
bun clean            # Clean all build artifacts and dependencies
bun clean:build      # Clean build artifacts only (dist, .next)
bun clean:deps       # Clean node_modules only
```

### Docker Scripts

```bash
docker compose up              # Start services
docker compose up --build      # Rebuild and start
docker compose down            # Stop services
docker compose down -v         # Stop and remove volumes
docker compose logs -f         # Follow logs
docker compose ps              # List running services
```

## 🔐 Environment Variables

All environment variables are centralized in the root `.env` file.

### General

- `NODE_ENV` - Environment mode (development/production)

### Backend (NestJS)

- `PORT` / `BACKEND_PORT` - Backend server port (default: 3001)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)
- `API_PREFIX` - API route prefix (default: api)

### Frontend (Next.js)

- `FRONTEND_PORT` - Frontend server port (default: 3000)
- `NEXT_PUBLIC_API_URL` - Backend API URL
  - Local: `http://localhost:3001`
  - Docker: `http://backend:3001`
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_VERSION` - Application version

### Docker Resource Limits

- `BACKEND_MEMORY_LIMIT` - Backend max memory (default: 512M)
- `BACKEND_MEMORY_RESERVATION` - Backend reserved memory (default: 256M)
- `FRONTEND_MEMORY_LIMIT` - Frontend max memory (default: 1G)
- `FRONTEND_MEMORY_RESERVATION` - Frontend reserved memory (default: 512M)

## 🏗 Architecture

### Monorepo Structure

This project uses **Bun Workspaces** to manage multiple packages:

- **apps/frontend** - Standalone Next.js application
- **apps/backend** - Standalone NestJS API
- **packages/shared** - Shared utilities, types, and constants

### Communication Flow

```
Browser → Next.js (3000) → NestJS API (3001)
          ↓
    API Proxy (/api/*)
          ↓
    Backend Service
```

### Docker Architecture

- **Multi-stage builds** for smaller production images
- **Volume mounts** for development hot reload
- **Bridge network** for service-to-service communication
- **Anonymous volumes** to preserve container builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh)
- Powered by [Next.js](https://nextjs.org) and [NestJS](https://nestjs.com)
- Containerized with [Docker](https://docker.com)

---

Made with ❤️ using Bun v1.3.3

