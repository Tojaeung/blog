package com.tojaeung.blog.post.controller;

import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.CreateReqDto;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.post.dto.UpdateReqDto;
import com.tojaeung.blog.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    // 포스팅 새로 생성
    @PostMapping(value = "admin/category/{categoryId}/post")
    public ResponseEntity<Long> create(
            @PathVariable Long categoryId,
            @Valid @RequestPart("createReqDto") CreateReqDto createReqDto,
            @RequestPart("thumbnail") MultipartFile thumbnail) {

        Post newPost = postService.create(categoryId, createReqDto, thumbnail);

        return ResponseEntity.status(HttpStatus.CREATED).body(newPost.getId());
    }

    // 모든 블로그 가져오기 (페이지네이션)
    @GetMapping("api/post")
    public ResponseEntity<PageResDto> findAllPosts(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(postService.findAllPosts(pageable));
    }

    // 카테고리에 해당하는 포스팅들 가져오기
    @GetMapping("api/category/{categoryId}/post")
    public ResponseEntity<PageResDto> findPostsInCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 10) Pageable pageable) {
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

    // 특정 포스팅 업데이트
    @PutMapping("admin/post/{postId}")
    public ResponseEntity update(
            @PathVariable Long postId,
            @Valid @RequestPart UpdateReqDto updateReqDto,
            @RequestPart MultipartFile updatedThumbnail) {

        postService.update(postId, updateReqDto, updatedThumbnail);

        return ResponseEntity.ok().build();
    }

    // 포스팅 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
    @DeleteMapping("admin/post/{postId}")
    public ResponseEntity<Long> delete(@PathVariable Long postId) {
        postService.delete(postId);

        return ResponseEntity.ok(postId);
    }

}
