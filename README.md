# Website bán sách tích hợp gợi ý sách cá nhân hóa

Tiểu luận tốt nghiệp - Khoa Công nghệ Thông tin - Trường Đại học Nông Lâm TP.HCM

- Sinh viên: Nguyễn Huy Bảo - 23130022 - DH23DTC
- GVHD: TS. Nguyễn Thị Phương Trâm

## Công nghệ

- Backend: Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA
- Frontend: ReactJS, Vite
- Cơ sở dữ liệu: MySQL 8
- Gợi ý sách: Collaborative Filtering (User-based, Item-based)

## Cấu trúc thư mục

```
src/                    mã nguồn backend (Spring Boot)
frontend/               mã nguồn frontend (React)
docs/
  database/             script tạo cơ sở dữ liệu
  diagrams/             sơ đồ use case (draw.io)
  recommendation/       thử nghiệm thuật toán gợi ý (Python)
  *.docx                tài liệu đặc tả, thiết kế, kế hoạch, báo cáo
```

## Cách chạy

1. Chạy file `docs/database/bookstore.sql` trong MySQL để tạo cơ sở dữ liệu.
2. Sửa username, password MySQL trong `src/main/resources/application.properties`.
3. Tạo biến môi trường `JWT_SECRET`, giá trị là chuỗi Base64 32 byte. Có thể tạo bằng PowerShell:
   ```
   $b = New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)
   ```
4. Chạy backend: `./mvnw spring-boot:run` (cổng 8080).
5. Chạy frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Mở http://localhost:5173

Chạy thử nghiệm gợi ý: tải `ratings.csv` và `books.csv` từ https://github.com/zygmuntz/goodbooks-10k vào thư mục `docs/recommendation/data/`, sau đó chạy `python docs/recommendation/cf_experiment.py`.
