package com.tojaeung.blog.post.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdateReqDto {
	@NotBlank(message = "포스팅 제목을 입력해주세요.")
	private String updatedTitle;
	@NotBlank(message = "포스팅 내용을 입력해주세요.")
	private String updatedContent;
}
