# Tài liệu dự án

**Đề tài:** Xây dựng website thương mại điện tử bán sách tích hợp hệ thống gợi ý sách cá nhân hóa bằng trí tuệ nhân tạo

**Sinh viên:** Nguyễn Huy Bảo – 23130022 – DH23DTC
**GVHD:** TS. Nguyễn Thị Phương Trâm
**Học kỳ:** 2, năm học 2026-2027

## Mục lục

| Thư mục | Nội dung | Trạng thái |
|---|---|---|
| [01-srs](01-srs/README.md) | Đặc tả yêu cầu phần mềm: tác nhân, yêu cầu chức năng, phi chức năng, use case | Đang viết |
| [02-database](02-database/README.md) | Sơ đồ ERD và mô tả các bảng | Hoàn thành |
| [03-api](03-api/README.md) | Tài liệu API | Đang viết |
| 04-architecture | Kiến trúc hệ thống, luồng xử lý | Chưa bắt đầu |
| 05-recommendation | Nghiên cứu Collaborative Filtering và kết quả thực nghiệm | Chưa bắt đầu |
| [diagrams](diagrams/README.md) | Sơ đồ UML (draw.io) và ảnh export | Đang làm |
| reports | Kế hoạch nghiên cứu, báo cáo tiến độ, slide | Chưa bắt đầu |

## Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Backend | Java 21, Spring Boot 4.1, Spring Data JPA, Spring Security (JWT – OAuth2 Resource Server) |
| Cơ sở dữ liệu | MySQL 8.4 (InnoDB, utf8mb4) |
| Frontend | ReactJS (dự kiến) |
| Gợi ý | Collaborative Filtering (User-based, Item-based) |

## Hướng dẫn chạy backend

### Yêu cầu

- JDK 21
- MySQL 8.x
- Maven: dùng Maven wrapper có sẵn (`mvnw`), không cần cài riêng

### Các bước

1. **Tạo cơ sở dữ liệu:** chạy file [`schema.sql`](../schema.sql) trong MySQL (Navicat, Workbench...). File có thể chạy lại nhiều lần, nhưng mỗi lần chạy sẽ **xóa toàn bộ dữ liệu** để tạo lại bảng.

2. **Cấu hình kết nối:** sửa `spring.datasource.username` và `spring.datasource.password` trong `src/main/resources/application.properties` cho đúng tài khoản MySQL trên máy.

3. **Đặt biến môi trường `JWT_SECRET`** (bắt buộc, thiếu biến này ứng dụng không khởi động được). Giá trị là chuỗi ngẫu nhiên 32 byte mã hóa Base64, tạo bằng PowerShell:

   ```powershell
   $b = New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)
   ```

   Đặt biến trong Windows Environment Variables (sau đó khởi động lại IntelliJ/terminal) hoặc trong IntelliJ: *Run → Edit Configurations → Environment variables*. Không commit giá trị này lên git.

4. **Chạy ứng dụng:**

   ```powershell
   ./mvnw spring-boot:run
   ```

   Ứng dụng chạy ở `http://localhost:8080`. Log có dòng `Started BookstoreApplication` là thành công.
