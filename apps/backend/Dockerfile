FROM oven/bun:1 as base
WORKDIR /app

# Copy root and package files
COPY ./package.json ./bun.lock ./
COPY ./tsconfig.json ./
COPY ./apps/backend/package.json ./apps/backend/
COPY ./apps/frontend/package.json ./apps/frontend/
# COPY ./packages/shared/package.json ./packages/shared/ (Uncomment if you use shared)

# Install all dependencies
RUN bun install --frozen-lockfile

# Copy source
COPY ./apps/backend ./apps/backend
# COPY ./packages/shared ./packages/shared (Uncomment if you use shared)

# Build NestJS
WORKDIR /app/apps/backend
RUN bun run build

# Run
# NestJS compiles to main.js in dist folder
CMD ["bun", "./dist/main.js"]