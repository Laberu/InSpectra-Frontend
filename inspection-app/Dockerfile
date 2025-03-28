# Use Node.js 20 Alpine base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build Next.js app
RUN npx next build

# Create writable tmp folder for extracted files
RUN mkdir -p /app/tmp/storage

# Expose the app port
EXPOSE 3002

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3002

# Start the app
CMD ["npx", "next", "start"]
