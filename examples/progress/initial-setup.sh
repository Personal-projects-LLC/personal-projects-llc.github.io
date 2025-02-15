#!/bin/bash

# Initialize PBS progress tracking
echo "Initializing PBS progress tracking..."

# Add initial sprint
pbs progress sprint start "Sprint 1" -g \
  "Setup project structure" \
  "Implement core features" \
  "Create documentation"

# Add completed tasks
pbs progress add "Project structure setup" \
  -t feature \
  -c easy \
  -s done \
  -d "Created basic project structure with TypeScript, ESLint, and Prettier" \
  --tags "setup" "infrastructure"

pbs progress add "CLI system implementation" \
  -t feature \
  -c medium \
  -s done \
  -d "Implemented basic CLI structure with commander.js" \
  --tags "cli" "infrastructure"

# Add in-progress tasks
pbs progress add "Documentation parser" \
  -t feature \
  -c hard \
  -s in-progress \
  -d "Implementing Markdown parser for documentation-driven development" \
  --tags "parser" "core"

pbs progress add "Component generator" \
  -t feature \
  -c medium \
  -s in-progress \
  -d "Creating component generation system from documentation" \
  --tags "generator" "core"

# Add planned tasks
pbs progress add "Testing framework setup" \
  -t feature \
  -c medium \
  -s planned \
  -d "Setting up Jest and React Testing Library" \
  --tags "testing" "infrastructure"

pbs progress add "Validation system" \
  -t feature \
  -c hard \
  -s planned \
  -d "Creating validation system for code and documentation sync" \
  --tags "validation" "core"

# Add blocked task
pbs progress add "CI/CD setup" \
  -t feature \
  -c medium \
  -s blocked \
  -d "Setting up GitHub Actions for CI/CD pipeline" \
  --tags "ci-cd" "infrastructure"

echo "Progress tracking initialized. Check PROGRESS.md and ROADMAP.md for details."
