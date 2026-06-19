# 🎣 Hooks Directory

**Mục đích:** Lưu trữ các Custom Hooks tự viết để tái sử dụng logic (thường liên quan đến state hoặc vòng đời component) giữa các file khác nhau.

**Quy tắc:**
* Tên file và tên hàm BẮT BUỘC phải bắt đầu bằng chữ `use` (quy ước của React).
* Hook chỉ chứa logic, không trả về mã JSX (giao diện).

**Ví dụ:**
* `useWindowSize.js` (Lắng nghe kích thước màn hình).
* `useDebounce.js` (Trì hoãn hành động, rất tốt cho ô tìm kiếm).
* `useClickOutside.js` (Bắt sự kiện click ra ngoài một component, dùng cho Modal/Dropdown).