package com.tojaeung.blog.category.controller;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.NewCategoryDto;
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
    public ResponseEntity<Category> create(@Valid @RequestBody NewCategoryDto newCategoryDto) {
        Category category = Category.builder()
                .name(newCategoryDto.getName())
                .build();

        Category newCategory = categoryService.create(category);

        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    // 모든 카테고리 가져오기
    @GetMapping("api/category")
    public ResponseEntity<List<Category>> findAll() {
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }

    // 특정카테고리 가져오기 (포스팅들과 함께)
    @GetMapping("api/category/{name}")
    public ResponseEntity<Category> findOneWithPosts(@PathVariable String name) {
        return ResponseEntity.ok(categoryService.findOneWithPosts(name));
    }

    // 카테고리 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
    @DeleteMapping("admin/category/{id}")
    public ResponseEntity findOneWithPosts(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
