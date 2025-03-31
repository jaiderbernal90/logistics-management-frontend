# Coordinadora Logística - Microfrontends Deployment Guide

This repository contains the microfrontend architecture for the Coordinadora Logística shipping management system. The application is structured as a set of independently deployable frontend modules that work together to provide a complete shipping management solution.

# Architecture

The application follows a microfrontend architecture pattern with:

Auth Module: Handles user authentication and registration
Shipping Module: Manages shipment creation, tracking, and updates
Each microfrontend is built with React, TypeScript, and leverages Vite for building and Module Federation for runtime integration.

# Prerequisites

Node.js 18.x or higher
npm 9.x or higher
Docker and Docker Compose (for containerized deployment)
Local Development Setup
Clone the repository:
bash
git clone https://github.com/your-org/coordinadora-frontend.git
cd coordinadora-frontend
Install dependencies for all microfrontends:
bash

# Install dependencies for all modules

npm run install:all

# Or install individually

cd auth && npm install
cd ../shipping && npm install
npm run start
