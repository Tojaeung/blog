package com.tojaeung.blog.image.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tojaeung.blog.image.dto.ImageResponseDto;
import com.tojaeung.blog.image.service.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageController {
	private final ImageService imageService;

	// 포스팅 내 이미지 업로드
	@PostMapping("api/admin/post/upload")
	public ResponseEntity<ImageResponseDto> uploadImage(@RequestParam("file") MultipartFile multipartFile) {
		return ResponseEntity.status(HttpStatus.CREATED).body(imageService.uploadImage(multipartFile));
	}

	// 썸네일 변경
	@PutMapping("api/admin/post/{postId}/thumbnail")
	public ResponseEntity<?> updateThumbnail(
			@PathVariable Long postId,
			@RequestParam("updatedThumbnail") MultipartFile multipartFile) {

		imageService.updateThumbnail(postId, multipartFile);
		return ResponseEntity.ok().build();
	}

}
