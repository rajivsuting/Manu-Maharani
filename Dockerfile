# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack for Yarn 4
RUN corepack enable

# Copy root package files
COPY package.json yarn.lock .yarnrc.yml ./

# Copy workspace package files
COPY apps/client/package.json ./apps/client/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies
RUN yarn workspaces focus client

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Enable Corepack for Yarn 4
RUN corepack enable

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/client/node_modules ./apps/client/node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY package.json yarn.lock .yarnrc.yml turbo.json ./
COPY apps/client ./apps/client

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the client app
WORKDIR /app/apps/client
RUN yarn build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/apps/client/public ./public
COPY --from=builder /app/apps/client/.next/standalone ./
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "apps/client/server.js"]

