package com.tojaeung.blog.auth.dto;

import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
public class LoginDto {
    @NotBlank(message = "회원ID를 입력해주세요.")
    @Min(value = 3, message = "최소 3글자이상 입니다.")
    @Max(value = 10, message = "최대 10글자이하 입니다.")
    private String username;

    @NotBlank(message = "회원 비밀번호를 입력해주세요.")
    @Min(value = 3, message = "최소 3글자이상 입니다.")
    @Max(value = 10, message = "최대 10글자이하 입니다.")
    private String password;
}
