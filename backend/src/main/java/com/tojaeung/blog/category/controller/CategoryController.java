package com.tojaeung.blog.category.controller;

import com.tojaeung.blog.category.dto.CreateDto;
import com.tojaeung.blog.category.dto.FindAllDto;
import com.tojaeung.blog.category.dto.UpdateDto;
import com.tojaeung.blog.category.service.CategoryService;
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
public class CategoryController {
    private final CategoryService categoryService;

    // 카테고리 새로 생성
    @PostMapping("admin/category")
    public ResponseEntity<CreateDto.Res> create(@Valid @RequestBody CreateDto.Req createReqDto) {
        CreateDto.Res newCategory = categoryService.create(createReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    // 모든 카테고리 가져오기
    @GetMapping("api/category")
    public ResponseEntity<List<FindAllDto.Res>> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    // 특정카테고리 가져오기 (포스팅들과 함께)
    // @GetMapping("api/category/{categoryId}")
    // public ResponseEntity<Category> findOneWithPosts(@PathVariable Long categoryId) {
    //     return ResponseEntity.ok(categoryService.findOneWithPosts(categoryId));
    // }

    // 카테고리 수정
    @PutMapping("admin/category/{categoryId}")
    public ResponseEntity<UpdateDto.Res> update(@PathVariable Long categoryId, @Valid @RequestBody UpdateDto.Req updateReqDto) {
        UpdateDto.Res updatedCategory = categoryService.update(categoryId, updateReqDto);

        return ResponseEntity.ok(updatedCategory);
    }


    // 카테고리 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
    @DeleteMapping("admin/category/{categoryId}")
    public ResponseEntity<Long> delete(@PathVariable Long categoryId) {
        categoryService.delete(categoryId);

        return ResponseEntity.ok(categoryId);
    }
}
