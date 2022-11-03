package com.tojaeung.blog.category.dto;

import com.tojaeung.blog.category.domain.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CategoryResponseDto {
    private Long id;
    private String name;
    private int postCnt;

    public CategoryResponseDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();

        if (category.getPosts() == null) {
            this.postCnt = 0;
        } else {
            this.postCnt = category.getPosts().size();
        }
    }
}
