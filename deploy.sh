#!/bin/bash

# Mood Room - Netlify Deployment Script
echo "🚀 Deploying Mood Room to Netlify..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files generated in 'out' folder"
    echo ""
    echo "🌐 Deployment options:"
    echo "1. Drag & Drop: Upload the 'out' folder to netlify.com"
    echo "2. Git-based: Push to GitHub and connect to Netlify"
    echo "3. CLI: Run 'netlify deploy --prod --dir=out'"
    echo ""
    echo "📋 Files ready for deployment:"
    ls -la out/
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
