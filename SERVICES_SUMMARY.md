# Tóm tắt các service được sử dụng trong dự án

Tài liệu này tổng hợp các service chính đang được dùng ở cả backend và frontend của dự án, bao gồm cả hạ tầng và các thư viện hỗ trợ.

## 1. Hạ tầng và service cốt lõi

| Service    | Vai trò                                                     | Nơi cấu hình / sử dụng                                                                                                         |
| ---------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| PostgreSQL | Cơ sở dữ liệu chính cho ứng dụng                            | [docker-compose.yml](docker-compose.yml)                                                                                       |
| Redis      | Dùng cho cache và làm backend cho hàng đợi email            | [docker-compose.yml](docker-compose.yml), [backend/src/config/redis/redis.config.ts](backend/src/config/redis/redis.config.ts) |
| Mailpit    | SMTP giả lập cho môi trường phát triển, giúp kiểm tra email | [docker-compose.yml](docker-compose.yml)                                                                                       |
| Cloudinary | Lưu trữ và quản lý ảnh đã upload                            | [backend/src/config/cloudinary/cloudinary.config.ts](backend/src/config/cloudinary/cloudinary.config.ts)                       |
| Nginx      | Phục vụ frontend ở môi trường production                    | [frontend/nginx.conf](frontend/nginx.conf)                                                                                     |

## 2. Backend services

### 2.1. HTTP API và auth

- Express server phục vụ API cho frontend.
- JWT được dùng cho xác thực người dùng và refresh token.
- Các route chính gồm auth, user, photo, album, admin.

### 2.2. Database service

- Prisma được dùng như ORM để tương tác với PostgreSQL.
- Dữ liệu chính bao gồm người dùng, ảnh, album và các thông tin liên quan.
- Cấu hình Prisma nằm ở [backend/prisma/schema.prisma](backend/prisma/schema.prisma).

### 2.3. Mail service

- Dùng Nodemailer để gửi email.
- Cấu hình mail server được định nghĩa trong [backend/src/config/mail/mailer.config.ts](backend/src/config/mail/mailer.config.ts).
- Trong môi trường phát triển, Mailpit đóng vai trò SMTP local để kiểm tra email.
- Email thường được gửi qua hệ thống queue để tránh chặn request chính.

### 2.4. Queue và background processing

- BullMQ dùng để xử lý công việc gửi email bất đồng bộ.
- Queue chạy dựa trên Redis, nên email được gửi ở background thay vì block request.
- Cấu hình queue nằm ở [backend/src/config/queue/email.queue.ts](backend/src/config/queue/email.queue.ts).

### 2.5. File upload và storage

- Multer kết hợp với Cloudinary để upload ảnh.
- Hệ thống hỗ trợ xóa ảnh khỏi Cloudinary khi dữ liệu bị chỉnh sửa hoặc xóa.
- Cấu hình upload được đặt ở [backend/src/config/cloudinary/cloudinary.config.ts](backend/src/config/cloudinary/cloudinary.config.ts).

### 2.6. Cache service

- Redis còn được dùng để cache dữ liệu album và photo, giúp giảm số lần gọi database.
- Các service liên quan đến caching xuất hiện trong các module album và photo.

## 3. Frontend services

### 3.1. API client

- Axios được dùng làm client giao tiếp với backend.
- Có interceptor xử lý refresh token và tự động redirect khi token hết hạn.
- File chính: [frontend/src/api/apiClient.ts](frontend/src/api/apiClient.ts).

### 3.2. Data fetching và caching

- React Query được dùng để fetch, cache và đồng bộ dữ liệu từ API.
- Thường dùng cho các màn hình feed, profile và quản trị.
- Cấu hình client được khởi tạo trong [frontend/src/main.tsx](frontend/src/main.tsx).

### 3.3. Notification service

- React Toastify dùng để hiển thị thông báo thành công, lỗi hoặc cảnh báo cho người dùng.
- Cấu hình toast container được khởi tạo ở [frontend/src/main.tsx](frontend/src/main.tsx).

### 3.4. Routing và UI support

- React Router DOM dùng cho điều hướng giữa các trang.
- Tailwind CSS hỗ trợ xây dựng giao diện nhanh và đồng nhất.

## 4. Mối liên hệ giữa các service

1. Frontend gọi API thông qua Axios.
2. Backend xác thực và xử lý dữ liệu bằng Prisma + PostgreSQL.
3. Ảnh upload được chuyển tới Cloudinary.
4. Email được enqueue vào BullMQ và gửi bởi worker sử dụng Redis.
5. Redis cũng phục vụ cache cho các dữ liệu phổ biến như album và photo.

## 5. Tóm tắt ngắn

- Backend chủ yếu dùng: PostgreSQL, Redis, Mail, Cloudinary, Prisma, BullMQ.
- Frontend chủ yếu dùng: Axios, React Query, React Toastify, React Router.
- Toàn bộ môi trường phát triển có thể chạy qua Docker Compose với các service: PostgreSQL, Redis, Mailpit, backend và frontend.
