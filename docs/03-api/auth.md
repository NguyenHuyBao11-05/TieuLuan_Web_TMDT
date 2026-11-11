# API Xác thực

| Phương thức | Endpoint | Yêu cầu đăng nhập | Mô tả |
|---|---|---|---|
| POST | `/api/auth/register` | Không | Đăng ký tài khoản |
| POST | `/api/auth/login` | Không | Đăng nhập |
| GET | `/api/auth/me` | Có | Lấy thông tin người dùng hiện tại |

---

## POST /api/auth/register

Tạo tài khoản khách hàng mới (`role = CUSTOMER`) và trả về token, người dùng không cần đăng nhập lại.

**Request body**

| Trường | Kiểu | Bắt buộc | Ràng buộc |
|---|---|---|---|
| fullName | string | Có | Tối đa 150 ký tự |
| email | string | Có | Đúng định dạng email, tối đa 150 ký tự. Không phân biệt hoa thường |
| password | string | Có | 6 đến 100 ký tự |
| phone | string | Không | Tối đa 20 ký tự |

```json
{
  "fullName": "Nguyễn Văn A",
  "email": "vana@example.com",
  "password": "123456",
  "phone": "0900000000"
}
```

**Response `201 Created`**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "vana@example.com",
    "phone": "0900000000",
    "role": "CUSTOMER"
  }
}
```

**Lỗi**

| Mã | Trường hợp |
|---|---|
| 400 | Thiếu trường hoặc sai định dạng |
| 409 | `Email đã được sử dụng` |

---

## POST /api/auth/login

**Request body**
```json
{
  "email": "vana@example.com",
  "password": "123456"
}
```

**Response `200 OK`**: giống response của đăng ký.

**Lỗi**

| Mã | Trường hợp |
|---|---|
| 400 | Thiếu email hoặc mật khẩu |
| 401 | `Email hoặc mật khẩu không đúng`. Dùng chung một thông báo cho cả hai trường hợp sai email và sai mật khẩu, để không lộ email nào đã đăng ký |
| 403 | `Tài khoản đã bị khóa` (`is_active = FALSE`) |

---

## GET /api/auth/me

**Header**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Response `200 OK`**
```json
{
  "id": 1,
  "fullName": "Nguyễn Văn A",
  "email": "vana@example.com",
  "phone": "0900000000",
  "role": "CUSTOMER"
}
```

**Lỗi**

| Mã | Trường hợp |
|---|---|
| 401 | Không gửi token, token sai chữ ký hoặc đã hết hạn |

---

## Kết quả kiểm thử (09/11/2026)

| # | Kịch bản | Kết quả mong đợi | Kết quả |
|---|---|---|---|
| 1 | Đăng ký với dữ liệu hợp lệ | 201, trả token | Đạt |
| 2 | Đăng ký trùng email (khác hoa thường) | 409 | Đạt |
| 3 | Đăng ký với tên rỗng, email sai, mật khẩu 2 ký tự | 400, báo lỗi từng trường | Đạt |
| 4 | Đăng nhập sai mật khẩu | 401 | Đạt |
| 5 | Đăng nhập đúng | 200, trả token | Đạt |
| 6 | `/me` với token hợp lệ | 200, trả thông tin | Đạt |
| 7 | `/me` không có token | 401 | Đạt |
| 8 | `/me` với token giả | 401 | Đạt |
