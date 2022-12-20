package com.tojaeung.blog.tag.dto;

import com.tojaeung.blog.tag.domain.Tag;
import lombok.Getter;

@Getter
public class TagResDto {
	private Long id;
	private String tagName;

	public TagResDto(Tag tag) {
		this.id = tag.getId();
		this.tagName = tag.getName();
	}
}
