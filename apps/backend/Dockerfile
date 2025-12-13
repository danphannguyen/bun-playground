# syntax=docker/dockerfile:1
# Stage 1: Dependencies
FROM --platform=$BUILDPLATFORM oven/bun:1 AS deps
WORKDIR /app

# Copy root and package files
COPY ./package.json ./bun.lock ./
COPY ./tsconfig.json ./
COPY ./apps/backend/package.json ./apps/backend/
COPY ./apps/frontend/package.json ./apps/frontend/

# Install all dependencies
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM --platform=$BUILDPLATFORM oven/bun:1 AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/tsconfig.json ./tsconfig.json

# Copy source
COPY ./apps/backend ./apps/backend
# COPY ./packages/shared ./packages/shared

# Build NestJS
WORKDIR /app/apps/backend
RUN bun run build

# Stage 3: Production Runner
FROM --platform=$BUILDPLATFORM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built app and necessary files
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

# Install only production dependencies
RUN bun install --production

# Run
EXPOSE 3001
CMD ["bun", "./dist/src/main.js"]