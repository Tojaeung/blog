package com.tojaeung.blog.auth.util;

import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {
    private final JwtTokenProvider jwtTokenProvider;

    public ResponseCookie createRefreshCookie(String username) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtTokenProvider.createRefreshToken(username))
                .secure(true)
                .httpOnly(true)
                .sameSite("Lax")
                .maxAge(14 * 24 * 60 * 60)
                .path("/")
                .build();

        return cookie;
    }

}
