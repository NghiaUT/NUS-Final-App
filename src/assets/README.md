# 📂 Assets Directory

**Mục đích:** Nơi lưu trữ tất cả các tài nguyên tĩnh (static resources) được sử dụng trong dự án.

**Quy tắc:**
* Không chứa bất kỳ file logic JavaScript hay React Component nào ở đây.
* Phân loại tài nguyên thành các thư mục con cho gọn gàng (ví dụ: `/images`, `/icons`, `/fonts`).
* Đối với các icon dạng SVG, ưu tiên sử dụng thư viện (như `lucide-react`) thay vì lưu trữ file cứng, trừ khi đó là logo riêng của dự án.

**Cấu trúc ví dụ:**
assets/
  ├── images/
  │   └── logo.png
  └── styles/
      └── global.css