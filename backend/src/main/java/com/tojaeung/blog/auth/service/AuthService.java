package com.tojaeung.blog.auth.service;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    @Value("${token-valid-token}")
    private long tokenValidTime;

    public LoginResponseDto login(Admin admin) {
        // 아이디가 존재 하는지
        Admin findAdmin = adminRepository.findByUsername(admin.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("관리자 계정ID가 아닙니다."));

        // 비밀번호가 맞는지
        if (findAdmin.checkPassword(admin.getPassword(), passwordEncoder)) {
            Date now = new Date();
            return LoginResponseDto.builder()
                    .token(jwtTokenProvider.createToken(findAdmin.getUsername(), findAdmin.getRoles()))
                    .username(findAdmin.getUsername())
                    .build();
        } else throw new IllegalArgumentException("관리자 계정 비밀번호가 아닙니다.");
    }
}
