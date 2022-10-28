package com.tojaeung.blog.category.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // 카테고리 생성
    public Category create(Category category) {
        Category newCategory = categoryRepository.save(category);

        return newCategory;
    }

    // 모든 카테고리 가져오기
    public List<Category> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    // 특정카테고리 가져오기 (포스팅들과 함께)
    public Category findOneWithPosts(String name) {
        Category category = categoryRepository.findOneWithPosts(name)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        return category;
    }

    // 카테고리 삭제
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
