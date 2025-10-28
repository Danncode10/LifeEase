#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")"

# Activate the virtual environment
source server/venv/bin/activate

# Run the Uvicorn server
uvicorn server.main:app --host 0.0.0.0 --port 8000
