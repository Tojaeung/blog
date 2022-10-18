package com.tojaeung.blog.auth.controller;

import com.tojaeung.blog.auth.domain.User;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.UserReposiroty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserReposiroty userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/join")
    public String join(User user) {
        log.info("로그인 시도됨");

        user.hashPassword(passwordEncoder);
        userRepository.save(user);


        return user.toString();

    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        log.info("user email = {}", user.getUsername());

        // 이메일이 존재 하는지
        User findUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("관리자 계정이 아닙니다."));

        // 비밀번호가 맞는지
        if (findUser.checkPassword(user.getPassword(), passwordEncoder)) {
            jwtTokenProvider.createToken(findUser.getUsername());
            return "로그인 되었습니다.";
        } else {
            throw new IllegalArgumentException("관리자 계정이 아닙니다.");
        }
    }
}
