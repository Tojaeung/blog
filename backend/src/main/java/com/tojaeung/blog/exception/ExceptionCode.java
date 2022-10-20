package com.tojaeung.blog.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {
    // 1000번대 인증 관련 예외
    
    ;

    private final int exceptionCode;
    private final String message;
    private final int statusCode;
}
