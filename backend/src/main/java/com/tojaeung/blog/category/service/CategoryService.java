package com.tojaeung.blog.category.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.CategoryResponseDto;
import com.tojaeung.blog.category.dto.DeleteResponseDto;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // 카테고리 생성
    public CategoryResponseDto create(Category category) {
        Category newCategory = categoryRepository.save(category);

        return new CategoryResponseDto(newCategory);
    }

    // 모든 카테고리 가져오기
    public List<CategoryResponseDto> findAll() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponseDto> categoryResponseDtos = categories.stream()
                .map(category -> new CategoryResponseDto(category))
                .collect(Collectors.toList());

        return categoryResponseDtos;
    }

    // 특정카테고리 가져오기 (포스팅들과 함께)
    public Category findOneWithPosts(String name) {
        Category category = categoryRepository.findOneWithPosts(name)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        return category;
    }

    // 카테고리 수정
    public CategoryResponseDto update(Category category) {
        if (!categoryRepository.existsById(category.getId())) {
            throw new CustomException(ExceptionCode.NOT_FOUND_CATEGORY);
        } else {
            Category updatedCategory = categoryRepository.save(category);

            return new CategoryResponseDto(updatedCategory);
        }
    }

    // 카테고리 삭제
    public DeleteResponseDto delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_CATEGORY);
        } else {
            categoryRepository.deleteById(id);
        }

        return new DeleteResponseDto(id);
    }
}
