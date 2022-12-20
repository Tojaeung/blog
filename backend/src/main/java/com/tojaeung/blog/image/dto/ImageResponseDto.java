package com.tojaeung.blog.image.dto;

import lombok.Getter;

@Getter
public class ImageResponseDto {
	private Long imageId;
	private String imageUrl;

	public ImageResponseDto(Long imageId, String imageUrl) {
		this.imageId = imageId;
		this.imageUrl = imageUrl;
	}
}
