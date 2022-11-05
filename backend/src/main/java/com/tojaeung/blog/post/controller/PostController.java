package com.tojaeung.blog.post.controller;

import com.tojaeung.blog.post.dto.CreateDto;
import com.tojaeung.blog.post.dto.FindAllDto;
import com.tojaeung.blog.post.dto.FindOneDto;
import com.tojaeung.blog.post.dto.UpdateDto;
import com.tojaeung.blog.post.service.PostService;
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
public class PostController {
    private final PostService postService;

    // 포스팅 새로 생성
    @PostMapping("admin/category/{categoryId}/post")
    public ResponseEntity<CreateDto.Res> create(
            @PathVariable Long categoryId,
            @Valid @RequestBody CreateDto.Req createReqDto) {

        CreateDto.Res newPost = postService.create(categoryId, createReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }

    // 카테고리에 해당하는 포스팅들 가져오기
    @GetMapping("api/category/{categoryId}/post")
    public ResponseEntity<List<FindAllDto.Res>> findAllInCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(postService.findAllInCategory(categoryId));
    }

    // 특정 포스팅 가져오기
    @GetMapping("api/post/{postId}")
    public ResponseEntity<FindOneDto.Res> findOneWithCategory(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.findOneWithCategory(postId));
    }

    // 특정 포스팅 업데이트
    @PutMapping("admin/post/{postId}")
    public ResponseEntity<UpdateDto.Res> update(
            @PathVariable Long postId,
            @Valid @RequestBody UpdateDto.Req updateReqDto) {

        UpdateDto.Res updatedPost = postService.update(postId, updateReqDto);

        return ResponseEntity.ok(updatedPost);
    }

    // 포스팅 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
    @DeleteMapping("admin/post/{postId}")
    public ResponseEntity<Long> delete(@PathVariable Long postId) {
        postService.delete(postId);

        return ResponseEntity.ok(postId);
    }

}
