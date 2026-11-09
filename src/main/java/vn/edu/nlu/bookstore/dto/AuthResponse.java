package vn.edu.nlu.bookstore.dto;

public record AuthResponse(
		String accessToken,
		UserResponse user
) {
}
