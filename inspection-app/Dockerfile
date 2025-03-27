# Use Node.js 20 for development
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy all necessary files
COPY . .

# Expose development port
EXPOSE 3002

# Set environment to development
ENV NODE_ENV=development

# Run the dev server
CMD ["npm", "run", "dev"]
