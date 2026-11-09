package vn.edu.nlu.bookstore.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.nlu.bookstore.dto.AuthResponse;
import vn.edu.nlu.bookstore.dto.LoginRequest;
import vn.edu.nlu.bookstore.dto.RegisterRequest;
import vn.edu.nlu.bookstore.dto.UserResponse;
import vn.edu.nlu.bookstore.entity.User;
import vn.edu.nlu.bookstore.exception.ApiException;
import vn.edu.nlu.bookstore.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	@Transactional
	public AuthResponse register(RegisterRequest request) {
		String email = request.email().trim().toLowerCase();
		if (userRepository.existsByEmail(email)) {
			throw new ApiException(HttpStatus.CONFLICT, "Email đã được sử dụng");
		}

		User user = new User();
		user.setFullName(request.fullName().trim());
		user.setEmail(email);
		user.setPasswordHash(passwordEncoder.encode(request.password()));
		user.setPhone(request.phone());
		userRepository.save(user);

		return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
	}

	@Transactional(readOnly = true)
	public AuthResponse login(LoginRequest request) {
		String email = request.email().trim().toLowerCase();
		User user = userRepository.findByEmail(email)
				.filter(u -> passwordEncoder.matches(request.password(), u.getPasswordHash()))
				.orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng"));

		if (!user.getActive()) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Tài khoản đã bị khóa");
		}

		return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
	}

	@Transactional(readOnly = true)
	public UserResponse getCurrentUser(String email) {
		return userRepository.findByEmail(email)
				.map(UserResponse::from)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy người dùng"));
	}
}
