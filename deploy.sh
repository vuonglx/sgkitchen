#!/bin/bash

# Vietnamese Restaurant Next.js Deployment Script
# This script builds and deploys the application to Firebase

echo "🍜 Starting deployment for Saigon Kitchen..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Please login to Firebase first:"
    echo "firebase login"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your Vietnamese restaurant website is now live!"
    
    # Get the hosting URL
    PROJECT_ID=$(firebase use --current)
    echo "🔗 Visit your site at: https://$PROJECT_ID.web.app"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi

echo "🎉 Deployment complete!"
