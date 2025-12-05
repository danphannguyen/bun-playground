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
# This creates the .next folder
RUN bun run build

# Run Next.js
# Next.js defaults to port 3000
EXPOSE 3000
CMD ["bun", "run", "start"]