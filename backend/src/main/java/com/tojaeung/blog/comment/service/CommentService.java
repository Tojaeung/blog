package com.tojaeung.blog.comment.service;

import com.tojaeung.blog.comment.domain.Comment;
import com.tojaeung.blog.comment.dto.NewCommentDto;
import com.tojaeung.blog.comment.repository.CommentRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 댓글 생성
    public Comment create(Long postId, NewCommentDto newCommentDto) {
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        Optional<Comment> parentComment = commentRepository.findById(newCommentDto.getParentId());

        if (parentComment.isPresent()) {
            Comment newComment = Comment.builder()
                    .author(newCommentDto.getAuthor())
                    .content(newCommentDto.getContent())
                    .post(findPost)
                    .parent(parentComment.get())
                    .build();
            return commentRepository.save(newComment);
        } else {
            Comment newComment = Comment.builder()
                    .author(newCommentDto.getAuthor())
                    .content(newCommentDto.getContent())
                    .post(findPost)
                    .parent(null)
                    .build();
            return commentRepository.save(newComment);
        }
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
