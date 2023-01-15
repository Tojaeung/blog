package com.tojaeung.blog.post.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.CreateReqDto;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.post.dto.UpdateReqDto;
import com.tojaeung.blog.post.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PostController {
	private final PostService postService;

	// 포스팅 새로 생성
	@PostMapping(value = "api/admin/category/{categoryId}/post")
	public ResponseEntity<Long> create(
			@PathVariable Long categoryId,
			@Valid @RequestPart("createReqDto") CreateReqDto createReqDto,
			@RequestPart("thumbnail") MultipartFile thumbnail) {

		Post newPost = postService.create(categoryId, createReqDto, thumbnail);
		System.out.println(createReqDto.getContent());
		return ResponseEntity.status(HttpStatus.CREATED).body(newPost.getId());
	}

	// 모든 블로그 가져오기 (페이지네이션)
	@GetMapping("api/post")
	public ResponseEntity<PageResDto> findAllPosts(@PageableDefault(size = 9) Pageable pageable) {
		return ResponseEntity.ok(postService.findAllPosts(pageable));
	}

	// 카테고리에 해당하는 포스팅들 가져오기
	@GetMapping("api/category/{categoryId}/post")
	public ResponseEntity<PageResDto> findPostsInCategory(
			@PathVariable Long categoryId,
			@PageableDefault(size = 9) Pageable pageable) {
		return ResponseEntity.ok(postService.findPostsInCategory(categoryId, pageable));
	}

	// 조회수가 많은 top5 가져오기
	@GetMapping("api/post/top5")
	public ResponseEntity<List<PostResDto>> findTop5() {
		return ResponseEntity.ok(postService.findTop5());
	}

	// 특정 포스팅 가져오기 (댓글 + 태그 + 카테고리)
	@GetMapping("api/post/{postId}")
	public ResponseEntity<PostResDto> findPost(@PathVariable Long postId) {
		return ResponseEntity.ok(postService.findPost(postId));
	}

	// 포스팅 검색 (포스팅, 태그)
	@GetMapping("api/post/search")
	public ResponseEntity<PageResDto> searchPosts(
			@RequestParam("keyword") String keyword,
			@PageableDefault(size = 9) Pageable pageable) {

		return ResponseEntity.ok(postService.searchPosts(keyword, pageable));
	}

	// 특정 포스팅 업데이트
	@PutMapping("api/admin/post/{postId}")
	public ResponseEntity<?> update(
			@PathVariable Long postId,
			@Valid @RequestBody UpdateReqDto updateReqDto) {

		postService.update(postId, updateReqDto);

		return ResponseEntity.ok().build();
	}

	// 포스팅 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
	@DeleteMapping("api/admin/post/{postId}")
	public ResponseEntity<Long> delete(@PathVariable Long postId) {
		postService.delete(postId);

		return ResponseEntity.ok(postId);
	}

}
