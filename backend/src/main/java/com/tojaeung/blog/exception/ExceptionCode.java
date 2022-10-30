package com.tojaeung.blog.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {
    INVALID_ADMIN_USERNAME(1001, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),
    INVALID_ADMIN_PASSWORD(1002, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),
    INVALID_RT_COOKIE(1003, "요청 쿠키에 유효하지 않는 RT로 리프레쉬 로그인을 수행할 수 없습니다.", 400),

    NOT_FOUND_CATEGORY(4001, "존재하지 않는 카테고리 입니다.", 404),
    NOT_FOUND_POST(4002, "존재하지 않는 포스팅 입니다.", 404),
    NOT_FOUND_PARENT_COMMENT(4003, "부모 댓글이 존재하지 않습니다.", 404),
    ;
    private final int exceptionCode;
    private final String message;
    private final int statusCode;
}
