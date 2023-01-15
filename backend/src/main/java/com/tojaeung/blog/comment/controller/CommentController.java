package com.tojaeung.blog.comment.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tojaeung.blog.comment.dto.CommentResDto;
import com.tojaeung.blog.comment.dto.CreateReqDto;
import com.tojaeung.blog.comment.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;

	// 댓글 새로 생성
	@PostMapping(value = { "api/post/{postId}/comment" })
	public ResponseEntity<CommentResDto> create(
			@PathVariable(value = "postId") Long postId,
			@Valid @RequestBody CreateReqDto createReqDto) {
		CommentResDto newComment = commentService.create(postId, createReqDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
	}

	// 자식댓글 새로 생성
	@PostMapping(value = { "api/post/{postId}/comment/{parentId}" })
	public ResponseEntity<CommentResDto> createChild(
			@PathVariable(value = "postId") Long postId,
			@PathVariable(value = "parentId", required = false) Long parentId,
			@Valid @RequestBody CreateReqDto createReqDto) {

		CommentResDto newComment = commentService.createChild(postId, parentId, createReqDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
	}

	// 댓글 가져오기
	@GetMapping("api/post/{postId}/comment")
	public ResponseEntity<List<CommentResDto>> findCommentsInPost(@PathVariable Long postId) {

		return ResponseEntity.ok(commentService.findCommentsInPost(postId));
	}

	// 최근 댓글 가져오기
	@GetMapping("api/comment/recent")
	public ResponseEntity<List<CommentResDto>> findRecentComments() {

		return ResponseEntity.ok(commentService.findRecentComments());
	}

	// 댓글 삭제
	@DeleteMapping("api/admin/comment/{commentId}")
	public ResponseEntity<Long> delete(@PathVariable Long commentId) {
		commentService.delete(commentId);

		return ResponseEntity.ok(commentId);
	}
}
