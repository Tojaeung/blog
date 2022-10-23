package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.dto.RefreshResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
// @RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    // 로그인
    @PostMapping("/api/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        Admin admin = Admin.builder()
                .username(loginDto.getUsername())
                .password(loginDto.getPassword())
                .build();

        LoginResponseDto loginResponseDto = authService.login(admin);

        Cookie cookie = new Cookie("token", loginResponseDto.getToken());
        cookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
        // cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok(loginResponseDto);
    }


    // 로그인유지를 위한 리프레쉬 로그인
    @GetMapping("/api/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(HttpServletRequest request) {
        // 쿠키의 토큰값을 가져온다.
        String token = jwtTokenProvider.resolveToken(request);
        System.out.println(token);

        // 유효한 토큰이 존재
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            System.out.println(username);
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .token(token)
                    .username(username)
                    .build();

            return ResponseEntity.ok(refreshResponseDto);
        } else {
            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .token("")
                    .username("")
                    .build();
            return ResponseEntity.ok(refreshResponseDto);
        }
    }

    @GetMapping("admin/test")
    public ResponseEntity<RefreshResponseDto> test(HttpServletRequest request) {
        // 쿠키의 토큰값을 가져온다.
        String token = jwtTokenProvider.resolveToken(request);

        // 유효한 토큰이 존재
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);

            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .token(token)
                    .username(username)
                    .build();

            return ResponseEntity.ok(refreshResponseDto);
        } else {

            RefreshResponseDto refreshResponseDto = RefreshResponseDto.builder()
                    .token("")
                    .username("")
                    .build();
            return ResponseEntity.ok(refreshResponseDto);
        }
    }
}
