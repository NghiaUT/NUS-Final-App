# --- Stage 1: Build React Vite app ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Serve bằng Nginx ---
FROM nginx:alpine

# Xóa trang default của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy cấu hình custom Nginx vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files từ stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]