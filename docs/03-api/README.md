# Tài liệu API

- Base URL: `http://localhost:8080`
- Định dạng: JSON, UTF-8
- Xác thực: JWT, gửi qua header `Authorization: Bearer <accessToken>`

| Nhóm | Tài liệu | Trạng thái |
|---|---|---|
| Xác thực | [auth.md](auth.md) | Hoàn thành |
| Sách, thể loại | | Chưa làm |
| Giỏ hàng | | Chưa làm |
| Đơn hàng | | Chưa làm |
| Đánh giá | | Chưa làm |
| Gợi ý | | Chưa làm |
| Quản trị | | Chưa làm |

## Định dạng lỗi chung

Lỗi nghiệp vụ:
```json
{ "message": "Email đã được sử dụng" }
```

Lỗi dữ liệu đầu vào (HTTP 400), liệt kê lỗi của từng trường:
```json
{
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "email": "Email không hợp lệ",
    "password": "Mật khẩu phải từ 6 đến 100 ký tự"
  }
}
```

| Mã HTTP | Ý nghĩa |
|---|---|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Dữ liệu không hợp lệ |
| 401 | Chưa đăng nhập, token sai/hết hạn, hoặc sai email/mật khẩu |
| 403 | Không có quyền, hoặc tài khoản bị khóa |
| 404 | Không tìm thấy |
| 409 | Xung đột dữ liệu (ví dụ email đã tồn tại) |

## JWT

| Thuộc tính | Giá trị |
|---|---|
| Thuật toán | HS256, khóa lấy từ biến môi trường `JWT_SECRET` |
| Thời hạn | 1440 phút (1 ngày), cấu hình bằng `app.jwt.expiration-minutes` |
| `sub` | Email người dùng |
| `userId` | ID người dùng |
| `roles` | Danh sách vai trò, ví dụ `["CUSTOMER"]`. Spring Security đọc thành quyền `ROLE_CUSTOMER` / `ROLE_ADMIN` |

Ví dụ payload:
```json
{
  "iss": "bookstore",
  "sub": "user@example.com",
  "userId": 1,
  "roles": ["CUSTOMER"],
  "iat": 1794206368,
  "exp": 1794292768
}
```

Backend không lưu trạng thái đăng nhập (stateless). Đăng xuất được thực hiện ở frontend bằng cách xóa token.

## CORS

Cho phép frontend chạy ở `http://localhost:5173` (Vite) và `http://localhost:3000`.
