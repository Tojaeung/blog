package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.LoginDto;
import com.tojaeung.blog.auth.dto.LoginResponseDto;
import com.tojaeung.blog.auth.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        Admin admin = Admin.builder()
                .username(loginDto.getUsername())
                .password(loginDto.getPassword())
                .build();

        return ResponseEntity.ok(adminService.login(admin));
    }

    @GetMapping("/test")
    public String test() {
        return "성공";
    }
}
