# 🧩 Components Directory

**Mục đích:** Chứa các UI Component dùng chung (reusable) trên toàn bộ ứng dụng.

**Quy tắc Vàng (Dumb Components):**
* **Chỉ tập trung vào UI:** Các component ở đây nhận dữ liệu thông qua `props` và render giao diện.
* **Không gọi API:** Tuyệt đối không import `services` hay gọi API trực tiếp bên trong component này.
* **Không lưu trữ Global State:** Tránh kết nối trực tiếp với Context API hoặc Redux tại đây nếu không cần thiết. Trạng thái (state) nội bộ cho UI (như đóng/mở dropdown) thì được phép.

**Ví dụ:**
* `Button.jsx`, `InputField.jsx`, `Modal.jsx`, `LoadingSpinner.jsx`.