# ---------- 1. Build stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# OS deps (needed for Prisma + OpenSSL)
RUN apk add --no-cache openssl

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the full project
COPY . .

# Generate Prisma client (this creates @prisma/client + .prisma)
RUN npx prisma generate

# Build NestJS into dist/
RUN npm run build


# ---------- 2. Production stage ----------
FROM node:22-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl

# ✅ Reuse built node_modules (with generated Prisma client)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# App code + prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose NestJS port
EXPOSE 3000

# Make sure this matches your package.json:
# "start:prod": "node dist/src/main.js"
CMD ["npm", "run", "start:prod"]
