# Frontend - Fotobook UI

Frontend của dự án React Final App là giao diện người dùng được xây dựng bằng React, TypeScript và Vite. Mục tiêu chính là hiển thị UI tương tác cho người dùng, quản lý ảnh, album, theo dõi người dùng, dashboard admin và các luồng xác thực.

## Mục tiêu hệ thống

- Hiển thị giao diện quản lý tài khoản và ảnh
- Tương tác với REST API backend thông qua API layer
- Điều hướng theo route bảo vệ và public route
- Tạo trải nghiệm responsive và thân thiện với người dùng
- Tách rõ UI component, page, hook và context

## Công nghệ chính

- React 19 + TypeScript
- Vite làm tool build và dev server
- React Router DOM cho routing SPA
- TanStack React Query để cache và synchronize dữ liệu API
- Axios để thực hiện HTTP request
- Tailwind CSS cho styling utility-first
- React Toastify để hiển thị thông báo
- Lucide React cho icon hệ thống
- Zod để validate input trên client nếu cần
- ESLint và Prettier hỗ trợ chất lượng code

## Cấu trúc thư mục

```text
frontend/
├── index.html
├── nginx.conf
├── public/                  # File asset tĩnh, favicon, hình ảnh công khai
├── src/
│   ├── App.tsx              # Root component, layout container
│   ├── main.tsx             # Bootstrap React App
│   ├── api/                 # Service layer gọi backend API
│   ├── assets/              # Hình ảnh, font, icon, resource tĩnh
│   ├── components/          # Component tái sử dụng
│   ├── context/             # Context provider cho auth, app state
│   ├── hooks/               # Custom hooks
│   ├── layouts/             # Layout tổng, sidebar, navbar
│   ├── pages/               # Trang UI chính theo chức năng
│   ├── routes/              # Định nghĩa route, router guard
│   ├── types/               # TypeScript interfaces/types
│   └── utils/               # Hàm hỗ trợ, formatter, helper
└── vite.config.ts
```

## Cách tổ chức file

- `api/` đóng vai trò service layer, gom các hàm gọi HTTP tới backend và xử lý response chuẩn.
- `pages/` lưu các view/page theo domain: login, register, profile, photo feed, album, admin.
- `components/` chứa component phân vùng UI như card, modal, form, header, photo grid, sidebar.
- `layouts/` định nghĩa layout phía ngoài như layout của toàn app hoặc admin.
- `routes/` chịu trách nhiệm định nghĩa `BrowserRouter` và route bảo vệ theo auth/role.
- `context/` lưu state toàn cục như auth context, notification, user session.
- `hooks/` chứa custom hook giúp gọn component và tái sử dụng logic.
- `types/` mô tả kiểu dữ liệu nhận từ API hoặc UI.
- `utils/` chứa các helper chung như xử lý ngày, định dạng chuỗi, xử lý URL.

## Chạy ứng dụng

Cài đặt dependency:

```bash
npm install
```

Chạy dev server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Ghi chú

- `VITE_BACKEND_URL` trong file môi trường front-end phải trỏ tới địa chỉ API backend.
- Giao diện frontend tương tác với backend theo chuẩn REST API, không nên trực tiếp gọi database.
- Tổ chức component và pages theo tính năng giúp dễ mở rộng, bảo trì và kiểm thử.
