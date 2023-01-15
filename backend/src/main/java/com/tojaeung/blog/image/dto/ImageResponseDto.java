package com.tojaeung.blog.image.dto;

import com.tojaeung.blog.image.domain.Image;

import lombok.Getter;

@Getter
public class ImageResponseDto {
	private Long imageId;
	private String imageUrl;

	public ImageResponseDto(Image newImage) {
		this.imageId = newImage.getId();
		this.imageUrl = newImage.getSavedPath();
	}
}
