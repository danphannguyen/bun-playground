FROM oven/bun:1 as base
WORKDIR /app

# Copy dependency definitions
COPY ./package.json ./bun.lock ./
COPY ./tsconfig.json ./
COPY ./apps/frontend/package.json ./apps/frontend/
COPY ./apps/backend/package.json ./apps/backend/
# COPY ./packages/shared/package.json ./packages/shared/

# Install all dependencies
RUN bun install --frozen-lockfile

# Copy source
COPY ./apps/frontend ./apps/frontend
# COPY ./packages/shared ./packages/shared

# Build Next.js
WORKDIR /app/apps/frontend
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Cleanup: Remove dev dependencies and source files to reduce image size
RUN cd /app && bun install --production --frozen-lockfile && \
    rm -rf /app/apps/frontend/app && \
    rm -rf /app/apps/frontend/*.ts && \
    rm -rf /app/apps/frontend/*.tsx && \
    rm -rf /app/node_modules/.cache

# Run Next.js
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]