package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.dto.RefreshResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.AuthRepository;
import com.tojaeung.blog.auth.service.AuthService;
import com.tojaeung.blog.auth.utils.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CookieUtil cookieUtil;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        Admin admin = Admin.builder()
                .username(loginDto.getUsername())
                .password(loginDto.getPassword())
                .build();

        LoginResponseDto loginResponseDto = authService.login(admin);

        ResponseCookie refreshToken = cookieUtil.createRefreshCookie(loginResponseDto.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshToken.toString())
                .body(loginResponseDto);
    }

    // 로그인유지를 위한 리프레쉬 로그인
    @GetMapping("/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String token = cookies[0].getName();

        // 유효한 토큰이 존재
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);

            Admin findAdmin = authRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("관리자 계정ID가 아닙니다."));

            // 엑세스토큰 유저정보 응답
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .accessToken(jwtTokenProvider.createAccessToken(findAdmin.getUsername(), findAdmin.getRoles()))
                    .username(findAdmin.getUsername())
                    .build();

            ResponseCookie removeCookie = cookieUtil.removeCookie("refreshToken");
            // response.setHeader("Set-Cookie", removeCookie.toString());

            ResponseCookie refreshToken = cookieUtil.createRefreshCookie(username);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, removeCookie.toString())
                    .body(refreshResponseDto);
        } else {
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .accessToken("")
                    .username("")
                    .build();
            return ResponseEntity.ok(refreshResponseDto);
        }
    }
}
