package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
// @RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final AdminService adminService;

    // 로그인
    @PostMapping("/api/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        Admin admin = Admin.builder()
                .username(loginDto.getUsername())
                .password(loginDto.getPassword())
                .build();

        LoginResponseDto loginResponseDto = adminService.login(admin);

        Cookie cookie = new Cookie("token", loginResponseDto.getToken());
        cookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok(loginResponseDto);
    }

    @GetMapping("/admin/test")
    public String test() {
        log.info("응답성공");
        return "성공";
    }
}
