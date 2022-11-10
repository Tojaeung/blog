package com.tojaeung.blog.category.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.CreateReqDto;
import com.tojaeung.blog.category.dto.PostCntResDto;
import com.tojaeung.blog.category.dto.UpdateReqDto;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // 카테고리 생성
    @Transactional
    public PostCntResDto create(CreateReqDto createReqDto) {
        Category category = Category.builder()
                .name(createReqDto.getName())
                .build();

        Category newCategory = categoryRepository.save(category);

        return new PostCntResDto(newCategory.getId(), newCategory.getName(), 0);
    }

    // 모든 카테고리 가져오기
    @Transactional(readOnly = true)
    public List<PostCntResDto> countPostsInCategory() {
        List<PostCntResDto> allCategories = categoryRepository.countPostsInCategory();

        return allCategories;
    }

    // 특정카테고리 가져오기 (포스팅들과 함께)
    // @Transactional(readOnly = true)
    // public Category findOneWithPosts(Long categoryId) {
    //     Category category = categoryRepository.findById(categoryId)
    //             .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));
    //
    //     return category;
    // }

    // 카테고리 수정
    @Transactional
    public PostCntResDto update(Long categoryId, UpdateReqDto updateReqDto) {
        Category findCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        Category category = Category.builder()
                .name(updateReqDto.getUpdatedName())
                .build();

        findCategory.update(category);

        return new PostCntResDto(findCategory.getId(), findCategory.getName(), findCategory.getPosts().size());
    }

    // 카테고리 삭제
    @Transactional
    public void delete(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_CATEGORY);
        } else {
            categoryRepository.deleteById(categoryId);
        }
    }
}
