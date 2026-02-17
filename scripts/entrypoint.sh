#!/bin/sh
set -e

echo "Starting Entrypoint Script..."

# Ensure storage directory exists
mkdir -p /app/storage

# Check if DATABASE_URL is set, otherwise use default
if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="file:/app/storage/prodllm.db"
fi

echo "Running database initialization with DATABASE_URL=${DATABASE_URL}"

# Run prisma db push to ensure schema is up to date in the volume
# Note: npx prisma will download prisma if not found in local node_modules
npx prisma db push --accept-data-loss

echo "Database initialized. Starting application..."

# Start the application
exec node server.js
