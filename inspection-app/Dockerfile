# Use Node.js 20 for better compatibility
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies using npm ci for consistency
RUN npm ci

# Copy only necessary files
COPY public ./public
COPY src ./src
COPY next.config.mjs ./
COPY tailwind.config.js ./
COPY postcss.config.mjs ./

# Build the Next.js application
RUN npx next build

# Use a minimal Node.js 20 runtime image for production
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the built output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set the environment to production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Run the application in production mode
CMD ["npx", "next", "start"]
