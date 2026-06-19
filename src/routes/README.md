# 🔀 Routes Directory

**Mục đích:** Nơi tập trung cấu hình toàn bộ sơ đồ điều hướng (routing) của dự án. 

**Quy tắc:**
* Tách biệt cấu hình route ra khỏi `App.jsx` để giữ cho component gốc luôn sạch sẽ.
* Phân tách rõ ràng giữa các luồng:
  * **Public Routes:** Ai cũng vào được (Login, Register, Home).
  * **Private/Protected Routes:** Yêu cầu đăng nhập (Dashboard, Profile).
* Sử dụng cơ chế Lazy Loading (`React.lazy`) cho các route để tối ưu hóa hiệu suất tải trang ban đầu.

**Ví dụ:**
* `index.jsx` (Tổng hợp routes).
* `PublicRoute.jsx`, `PrivateRoute.jsx` (Các component bảo vệ đường dẫn).