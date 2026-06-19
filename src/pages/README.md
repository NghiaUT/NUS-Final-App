# 📄 Pages Directory

**Mục đích:** Đại diện cho các màn hình (screens) cụ thể trong ứng dụng. Mỗi file trong này thường tương ứng với một đường dẫn (route).

**Quy tắc (Smart Components):**
* **Xử lý logic chính:** Nơi đây được phép gọi API (thông qua `services/`), tương tác với Global State (Context API), và xử lý logic nghiệp vụ.
* **Lắp ráp:** Lấy dữ liệu và truyền xuống các UI Component (trong thư mục `src/components/`) thông qua props.
* Có thể tạo thư mục con cho từng trang nếu trang đó đi kèm với các file nhỏ lẻ chỉ dùng riêng cho nó (ví dụ: `pages/Home/Home.jsx`, `pages/Home/HomeBanner.jsx`).

**Ví dụ:**
* `HomePage.jsx`, `LoginPage.jsx`, `UserProfile.jsx`.