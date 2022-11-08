package com.tojaeung.blog.post.controller;

import com.tojaeung.blog.post.dto.CreateReqDto;
import com.tojaeung.blog.post.dto.PaginationDto;
import com.tojaeung.blog.post.dto.ResponseDto;
import com.tojaeung.blog.post.dto.UpdateDto;
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
    @PostMapping("admin/category/{categoryId}/post")
    public ResponseEntity<ResponseDto> create(
            @PathVariable Long categoryId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("thumbnail") MultipartFile multipartFile) {

        CreateReqDto createReqDto = new CreateReqDto(title, content, multipartFile);

        ResponseDto newPost = postService.create(categoryId, createReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }

    // 모든 블로그 가져오기 (페이지네이션)
    @GetMapping("api/post")
    public ResponseEntity<PaginationDto> findAll(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(postService.findAll(pageable));
    }

    // 카테고리에 해당하는 포스팅들 가져오기
    @GetMapping("api/category/{categoryId}/post")
    public ResponseEntity<PaginationDto> findAllInCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(postService.findAllInCategory(categoryId, pageable));
    }

    // 조회수가 많은 top5 가져오기
    @GetMapping("api/post/top5")
    public ResponseEntity<List<ResponseDto>> findTop5() {
        return ResponseEntity.ok(postService.findTop5());
    }

    // 특정 포스팅 가져오기
    @GetMapping("api/post/{postId}")
    public ResponseEntity<ResponseDto> findOneWithCategory(@PathVariable Long postId) {
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
