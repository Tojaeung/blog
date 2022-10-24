package com.tojaeung.blog.auth.service;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.AuthRepository;
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
                .orElseThrow(() -> new IllegalArgumentException("관리자 계정ID가 아닙니다."));

        // 비밀번호가 맞는지
        if (findAdmin.checkPassword(admin.getPassword(), passwordEncoder)) {
            return LoginResponseDto.builder()
                    .accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
                    .username(findAdmin.getUsername())
                    .build();
        } else throw new IllegalArgumentException("관리자 계정 비밀번호가 아닙니다.");
    }
}
