# Docker Swarm Deployment Guide

This guide explains how to deploy BTCStampsExplorer using Docker Swarm and Portainer with Redis caching.

## Prerequisites

- Docker Swarm cluster initialized
- Portainer deployed and accessible
- External MySQL database with btc_stamps data populated
- Existing Traefik proxy running in swarm
- External networks: `traefik_proxy_traefik_net` and `db_mysql_cluster_network`

## Quick Start

### 1. Portainer Deployment (Recommended)

1. **Login to Portainer**
2. **Navigate to Stacks**
3. **Create New Stack**
4. **Copy stack file content**:
   - Use `docker-stack-simple.yml` for basic deployment (no Traefik labels)
   - Use `docker-stack.yml` for deployment with Traefik integration
5. **Configure Environment Variables** (see below)
6. **Deploy Stack**

### 2. Environment Variables Configuration

In Portainer Stack Environment Variables section, add:

```
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_PORT=3306
DB_NAME=btc_stamps
DB_MAX_RETRIES=5
REDIS_PASSWORD=your-secure-redis-password
API_BASE_URL=https://your-domain.com
QUICKNODE_ENDPOINT=https://your-quicknode-endpoint.com
QUICKNODE_API_KEY=your-quicknode-api-key
MINTING_SERVICE_FEE_ADDRESS=your-bitcoin-address
MINTING_SERVICE_FEE_FIXED_SATS=1000
MINTING_SERVICE_FEE_ENABLED=0
IMAGES_SRC_PATH=https://stampchain.io/stamps
DOMAIN=your-domain.com
```

### 3. Deploy via CLI

```bash
# Deploy simple stack (no Traefik labels)
docker stack deploy -c docker-stack-simple.yml btc-stamps

# Or deploy with Traefik integration
docker stack deploy -c docker-stack.yml btc-stamps
```

## Stack Files

### docker-stack-simple.yml
- **Purpose**: Basic production deployment without Traefik labels
- **Features**: 2 replicas, Redis caching, health checks, resource limits
- **Networks**: `db_mysql_cluster_network`, `redis_network`
- **Best for**: Deployments without external load balancer

### docker-stack.yml
- **Purpose**: Production deployment with Traefik integration
- **Features**: Traefik labels, SSL termination, automatic routing
- **Networks**: `traefik_proxy_traefik_net`, `db_mysql_cluster_network`, `redis_network`
- **Best for**: Production with existing Traefik proxy

### docker-compose.yml
- **Purpose**: Local development
- **Features**: Build context, simplified configuration
- **Best for**: Development and testing

## Network Architecture

```
┌─────────────────┐    ┌────────────────────┐    ┌─────────────────┐
│  Traefik Proxy  │────│  BTCStampsExplorer │────│  MySQL Cluster  │
│   (External)    │    │    (2 replicas)    │    │   (External)    │
└─────────────────┘    └─────────┬──────────┘    └─────────────────┘
                                 │
                       ┌─────────▼──────────┐
                       │  Redis Cache       │
                       │  (Internal)        │
                       └────────────────────┘
```

## Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL database host | `mysql.example.com` |
| `DB_USER` | Database username | `btc_stamps_user` |
| `DB_PASSWORD` | Database password | `secure_password` |
| `DB_NAME` | Database name | `btc_stamps` |
| `REDIS_PASSWORD` | Redis password | `secure_redis_password` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_PORT` | Database port | `3306` |
| `DB_MAX_RETRIES` | Connection retry limit | `5` |
| `DOMAIN` | Domain for Traefik routing | Required for docker-stack.yml |
| `MINTING_SERVICE_FEE_ENABLED` | Enable minting fees | `0` |

## Redis Configuration

The stack includes a Redis service for caching:
- **Image**: `redis:7-alpine`
- **Memory limit**: 256MB with LRU eviction
- **Persistence**: AOF enabled with persistent volume
- **Security**: Password protected
- **Network**: Internal overlay network

## Stack Features

### Production Optimizations

- **Multi-stage Docker build** for smaller images
- **Non-root user** for security
- **Health checks** for container monitoring
- **Resource limits** to prevent resource exhaustion
- **Logging configuration** with rotation
- **Rolling updates** with zero downtime
- **Multi-platform support** (AMD64/ARM64)

### High Availability

- **2 replicas** by default for redundancy
- **Restart policies** for automatic recovery
- **Rolling update strategy** for seamless deployments
- **Rollback configuration** for quick recovery

### Monitoring

- **Health check endpoint**: `/api/v2/stamps?limit=1`
- **Docker health checks** every 30 seconds
- **Centralized logging** with JSON format
- **Log rotation** (10MB max, 3 files)

## Scaling

```bash
# Scale to 4 replicas
docker service scale btc-stamps_btc-stamps-explorer=4

# Update with new image
docker service update --image mortylen/btcstampsexplorer:latest btc-stamps_btc-stamps-explorer
```

## Troubleshooting

### Check Service Status
```bash
docker stack services btc-stamps
docker service logs btc-stamps_btc-stamps-explorer
```

### Database Connection Issues
1. Verify database host accessibility from swarm nodes
2. Check firewall rules for MySQL port (3306)
3. Validate database credentials
4. Ensure database contains btc_stamps data

### Health Check Failures
```bash
# Check container logs
docker service logs --tail 50 btc-stamps_btc-stamps-explorer

# Manual health check
docker exec -it $(docker ps -q -f name=btc-stamps_btc-stamps-explorer) deno run --allow-net --allow-env healthcheck.ts
```

### Port Conflicts
If port 8000 is in use:
```yaml
ports:
  - target: 8000
    published: 8080  # Change to available port
    mode: ingress
```

## Image Building

### Automatic (GitHub Actions)
- Push to `main` branch triggers automatic build
- Images are pushed to `mortylen/btcstampsexplorer:latest`
- Multi-platform builds for AMD64 and ARM64

### Manual Build
```bash
# Build locally
docker build -t mortylen/btcstampsexplorer:latest .

# Push to Docker Hub
docker push mortylen/btcstampsexplorer:latest
```

## Security Considerations

- **Non-root containers** prevent privilege escalation
- **Resource limits** prevent resource exhaustion attacks
- **Health checks** enable quick detection of issues
- **Log rotation** prevents disk space exhaustion
- **Environment variable isolation** for sensitive data

## Backup Strategy

Since the application is stateless and uses an external database:
1. **Database backups** are handled separately
2. **Application state** is maintained in the database only
3. **Container recreation** has no data loss risk
4. **Configuration backup** via environment variables

## Updating

### Rolling Update (Zero Downtime)
```bash
# Update to new version
docker service update --image mortylen/btcstampsexplorer:v2.0.0 btc-stamps_btc-stamps-explorer

# Monitor rollout
docker service ps btc-stamps_btc-stamps-explorer
```

### Rollback
```bash
# Rollback to previous version
docker service rollback btc-stamps_btc-stamps-explorer
```

## Support

For issues:
1. Check container logs: `docker service logs btc-stamps_btc-stamps-explorer`
2. Verify database connectivity
3. Check Portainer event logs
4. Review GitHub repository for updates