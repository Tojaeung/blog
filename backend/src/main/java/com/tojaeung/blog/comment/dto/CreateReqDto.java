package com.tojaeung.blog.comment.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
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

    public CreateReqDto(String author, String content) {
        this.author = author;
        this.content = content;
    }
}
