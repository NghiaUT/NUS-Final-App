# Backend - Fotobook API

Backend của dự án React Final App được xây dựng bằng Node.js, Express và TypeScript, chịu trách nhiệm cung cấp API cho hệ thống quản lý ảnh, album, người dùng, xác thực và các chức năng admin.

## Mục tiêu hệ thống

- Cung cấp REST API cho frontend
- Xử lý xác thực người dùng bằng JWT / Passport
- Quản lý dữ liệu với Prisma ORM và PostgreSQL
- Hỗ trợ upload ảnh và lưu file lên Cloudinary / thư mục uploads
- Tích hợp Redis + BullMQ cho queue / cache / xử lý nền
- Gửi email xác thực và thông báo bằng Nodemailer / Resend

## Công nghệ chính

- Node.js runtime và Express 5
- TypeScript để tăng độ an toàn type-checking
- Prisma ORM để định nghĩa schema và truy vấn PostgreSQL
- PostgreSQL làm hệ quản trị dữ liệu chính
- Redis + BullMQ để xử lý tác vụ nền và cache
- JWT + Passport Oauth cho xác thực người dùng
- Multer + Cloudinary cho upload file và ảnh
- Zod cho validate DTO / input form
- Dotenv, Helmet, CORS, Morgan, Compression cho middleware bảo mật và logging

## Cấu trúc thư mục

```text
backend/
├── app.ts                     # Entry point của ứng dụng Express
├── Dockerfile                 # Docker build cho backend
├── docker-entrypoint.sh       # Script chạy container
├── prisma/
│   ├── schema.prisma          # Schema Prisma, mô hình database
│   ├── seed.ts                # Seed dữ liệu mẫu
│   └── migrations/            # Migration Prisma
├── scripts/
│   ├── backfillAlbumNoAccent.ts
│   └── backfillPhotoNoAccent.ts
└── src/
    ├── server.ts              # Khởi tạo server và cấu hình app
    ├── config/                # Cấu hình Redis, Auth, Cloudinary, Multer, Mail, Prisma, Queue
    ├── controllers/           # Controller xử lý HTTP request
    ├── routes/                # Định nghĩa API endpoint
    ├── services/              # Logic nghiệp vụ chính
    ├── middlewares/           # Auth, error handling, cleanup middleware
    ├── types/                 # Các type dùng trong backend
    └── utils/                 # JWT, response, validator, remove file, upload helpers...
```

## Cách tổ chức file

- `controllers/` nhận request, validate đầu vào cơ bản và gọi service tương ứng.
- `services/` chứa toàn bộ logic nghiệp vụ, truy vấn Prisma, xử lý upload, tính năng album, photo, user, admin.
- `routes/` ánh xạ URL API tới controller. Mỗi route thường tập trung theo domain: `auth`, `user`, `photo`, `album`, `admin`.
- `config/` lưu các cài đặt hệ thống như database, Redis, Cloudinary, mail, Passport, queue và multer.
- `middlewares/` chứa middleware network-level và auth-level, ví dụ `auth.middleware.ts` và `error.middleware.ts`.
- `utils/` là nơi đặt các hàm tiện ích dùng chung, ví dụ `jwt.util.ts`, `sendRespone.util.ts`, `validator.util.ts`.
- `prisma/` quản lý schema, migration, seed để đồng bộ dữ liệu và tạo Prisma client.

## Chạy ứng dụng

Cài đặt dependency:

```bash
npm install
```

Chạy ở môi trường dev:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Tạo Prisma client và push schema:

```bash
npm run prisma
```

Seed dữ liệu mẫu:

```bash
npm run seed
```

## Ghi chú

- Kết nối database được cấu hình qua biến môi trường `DATABASE_URL`.
- Backend phục vụ cả API REST và upload file qua thư mục `uploads` / Cloudinary.
- Tất cả API endpoint đều được gom theo module và tương ứng với các vai trò nghiệp vụ.
