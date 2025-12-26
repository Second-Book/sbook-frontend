#!/bin/bash
set -e

# Configuration
SSH_HOST="${SSH_HOST}"
SSH_USER="${SSH_USER}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/sbook}"
FRONTEND_PATH="${DEPLOY_PATH}/frontend"

echo "Deploying frontend to ${SSH_USER}@${SSH_HOST}:${FRONTEND_PATH}"

# Create directory structure on server
ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
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
ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
  set -e
  DEPLOY_PATH="${DEPLOY_PATH:-/opt/sbook}"
  FRONTEND_PATH="\${DEPLOY_PATH}/frontend"
  
  cd \${FRONTEND_PATH}
  
  echo "Installing dependencies..."
  pnpm install --frozen-lockfile
  
  echo "Updating PM2 configuration..."
  if [ -f deploy/sbook-frontend.ecosystem.config.js ]; then
    pm2 delete sbook-frontend || true
    pm2 start deploy/sbook-frontend.ecosystem.config.js
    pm2 save
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

