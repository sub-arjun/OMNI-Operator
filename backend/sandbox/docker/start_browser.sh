#!/bin/bash
# Browser API startup script with pre-warming

echo "Starting Browser API service..."

# Start the browser API in the background
python /app/browser_api.py &
BROWSER_PID=$!

# Wait for the API to start
echo "Waiting for Browser API to start..."
for i in {1..30}; do
    if curl -s http://localhost:8003/api > /dev/null; then
        echo "Browser API is ready!"
        
        # Pre-warm the browser by making a test navigation
        echo "Pre-warming browser..."
        curl -X POST http://localhost:8003/api/automation/navigate_to \
            -H "Content-Type: application/json" \
            -d '{"url": "about:blank"}' > /dev/null 2>&1 || true
        
        echo "Browser pre-warming complete!"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 1
done

# Keep the browser API running
wait $BROWSER_PID 