package com.tojaeung.blog.post.controller;

import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.PostDto;
import com.tojaeung.blog.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    // 포스팅 새로 생성
    @PostMapping("admin/category/{name}/post")
    public ResponseEntity<Post> create(@PathVariable String name, @RequestBody PostDto postDto) {
        Post post = postService.create(name, postDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    // 특정 포스팅 가져오기
    @GetMapping("api/post/{id}")
    public ResponseEntity<Post> findOneWithPosts(@PathVariable Long id) {
        return ResponseEntity.ok(postService.findOneWithCategory(id));
    }

    // 포스팅 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
    @DeleteMapping("admin/post/{id}")
    public ResponseEntity delte(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
