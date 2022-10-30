package com.tojaeung.blog.comment.dto;

import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@Getter
public class NewCommentDto {
    @NotBlank(message = "작성자를 입력해주세요.")
    @Max(value = 10, message = "작성자 이름은 최대 10글자 입니다.")
    private String author;
    @NotBlank(message = "댓글을 입력해주세요.")
    @Max(value = 1000, message = "댓글은 최대 1000글자 입니다.")
    private String desc;

    private Long parentId;

}
