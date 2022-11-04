package com.tojaeung.blog.comment.controller;

import com.tojaeung.blog.comment.dto.CreateDto;
import com.tojaeung.blog.comment.dto.FindAllInPost;
import com.tojaeung.blog.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    // 댓글 새로 생성
    @PostMapping(value = {"api/post/{postId}/comment", "api/post/{postId}/comment/{parentId}"})
    public ResponseEntity<CreateDto.Res> create(
            @PathVariable(value = "postId") Long postId,
            @PathVariable(value = "parentId", required = false) Long parentId,
            @Valid @RequestBody CreateDto.Req createReqDto) {

        CreateDto.Res newComment = commentService.create(postId, parentId, createReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
    }

    // 댓글 새로 생성
    @GetMapping("api/post/{postId}/comment")
    public ResponseEntity<List<FindAllInPost.Res>> findAllInPost(@PathVariable Long postId) {

        return ResponseEntity.ok(commentService.findAllInPost(postId));
    }

    // 댓글 삭제
    @DeleteMapping("admin/comment/{commentId}")
    public ResponseEntity<Long> delete(@PathVariable Long commentId) {
        commentService.delete(commentId);

        return ResponseEntity.ok(commentId);
    }
}
