package com.tojaeung.blog.category.dto;

import lombok.Getter;

@Getter
public class PostCntResDto {
	private Long id;
	private String name;
	private int postCnt;

	public PostCntResDto(Long id, String name, int postCnt) {
		this.id = id;
		this.name = name;
		this.postCnt = postCnt;
	}
}
