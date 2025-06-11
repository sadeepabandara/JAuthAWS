#!/bin/bash
cd /home/ec2-user/JAuthAWS/frontend

# Install deps and build the app
npm install
npm run build

# Serve using serve package (install globally if not yet)
npm install -g serve
serve -s build -l 3000 > frontend.log 2>&1 &
