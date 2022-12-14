package com.tojaeung.blog.category.controller;

import com.tojaeung.blog.category.dto.CreateReqDto;
import com.tojaeung.blog.category.dto.PostCntResDto;
import com.tojaeung.blog.category.dto.UpdateReqDto;
import com.tojaeung.blog.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {
	private final CategoryService categoryService;

	// 카테고리 새로 생성
	@PostMapping("api/admin/category")
	public ResponseEntity<PostCntResDto> create(@Valid @RequestBody CreateReqDto createReqDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(createReqDto));
	}

	// 모든 카테고리 가져오기
	@GetMapping("api/category")
	public ResponseEntity<List<PostCntResDto>> findAllCntPostsInCategory() {
		return ResponseEntity.ok(categoryService.findAllCntPostsInCategory());
	}

	// 특정 카테고리 가져오기
	@GetMapping("api/category/{categoryId}")
	public ResponseEntity<PostCntResDto> findOneCntPostsInCategory(@PathVariable Long categoryId) {
		return ResponseEntity.ok(categoryService.findOneCntPostsInCategory(categoryId));
	}

	// 카테고리 수정
	@PutMapping("api/admin/category/{categoryId}")
	public ResponseEntity<PostCntResDto> update(@PathVariable Long categoryId,
			@Valid @RequestBody UpdateReqDto updateReqDto) {
		PostCntResDto updatedCategory = categoryService.update(categoryId, updateReqDto);

		return ResponseEntity.ok(updatedCategory);
	}

	// 카테고리 삭제 관련된 자식 포스팅도 모두 삭제 유의 !!
	@DeleteMapping("api/admin/category/{categoryId}")
	public ResponseEntity<Long> delete(@PathVariable Long categoryId) {
		categoryService.delete(categoryId);

		return ResponseEntity.ok(categoryId);
	}
}
