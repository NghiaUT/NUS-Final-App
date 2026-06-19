# 🔌 API Directory

**Mục đích:** Lớp trung gian chịu trách nhiệm giao tiếp với Backend (gọi API).

**Quy tắc:**
* **Tuyệt đối không chứa logic UI:** Chỉ nhận tham số, gọi API và trả về dữ liệu (hoặc ném ra lỗi).
* **Quản lý tập trung:** * Cấu hình thư viện gọi API (ví dụ: `axios`) tại một file duy nhất (`apiClient.js`), thiết lập sẵn Base URL, Token Headers và Interceptors.
  * Phân chia các file service theo resource/thực thể (User, Product, Order).

**Ví dụ:**
* `apiClient.js` (Cấu hình Axios base).
* `authService.js` (Login, Register).
* `productService.js` (GetProducts, CreateProduct).