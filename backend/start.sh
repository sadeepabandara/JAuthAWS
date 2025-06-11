#!/bin/bash
cd /home/ec2-user/JAuthAWS/backend

# Install deps
npm install

# Start the app (adjust if you use PM2 or different command)
npm start > backend.log 2>&1 &
