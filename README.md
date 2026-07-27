# React Final App

Fotobook là một ứng dụng web full-stack cho phép người dùng quản lý ảnh, tạo album, tương tác như thích, theo dõi người dùng và sử dụng các tính năng xác thực tài khoản. Dự án được xây dựng với kiến trúc phân tách rõ ràng giữa frontend và backend, phù hợp cho việc học tập, phát triển phần mềm và mở rộng thêm các tính năng mạng xã hôi.

## 1. Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy của bạn đã cài sẵn:

- Node.js 20.x trở lên
- npm hoặc pnpm
- PostgreSQL đang chạy
- Redis đang chạy
- Git

## 2. Công nghệ chính

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Query
- Axios
- React Toastify

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT cho xác thực
- Redis + BullMQ cho hàng đợi và cache
- Nodemailer cho gửi email xác thực
- Multer cho upload file

## 3. Cài đặt và chạy ở môi trường local

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd react_final_app
```

### Bước 2: Cài đặt dependencies

Cài đặt cho backend:

```bash
cd backend
npm install
```

Cài đặt cho frontend:

```bash
cd ../frontend
npm install
```

### Bước 3: Cấu hình môi trường

Backend sử dụng file môi trường trong thư mục backend. Hãy tạo hoặc chỉnh sửa file `.env` dựa trên `.env.example`:

```bash
cd backend
cp .env.example .env
```

Một số biến môi trường cần thiết bao gồm:

- `DATABASE_URL`: chuỗi kết nối PostgreSQL
- `CLIENT_URL`: địa chỉ frontend, thường là `http://localhost:5173`
- `SERVER_URL`: địa chỉ backend, thường là `http://localhost:3000`
- `REDIS_CLIENT_HOST` và `REDIS_CLIENT_PORT`
- Các biến SMTP nếu bạn muốn bật chức năng gửi email

Frontend cũng cần file `.env`:

```bash
cd ../frontend
cp .env.example .env
```

Sau đó, thiết lập biến:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

### Bước 4: Khởi động cơ sở dữ liệu

Đảm bảo PostgreSQL và Redis đang chạy trên máy cục bộ trước khi bắt đầu ứng dụng.

### Bước 5: Đồng bộ Prisma, tạo schema

```bash
cd ../backend
npm run prisma
```

Khởi tạo dữ liệu mẫu bằng

```bash
npm run seed
```

Lệnh này sẽ giúp áp dụng schema vào database và tạo Prisma client.

### Bước 6: Chạy ứng dụng

Chạy backend:

```bash
cd backend
npm run dev
```

Backend sẽ chạy tại:

- http://localhost:3000

Chạy frontend:

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại:

- http://localhost:5173

## 4. Ví dụ cơ bản về cách sử dụng

Sau khi ứng dụng đã chạy, bạn có thể làm theo các bước sau:

1. Mở trình duyệt và truy cập `http://localhost:5173`
2. Đăng ký một tài khoản mới hoặc đăng nhập nếu đã có tài khoản
3. Tải lên ảnh mới và tạo album
4. Xem feed, thích ảnh/album hoặc theo dõi người dùng khác
5. Nếu bạn có vai trò quản trị, truy cập các chức năng quản lý từ giao diện admin

Ví dụ đơn giản:

- Đăng ký tài khoản
- Đăng nhập
- Chọn chức năng “Upload Photo”
- Điền thông tin ảnh và tải file lên
- Xem ảnh vừa đăng trên trang chủ hoặc trong album của bạn

## Ghi chú

- Ứng dụng backend phục vụ cả API và file upload thông qua thư mục `uploads`
- Nếu bạn muốn phát triển thêm tính năng, có thể bắt đầu từ các route trong thư mục `backend/src/routes` và các component trong `frontend/src`
- Người dùng mẫu được tạo ra thông qua `db seed`
