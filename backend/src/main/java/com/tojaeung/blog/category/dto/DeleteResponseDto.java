package com.tojaeung.blog.category.dto;

import lombok.Getter;

@Getter
public class DeleteResponseDto {
    private Long deletedId;

    public DeleteResponseDto(Long id) {
        this.deletedId = deletedId;
    }
}
