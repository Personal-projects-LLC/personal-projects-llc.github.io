#!/bin/bash
set -e # Exit on error

echo "🚀 Starting PBS development setup..."

echo "🧹 Cleaning up previous build..."
rm -rf dist

echo "📦 Building project..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🔑 Making CLI executable..."
chmod +x dist/pbs.js || { echo "❌ Failed to make CLI executable"; exit 1; }

echo "🔗 Creating development symlink..."
npm link || { echo "❌ Failed to create symlink"; exit 1; }

echo "🏗️ Initializing PBS..."
./dist/pbs.js init || { echo "❌ PBS initialization failed"; exit 1; }

echo "📝 Setting up example progress tracking..."
./examples/progress/initial-setup.sh || { echo "❌ Progress setup failed"; exit 1; }

echo "📊 Generated files:"
ls -la PROGRESS.md ROADMAP.md || echo "⚠️ No generated files found"

echo "📋 Progress Report:"
if [ -f PROGRESS.md ]; then
  cat PROGRESS.md
else
  echo "⚠️ PROGRESS.md not found"
fi

echo "✅ Setup completed successfully!"
