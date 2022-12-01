package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.AuthResponseDto;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.service.AuthService;
import com.tojaeung.blog.auth.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final CookieUtil cookieUtil;

    // 로그인
    @PostMapping("api/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginDto loginDto) {
        Admin admin = new Admin(loginDto.getUsername(), loginDto.getPassword());
        AuthResponseDto authResponseDto = authService.login(admin);

        ResponseCookie cookie = cookieUtil.createRefreshCookie(authResponseDto.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponseDto);
    }

    // 로그인유지 (AT,RT 재발급)
    @GetMapping("api/persist")
    public ResponseEntity<AuthResponseDto> persist(
            @CookieValue(value = "refreshToken", defaultValue = "") String refreshToken) {
        AuthResponseDto authResponseDto = authService.persist(refreshToken);

        ResponseCookie cookie = cookieUtil.createRefreshCookie(authResponseDto.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponseDto);
    }

    // 엑세스토큰 재발급
    @GetMapping("api/reissue")
    public ResponseEntity<AuthResponseDto> reissue(
            @CookieValue(value = "refreshToken", defaultValue = "") String refreshToken) {
        return ResponseEntity.ok(authService.reissue(refreshToken));
    }
}
