package com.tojaeung.blog.comment.controller;

import com.tojaeung.blog.comment.domain.Comment;
import com.tojaeung.blog.comment.dto.NewCommentDto;
import com.tojaeung.blog.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    // 댓글 새로 생성
    @PostMapping("api/post/{postId}/comment")
    public ResponseEntity<Comment> create(@PathVariable Long postId, @RequestBody NewCommentDto newCommentDto) {
        Comment newComment = commentService.create(postId, newCommentDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
    }

    // 댓글 삭제
    @DeleteMapping("admin/comment/{commentId}")
    public ResponseEntity delete(@PathVariable Long commentId) {
        commentService.delete(commentId);

        return ResponseEntity.noContent().build();
    }
}
