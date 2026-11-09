package vn.edu.nlu.bookstore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
		@NotBlank(message = "Họ tên không được để trống")
		@Size(max = 150, message = "Họ tên tối đa 150 ký tự")
		String fullName,

		@NotBlank(message = "Email không được để trống")
		@Email(message = "Email không hợp lệ")
		@Size(max = 150, message = "Email tối đa 150 ký tự")
		String email,

		@NotBlank(message = "Mật khẩu không được để trống")
		@Size(min = 6, max = 100, message = "Mật khẩu phải từ 6 đến 100 ký tự")
		String password,

		@Size(max = 20, message = "Số điện thoại tối đa 20 ký tự")
		String phone
) {
}
