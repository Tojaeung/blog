package com.tojaeung.blog.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {
    INVALID_ADMIN_USERNAME(1001, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),
    INVALID_ADMIN_PASSWORD(1002, "관리자 계정 또는 비밀번호가 올바르지 않습니다.", 400),

    // VALIDATION_EXCEPTION(2000, "", 400), 라이브러리 validation에 의한 예외코드를 2000으로 통일하였다.. 

    ALREADY_EXISTING_TAG(3001, "이미 존재하는 태그 입니다.", 400),

    NOT_FOUND_ADMIN(4000, "Admin을 찾을 수 없습니다.", 404),
    NOT_FOUND_CATEGORY(4001, "존재하지 않는 카테고리 입니다.", 404),
    NOT_FOUND_POST(4002, "존재하지 않는 포스팅 입니다.", 404),
    NOT_FOUND_PARENT_COMMENT(4003, "부모 댓글이 존재하지 않습니다.", 404),
    NOT_FOUND_COMMENT(4004, "존재하지 않는 댓글입니다.", 404),
    NOT_FOUND_TAG(4005, "존재하지 않는 태그 입니다.", 404),
    NOT_FOUND_GUESTBOOK(4006, "존재하지 않는 방명록 입니다.", 404),

    FAILED_IMAGE_UPLOAD(5001, "이미지 파일 업로드 실패하였습니다.", 500),
    ;
    private final int exceptionCode;
    private final String message;
    private final int statusCode;
}
