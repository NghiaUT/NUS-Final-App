# 🛠️ Utils Directory

**Mục đích:** Chứa các hàm tiện ích (helper functions), hằng số, hoặc bộ format dữ liệu. Đây là các file JavaScript thuần túy.

**Quy tắc:**
* **Pure Functions:** Các hàm trong này lý tưởng nhất là các hàm thuần khiết (truyền input A luôn luôn trả về output B) để dễ dàng viết test.
* Tuyệt đối không chứa bất kỳ thứ gì liên quan đến React (không hooks, không JSX, không state).

**Ví dụ:**
* `constants.js` (Chứa các biến hằng như `ROLE_ADMIN = 1`).
* `formatters.js` (Hàm format tiền tệ, định dạng ngày tháng).
* `validators.js` (Hàm kiểm tra email hợp lệ, kiểm tra số điện thoại).