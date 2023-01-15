package com.tojaeung.blog.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tojaeung.blog.comment.domain.Comment;
import com.tojaeung.blog.comment.dto.CommentResDto;
import com.tojaeung.blog.comment.dto.CreateReqDto;
import com.tojaeung.blog.comment.repository.CommentRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final PostRepository postRepository;

	// 댓글 생성
	@Transactional
	public CommentResDto create(Long postId, CreateReqDto createReqDto) {
		// 포스트가 존재 하는지
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

		Comment comment = Comment.builder()
				.author(createReqDto.getAuthor())
				.content(createReqDto.getContent())
				.isAdmin(createReqDto.getIsAdmin())
				.post(post)
				.parent(null)
				.build();

		Comment newComment = commentRepository.save(comment);

		return new CommentResDto(newComment);
	}

	// 자식 댓글 생성
	@Transactional
	public CommentResDto createChild(Long postId, Long parentId, CreateReqDto createReqDto) {
		// 포스트가 존재 하는지
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

		Comment parentComment = commentRepository.findById(parentId)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_PARENT_COMMENT));

		Comment comment = Comment.builder()
				.author(createReqDto.getAuthor())
				.content(createReqDto.getContent())
				.isAdmin(createReqDto.getIsAdmin())
				.post(post)
				.parent(parentComment)
				.build();

		Comment newComment = commentRepository.save(comment);

		return new CommentResDto(newComment);
	}

	// 포스팅의 댓글들 조회하기
	@Transactional(readOnly = true)
	public List<CommentResDto> findCommentsInPost(Long postId) {
		if (!postRepository.existsById(postId))
			throw new CustomException(ExceptionCode.NOT_FOUND_POST);
		else {
			List<Comment> comments = commentRepository.findCommentsInPost(postId);

			List<CommentResDto> allCommentsInPost = comments.stream()
					.map(comment -> new CommentResDto(comment))
					.collect(Collectors.toList());

			return allCommentsInPost;
		}

	}

	// 최근 댓글 가져오기
	@Transactional(readOnly = true)
	public List<CommentResDto> findRecentComments() {
		List<Comment> comments = commentRepository.findTop6ByOrderByCreatedAtDesc();
		List<CommentResDto> recentComments = comments.stream()
				.map(comment -> new CommentResDto(comment))
				.collect(Collectors.toList());
		return recentComments;

	}

	@Transactional
	public void delete(Long commentId) {
		if (!commentRepository.existsById(commentId)) {
			throw new CustomException(ExceptionCode.NOT_FOUND_COMMENT);
		}

		commentRepository.deleteById(commentId);
	}
}
