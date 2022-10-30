package com.tojaeung.blog.exception.dto;

import com.tojaeung.blog.exception.ExceptionCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.MethodArgumentNotValidException;

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

    // 유효성 검증 validation
    public ExceptionResponse(MethodArgumentNotValidException e) {
        this.exceptionCode = 2000;
        this.message = e.getFieldErrors().get(0).getDefaultMessage();
        this.statusCode = 400;
    }
}
