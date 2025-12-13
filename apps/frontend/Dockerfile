# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM oven/bun:1 as base
WORKDIR /app

# Copy dependency definitions
COPY ./package.json ./bun.lock ./
COPY ./tsconfig.json ./
COPY ./apps/frontend/package.json ./apps/frontend/
COPY ./apps/backend/package.json ./apps/backend/

# Install all dependencies
RUN bun install --frozen-lockfile

# Copy source
COPY ./apps/frontend ./apps/frontend

# Build Next.js
WORKDIR /app/apps/frontend
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Cleanup: Remove dev dependencies and cache to reduce image size
# Ne pas supprimer les fichiers source car Next.js peut en avoir besoin en runtime
RUN cd /app && bun install --production --frozen-lockfile && \
    rm -rf /app/node_modules/.cache && \
    rm -rf /app/apps/frontend/.next/cache

# Run Next.js
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]