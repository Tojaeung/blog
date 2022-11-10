package com.tojaeung.blog.category.dto;

import lombok.Builder;

@Builder
public class PostCntResDto {
    private Long id;
    private String name;
    private int postCnt;
}
