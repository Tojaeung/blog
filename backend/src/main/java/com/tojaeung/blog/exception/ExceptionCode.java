package com.tojaeung.blog.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {
    INVALID_ADMIN_USERNAME(1001, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),
    INVALID_ADMIN_PASSWORD(1002, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),
    INVALID_RT_COOKIE(1003, "요청 쿠키에 유효하지 않는 RT로 리프레쉬 로그인을 수행할 수 없습니다.", 400),

    ;
    private final int exceptionCode;
    private final String message;
    private final int statusCode;
}
