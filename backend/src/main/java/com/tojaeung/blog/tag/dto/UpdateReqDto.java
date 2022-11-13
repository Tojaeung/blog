package com.tojaeung.blog.tag.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UpdateReqDto {
    @NotBlank(message = "변경할 태그를 입력해주세요.")
    private String updatedTagName;
}
