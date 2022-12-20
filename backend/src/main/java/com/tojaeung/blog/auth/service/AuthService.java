package com.tojaeung.blog.auth.service;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.AuthResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.AuthRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final AuthRepository authRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	public AuthResponseDto login(Admin admin) {
		// 아이디가 존재 하는지
		Admin findAdmin = authRepository.findByUsername(admin.getUsername())
				.orElseThrow(() -> new CustomException(ExceptionCode.INVALID_ADMIN_USERNAME));

		// 비밀번호가 맞는지
		if (findAdmin.checkPassword(admin.getPassword(), passwordEncoder)) {
			return AuthResponseDto.builder()
					.accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
					.username(findAdmin.getUsername())
					.build();
		} else
			throw new CustomException(ExceptionCode.INVALID_ADMIN_PASSWORD);
	}

	public AuthResponseDto persist(String refreshToken) {
		String username;

		if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
			username = jwtTokenProvider.getUsername(refreshToken);
		} else {
			throw new CustomException(ExceptionCode.INVALID_REFRESH_TOKEN);
		}

		Admin findAdmin = authRepository.findByUsername(username)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_ADMIN));

		// 엑세스토큰 유저정보 응답
		AuthResponseDto authResponseDto = AuthResponseDto.builder()
				.accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
				.username(findAdmin.getUsername())
				.build();

		return authResponseDto;

	}

	public AuthResponseDto reissue(String refreshToken) {
		String username;

		if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
			username = jwtTokenProvider.getUsername(refreshToken);
		} else {
			throw new CustomException(ExceptionCode.INVALID_REFRESH_TOKEN);
		}

		Admin findAdmin = authRepository.findByUsername(username)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_ADMIN));

		// 엑세스토큰 유저정보 응답
		AuthResponseDto refreshResponseDto = AuthResponseDto.builder()
				.accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
				.username(findAdmin.getUsername())
				.build();

		return refreshResponseDto;

	}
}
