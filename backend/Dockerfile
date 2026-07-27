FROM node:20-alpine AS builder

WORKDIR /app

# Copy chỉ file package.json vào file để phục vụ việc build.
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . . 

RUN npm run build

# Run stage 2
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/prisma.config.js ./prisma.config.js

EXPOSE 3000

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

