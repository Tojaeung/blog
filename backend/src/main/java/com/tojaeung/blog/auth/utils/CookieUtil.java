package com.tojaeung.blog.auth.utils;

import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {
    // @Value("${cookie-secure}")
    // private boolean cookieSecure;
    @Value("${cookie-samsite}")
    private String cookieSamsite;

    private final JwtTokenProvider jwtTokenProvider;

    public ResponseCookie createRefreshCookie(String username) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtTokenProvider.createRefreshToken(username))
                .httpOnly(true)
                .secure(false)
                // .sameSite(cookieSamsite)
                .maxAge(1000 * 60 * 30)
                .path("/")
                .build();

        return cookie;
    }

    public ResponseCookie removeCookie(String key) {
        ResponseCookie cookie = ResponseCookie.from(key, null)
                .maxAge(-1)
                .build();

        return cookie;
    }

}
