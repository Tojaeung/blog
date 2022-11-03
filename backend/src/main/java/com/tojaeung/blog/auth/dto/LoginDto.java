package com.tojaeung.blog.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class LoginDto {
    @NotBlank(message = "회원ID를 입력해주세요.")
    @Size(max = 10, message = "최대 10글자 입니다.")
    private String username;

    @NotBlank(message = "회원 비밀번호를 입력해주세요.")
    @Size(max = 10, message = "최대 10글자 입니다.")
    private String password;
}
