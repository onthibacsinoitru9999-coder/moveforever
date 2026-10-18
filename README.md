# Move Forever - Interactive Body Map & Coaching Platform

Website phục hồi chấn thương & huấn luyện vận động chuyên nghiệp, clone chính xác từ cấu trúc và tính năng của [Move Forever Samples](https://moveforever.info/samples).

## 🌟 Tính Năng Nổi Bật

1. **Sơ Đồ Giải Phẫu Cơ Thể Tương Tác (Interactive Anatomy Body Map):**
   - Đồ họa giải phẫu cơ thể học sắc nét với 8 điểm xung nhịp phát sáng (pulse hotspots) chính xác theo tọa độ giải phẫu:
     - Khớp Vai (Shoulder)
     - Sức Mạnh Tổng Thể (General Strength)
     - Khuỷu Tay (Elbow)
     - Thắt Lưng & Cột Sống (Lower Back)
     - Cổ Tay & Cẳng Tay (Wrist)
     - Khớp Háng & Khung Chậu (Hip)
     - Khớp Gối (Knee)
     - Bàn Chân, Cổ Chân & Gân Gót (Foot, Ankle & Achilles)
   - Khi click vào bất kỳ vùng nào: Modal hiển thị danh sách bài tập phục hồi kèm số hiệp (sets), số lần (reps) và video YouTube hướng dẫn nhúng trực tiếp (xem ngay không cần chuyển trang).
   - Nút kêu gọi hành động (CTA) đưa thẳng tới form đăng ký tư vấn 1-1.

2. **Slider Phản Hồi Học Viên & Minh Chứng Kết Quả (Testimonial Slider):**
   - 22 hình ảnh thực tế từ các học viên đã phục hồi và cải thiện khả năng vận động.
   - Hỗ trợ vuốt chạm (touch swipe trên mobile), nút chuyển ảnh trước/sau, chấm chỉ số và tự động chạy (auto-slide).

3. **Biểu Mẫu Đánh Giá & Tiếp Nhận Chuyên Sâu (Deep Intake Form):**
   - Khung xác nhận điều kiện tham gia (Pre-qualification checklist) gồm 3 tiêu chí cam kết.
   - Hệ thống câu hỏi chi tiết về tiền sử chấn thương, vị trí đau (Trái/Phải), các yếu tố kích hoạt đau, thang điểm đau (1-10), mức độ tự tin (1-10), mục tiêu 6 tháng tới, địa điểm mong muốn tập (Gym/Nhà).
   - Tự động lưu trữ hồ sơ nộp vào `localStorage` trên trình duyệt và hiển thị thông báo gửi thành công chuyên nghiệp.

4. **Hỗ Trợ Song Ngữ (Bilingual EN / VI):**
   - Nút chuyển đổi ngôn ngữ tức thì giữa **Tiếng Việt** và **Tiếng Anh (Bản gốc)** tại thanh menu trên cùng.

---

## 🚀 Cách Chạy & Xem Thử Nghiệm

Bạn có thể mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc) hoặc dùng live-server:

### Cách 1: Mở trực tiếp
Nhấp đúp chuột vào file:
`e:\video\ortho video\moveforever_site\index.html`

### Cách 2: Khởi động Local Server với Python
```powershell
cd "e:\video\ortho video\moveforever_site"
python -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` trên trình duyệt.

---

## ⚙️ Tùy Biến Dễ Dàng

- **Đổi Logo / Hình Ảnh:** Thay đổi link ảnh trong `index.html` và `app.js` (biến `TESTIMONIAL_IMAGES`).
- **Thêm / Bớt Điểm Trên Cơ Thể:** Chỉnh sửa mảng `DOTS` và đối tượng `EXERCISE_DATA` trong `app.js`.
- **Kết Nối Nhận Dữ Liệu Form:**
  - Có thể tích hợp dễ dàng với Google Forms, Google Sheets API, Formspree (`https://formspree.io/f/your_id`), Telegram Bot hoặc Webhook n8n / Zapier trong hàm `appForm.addEventListener('submit', ...)` ở `app.js`.
