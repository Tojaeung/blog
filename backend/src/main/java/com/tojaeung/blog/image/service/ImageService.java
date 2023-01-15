package com.tojaeung.blog.image.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.image.domain.Image;
import com.tojaeung.blog.image.dto.ImageResponseDto;
import com.tojaeung.blog.image.repository.ImageRepository;
import com.tojaeung.blog.image.util.ImageUtil;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

	private final ImageRepository imageRepository;
	private final ImageUtil imageUtil;
	private final PostRepository postRepository;

	@Transactional
	public ImageResponseDto uploadImage(MultipartFile multipartFile) {
		// 파일 aws S3에 저장
		Image image = imageUtil.saveToAwsS3(multipartFile);

		Image newImage = imageRepository.save(image);

		return new ImageResponseDto(newImage);
	}

	@Transactional
	public void updateThumbnail(Long postId, MultipartFile multipartFile) {
		Post findPost = postRepository.findById(postId)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

		// 파일 aws S3에 저장
		Image image = imageUtil.saveToAwsS3(multipartFile);
		findPost.updateThubnail(image);
	}
}
