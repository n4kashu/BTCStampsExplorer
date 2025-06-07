# Multi-stage build for optimized production image
FROM denoland/deno:alpine as builder

WORKDIR /app

# Copy configuration files first for better layer caching
COPY deno.json fresh.config.ts tailwind.config.ts ./
COPY static/ ./static/

# Copy source code
COPY . .

# Upgrade Deno and build the application
RUN deno upgrade
RUN deno cache main.ts
RUN deno run -A dev.ts build

# Production stage
FROM denoland/deno:alpine

# Add security: create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S deno -u 1001

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=deno:nodejs /app/ ./

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD deno run --allow-net --allow-env healthcheck.ts || exit 1

# Switch to non-root user
USER deno

# Expose port
EXPOSE 8000

# Start the application
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-run", "--allow-write", "--allow-env", "main.ts"]
