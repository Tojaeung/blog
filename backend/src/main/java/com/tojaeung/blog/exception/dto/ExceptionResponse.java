package com.tojaeung.blog.exception.dto;

import com.tojaeung.blog.exception.ExceptionCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ExceptionResponse {

    private int exceptionCode;
    private String message;
    private int statusCode;

    public ExceptionResponse(ExceptionCode exceptionCode) {
        this.exceptionCode = exceptionCode.getExceptionCode();
        this.message = exceptionCode.getMessage();
        this.statusCode = exceptionCode.getStatusCode();
    }
}
