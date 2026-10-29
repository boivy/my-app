# BÀI TỔNG HỢP FASHION

Nộp hai thư mục `my-app` và `my-server-mongodb`. Không cần nộp `node_modules` hoặc `.angular/cache`.

## Chạy bài

Cần Node.js tương thích Angular trong package.json và MongoDB chạy ở mongodb://127.0.0.1:27017.

Terminal 1:
```powershell
cd my-server-mongodb
npm.cmd install
npm.cmd run seed
npm.cmd start
```
Terminal 2:
```powershell
cd my-app
npm.cmd install
npm.cmd run start:admin
```
Terminal 3:
```powershell
cd my-app
npm.cmd run start:client
```

Quản trị: http://localhost:4001/admin-fashion
Khách: http://localhost:4002/client-fashion
API: http://localhost:4000/fashions

Dùng chung một Angular project trong my-app cho hai module admin-fashion và client-fashion theo yêu cầu nộp hai folder; hai lệnh serve chạy trên cổng riêng. Dùng Angular hiện tại của bài học, không phải AngularJS 1.x. Backend server-fashion nằm trong my-server-mongodb. Các bài học cũ vẫn có thể truy cập bằng route cũ.

## MongoDB
Database FashionData, một collection Fashion. Cấu trúc:
- _id: ObjectId do MongoDB tự sinh.
- fashion_subject: String, tiêu đề.
- fashion_detail: String, HTML do trình soạn thảo WYSIWYG tạo.
- fashion_image: String, URL thumbnail hoặc data URL ảnh.
- style: String, tên Style.
- createdAt: BSON Date, ngày tạo do server đặt, giữ nguyên khi sửa.

Seed tạo 12 bài: Street Style, Trends, Classic, mỗi nhóm 4 bài. Chạy lại không tạo trùng bài mẫu. Ảnh mẫu tải từ Unsplash, cần internet để hiển thị.
Có index createdAt và index ghép style/createdAt.
Đổi MongoDB qua biến môi trường MONGODB_URI; đổi cổng API qua PORT (cần sửa proxy Angular tương ứng).

## REST API
- GET /fashions: toàn bộ, ngày tạo giảm dần.
- GET /fashions?style=Street%20Style: lọc chính xác Style.
- GET /fashions/:id: chi tiết.
- POST /fashions: thêm, trả 201.
- PUT /fashions/:id: sửa, giữ ngày tạo.
- DELETE /fashions/:id: xóa, trả 204.
POST/PUT nhận JSON gồm fashion_subject, fashion_detail, fashion_image, style.
400 cho dữ liệu/ID không hợp lệ; 404 khi không tìm thấy; 503 khi không kết nối MongoDB.

## Chức năng
Quản trị: danh sách mới nhất trước, xem chi tiết, thêm/sửa, xác nhận trước khi xóa, lưu xong về danh sách. WYSIWYG tích hợp dùng contenteditable và API định dạng của trình duyệt, không cần CDN/API key; hỗ trợ đậm/nghiêng, heading, đoạn văn, danh sách, ảnh và hoàn tác. execCommand là API cũ nhưng vẫn dùng được trên Chrome/Edge; đây là editor phục vụ bài học.
Khách: nhóm bài theo Style, tìm Style bằng cách nhập hoặc chọn gợi ý, mở chi tiết có HTML/ảnh. Angular tự sanitize HTML khi hiển thị bằng innerHTML.
Đây là bài demo quản trị, chưa có đăng nhập/phân quyền production.

## Kiểm tra
```powershell
cd my-app
npm.cmd run build
```
```powershell
cd my-server-mongodb
npm.cmd test
```
Test API cần MongoDB đang chạy và đã seed; tạo rồi xóa bản ghi test.

## Khởi chạy nhanh (đã cập nhật)
Chỉ cần mở terminal trong my-app và chạy npm.cmd run start:admin hoặc npm.cmd run start:client. Hai lệnh này tự bật API Fashion cổng 4000 nếu chưa chạy. Giữ terminal mở; MongoDB phải đang chạy. Truy cập đúng http://localhost:4001/admin-fashion hoặc http://localhost:4002/client-fashion. Không mở localhost thiếu số cổng.
