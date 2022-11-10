package com.tojaeung.blog.auth.util;

import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {
    @Value("${cookie-samsite}")
    private String cookieSamsite;

    private final JwtTokenProvider jwtTokenProvider;

    public ResponseCookie createRefreshCookie(String username) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtTokenProvider.createRefreshToken(username))
                .httpOnly(true)
                .secure(true)
                .sameSite(cookieSamsite)
                .maxAge(1000 * 60 * 30)
                .path("/")
                .build();

        return cookie;
    }

}
