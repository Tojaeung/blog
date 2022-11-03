package com.tojaeung.blog.post.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class NewPostDto {
    @NotBlank(message = "포스팅 제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "포스팅 제목을 입력해주세요.")
    private String content;

    private String thumbnail;
}
