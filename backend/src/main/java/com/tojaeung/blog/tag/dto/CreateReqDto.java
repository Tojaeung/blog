package com.tojaeung.blog.tag.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateReqDto {
	@NotBlank(message = "작성자를 입력해주세요.")
	private String name;
}
