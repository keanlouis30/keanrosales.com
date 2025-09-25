#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output is in ./build directory"

# List build contents for verification
echo "📋 Build contents:"
ls -la build/
