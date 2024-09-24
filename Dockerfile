# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the .env file to the working directory
COPY .env ./

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000
