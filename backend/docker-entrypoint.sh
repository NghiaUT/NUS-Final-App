#!/bin/sh
# File này mục đích để đồng bộ và tạo dữ liệu mẫu cho db
echo "Entrypoint started"
echo "Waiting for PostgreSQL..."

# Copy file cấu hình ra thư mục gốc thay vì dùng lệnh cd
cp dist/prisma.config.js ./prisma.config.js

until npx prisma db push --force-reset; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready."

echo "Running seed..."
node dist/prisma/seed.js

echo "Starting application..."
exec node dist/app.js