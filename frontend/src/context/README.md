# 🌐 Context Directory

**Mục đích:** Chứa các Context API để quản lý và chia sẻ trạng thái toàn cục (Global State) xuyên suốt ứng dụng, giải quyết vấn đề Prop Drilling.

**Quy tắc:**
* Chỉ đưa vào Context những dữ liệu thực sự cần thiết ở nhiều nơi (như thông tin User đang đăng nhập, Giỏ hàng, Chế độ Sáng/Tối).
* Tránh đưa state cục bộ (local state) của một trang vào đây vì nó sẽ làm giảm hiệu năng ứng dụng (gây re-render không cần thiết).
* Luôn tạo custom hook (như `useAuth`, `useTheme`) để export context ra ngoài, giúp các component tiêu thụ dữ liệu dễ dàng hơn.

**Ví dụ:**
* `AuthContext.jsx`
* `ThemeContext.jsx`