package com.tojaeung.blog.tag.dto;

import lombok.Getter;

import java.util.UUID;

@Getter
public class AllTagResDto {
	private UUID id;
	private String tagName;

	public AllTagResDto(UUID id, String tagName) {
		this.id = id;
		this.tagName = tagName;
	}
}
