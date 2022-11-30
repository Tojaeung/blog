package com.tojaeung.blog.auth.service;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.dto.RefreshResponseDto;
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

    public LoginResponseDto login(Admin admin) {
        // 아이디가 존재 하는지
        Admin findAdmin = authRepository.findByUsername(admin.getUsername())
                .orElseThrow(() -> new CustomException(ExceptionCode.INVALID_ADMIN_USERNAME));

        // 비밀번호가 맞는지
        if (findAdmin.checkPassword(admin.getPassword(), passwordEncoder)) {
            return LoginResponseDto.builder()
                    .accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
                    .username(findAdmin.getUsername())
                    .build();
        } else throw new CustomException(ExceptionCode.INVALID_ADMIN_PASSWORD);
    }

    public RefreshResponseDto refresh(String refreshToken) {
        System.out.println(jwtTokenProvider.validateToken(refreshToken));

        if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
            String username = jwtTokenProvider.getUsername(refreshToken);

            Admin findAdmin = authRepository.findByUsername(username)
                    .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_ADMIN));

            // 엑세스토큰 유저정보 응답
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
                    .username(findAdmin.getUsername())
                    .build();

            return refreshResponseDto;
        } else {
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .accessToken("")
                    .username("")
                    .build();
            return refreshResponseDto;
        }
    }
}
