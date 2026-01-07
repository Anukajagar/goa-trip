# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Set environment variable for production
ENV NODE_ENV=production

# Command to run the application
# We use node directly instead of nodemon for production
CMD ["node", "server/index.js"]
