package vn.edu.nlu.bookstore.dto;

import vn.edu.nlu.bookstore.entity.Role;
import vn.edu.nlu.bookstore.entity.User;

public record UserResponse(
		Long id,
		String fullName,
		String email,
		String phone,
		Role role
) {
	public static UserResponse from(User user) {
		return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhone(), user.getRole());
	}
}
