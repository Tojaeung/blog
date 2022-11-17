package com.tojaeung.blog.guestbook.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateReqDto {

    @NotBlank(message = "작성자를 입력해주세요.")
    @Size(max = 10, message = "최대 10글자 입니다.")
    private String author;
    @NotBlank(message = "댓글을 입력해주세요.")
    @Size(max = 255, message = "최대 255자 입니다.")
    private String content;
    @NotNull(message = "관리자 인증여부를 확인해주세요.")
    private Boolean isAdmin;
}
