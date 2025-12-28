#!/bin/bash
set -e

# Configuration
SSH_HOST="${SSH_HOST}"
SSH_USER="${SSH_USER}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/sbook}"
FRONTEND_PATH="${DEPLOY_PATH}/frontend"

echo "Deploying frontend to ${SSH_USER}@${SSH_HOST}:${FRONTEND_PATH}"

# Create directory structure on server
ssh ${SSH_USER}@${SSH_HOST} << ENDSSH
  set -e
  DEPLOY_PATH="${DEPLOY_PATH:-/opt/sbook}"
  FRONTEND_PATH="\${DEPLOY_PATH}/frontend"
  
  mkdir -p \${FRONTEND_PATH}/logs
ENDSSH

# Copy built application
echo "Copying application files..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next/cache' \
  --exclude='.env' \
  --exclude='logs' \
  --exclude='*.log' \
  ./ ${SSH_USER}@${SSH_HOST}:${FRONTEND_PATH}/

# Deploy on server
ssh ${SSH_USER}@${SSH_HOST} bash << ENDSSH
  set -e
  DEPLOY_PATH="${DEPLOY_PATH:-/opt/sbook}"
  FRONTEND_PATH="\${DEPLOY_PATH}/frontend"
  
  echo "Checking system dependencies..."
  
  # Check required commands and tools
  MISSING_DEPS=""
  
  # Check node (should come with npm)
  if ! command -v node &> /dev/null; then
    MISSING_DEPS="\${MISSING_DEPS}node "
  fi
  
  # Check curl (needed for health checks)
  if ! command -v curl &> /dev/null; then
    MISSING_DEPS="\${MISSING_DEPS}curl "
  fi
  
  # Activate pnpm and check availability
  export PNPM_HOME="\$HOME/.local/share/pnpm"
  if [ -d "\$PNPM_HOME" ]; then
    export PATH="\$PNPM_HOME:\$PATH"
  fi
  
  if ! command -v pnpm &> /dev/null; then
    MISSING_DEPS="\${MISSING_DEPS}pnpm "
  fi
  
  # Check pm2 (should be available after pnpm is activated)
  if ! command -v pm2 &> /dev/null; then
    MISSING_DEPS="\${MISSING_DEPS}pm2 "
  fi
  
  # Fail fast if dependencies are missing
  if [ -n "\${MISSING_DEPS}" ]; then
    echo "ERROR: Missing required system dependencies: \${MISSING_DEPS}"
    echo ""
    echo "Install missing dependencies:"
    if echo "\${MISSING_DEPS}" | grep -q "node "; then
      echo "  node: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
    fi
    if echo "\${MISSING_DEPS}" | grep -q "pnpm "; then
      echo "  pnpm: curl -fsSL https://get.pnpm.io/install.sh | sh -"
    fi
    if echo "\${MISSING_DEPS}" | grep -q "pm2 "; then
      echo "  pm2: pnpm install -g pm2"
    fi
    if echo "\${MISSING_DEPS}" | grep -q "curl "; then
      echo "  curl: sudo apt-get install -y curl"
    fi
    exit 1
  fi
  
  echo "All system dependencies are available"
  
  cd \${FRONTEND_PATH}
  
  echo "Installing dependencies..."
  # Use --no-frozen-lockfile to allow pnpm to update lockfile if versions differ
  # This handles cases where pnpm version on server differs from lockfile version
  # Lockfile is not copied to server (in .gitignore), so we generate it from package.json
  pnpm install --no-frozen-lockfile
  
  echo "Updating PM2 configuration..."
  # Export environment variables for PM2 ecosystem config
  export FRONTEND_PORT="\${FRONTEND_PORT:-3000}"
  export DEPLOY_PATH="\${DEPLOY_PATH}"
  export PNPM_PATH="\${PNPM_HOME}/pnpm"
  
  if [ -f deploy/sbook-frontend.ecosystem.config.js ]; then
    pm2 delete sbook-frontend || true
    pm2 start deploy/sbook-frontend.ecosystem.config.js
    pm2 save
    echo "PM2 configuration updated (FRONTEND_PORT=\${FRONTEND_PORT}, DEPLOY_PATH=\${DEPLOY_PATH})"
  else
    pm2 restart sbook-frontend || pm2 start pnpm --name sbook-frontend -- start
    pm2 save
  fi
  
  echo "Waiting for service to start..."
  sleep 3
  
  echo "Health check..."
  FRONTEND_PORT="${FRONTEND_PORT:-3000}"
  curl -f http://127.0.0.1:\${FRONTEND_PORT} || exit 1
  
  echo "Deployment completed successfully"
ENDSSH

echo "Frontend deployment finished"

