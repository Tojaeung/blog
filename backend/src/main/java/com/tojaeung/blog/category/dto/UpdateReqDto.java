package com.tojaeung.blog.category.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UpdateReqDto {

	@NotBlank(message = "변경할 카테고리 이름을 입력해주세요.")
	private String updatedName;
}
