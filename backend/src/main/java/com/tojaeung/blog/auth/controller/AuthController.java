package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.dto.RefreshResponseDto;
import com.tojaeung.blog.auth.service.AuthService;
import com.tojaeung.blog.auth.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final CookieUtil cookieUtil;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto loginDto) {
        Admin admin = new Admin(loginDto.getUsername(), loginDto.getPassword());
        LoginResponseDto loginResponseDto = authService.login(admin);

        ResponseCookie refreshToken = cookieUtil.createRefreshCookie(loginResponseDto.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshToken.toString())
                .body(loginResponseDto);
    }

    // 로그인유지를 위한 리프레쉬 로그인
    @GetMapping("/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String token = cookies[0].getName();

        return ResponseEntity.ok(authService.refresh(token));
    }
}
