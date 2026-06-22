# 🖼️ Layouts Directory

**Mục đích:** Định nghĩa các bộ khung/bố cục dùng chung cho các nhóm trang khác nhau trong ứng dụng.

**Quy tắc:**
* Sử dụng `<Outlet />` (từ `react-router-dom`) hoặc `children` prop để chèn nội dung của các trang con vào bên trong layout.
* Nếu layout quá phức tạp, có thể chia nhỏ thành các component con (như `Header.jsx`, `Sidebar.jsx`) và lưu ngay trong thư mục này hoặc tạo thư mục `components` riêng cho layout.

**Ví dụ:**
* `MainLayout.jsx` (Có Header, Footer dùng cho user).
* `AdminLayout.jsx` (Có Sidebar, Header riêng cho dashboard quản trị).