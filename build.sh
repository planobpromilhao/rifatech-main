#!/bin/bash
set -e

echo "🏗️ Building frontend with production config..."
vite build --config vite.config.prod.ts

echo "🏗️ Building backend..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "✅ Build completed!"
