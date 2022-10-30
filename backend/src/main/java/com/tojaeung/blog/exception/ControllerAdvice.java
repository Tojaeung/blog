package com.tojaeung.blog.exception;


import com.tojaeung.blog.exception.dto.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class ControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleCustomException(CustomException customException) {
        ExceptionCode exceptionCode = customException.getExceptionCode();
        ExceptionResponse exceptionResponse = new ExceptionResponse(exceptionCode);
        log.info("[예외 발생] 에러 코드 : {}, 메세지 : {}", exceptionCode.getExceptionCode(), exceptionCode.getMessage());
        return ResponseEntity.status(exceptionCode.getStatusCode())
                .body(exceptionResponse);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ExceptionResponse> handleValidException(MethodArgumentNotValidException exception) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(exception);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(exceptionResponse);
    }
}
