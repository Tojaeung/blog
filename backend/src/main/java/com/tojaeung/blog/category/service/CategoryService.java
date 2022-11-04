package com.tojaeung.blog.category.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.CreateDto;
import com.tojaeung.blog.category.dto.FindAllDto;
import com.tojaeung.blog.category.dto.UpdateDto;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // 카테고리 생성
    @Transactional
    public CreateDto.Res create(CreateDto.Req createReqDto) {
        Category category = categoryRepository.save(createReqDto.toEntity());

        return new CreateDto.Res(category);
    }

    // 모든 카테고리 가져오기
    @Transactional(readOnly = true)
    public List<FindAllDto.Res> findAll() {
        List<Category> categories = categoryRepository.findAll();
        List<FindAllDto.Res> allCategories = categories.stream()
                .map(category -> new FindAllDto.Res(category))
                .collect(Collectors.toList());

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
    public UpdateDto.Res update(Long categoryId, UpdateDto.Req updateReqDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        category.update(updateReqDto.toEntity());

        return new UpdateDto.Res(category);
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
