package com.tojaeung.blog.post.dto;

import lombok.Getter;

import java.util.List;

// 페이지네이션을 위한 totalCount를 프론트에 보내주기 위한 dto
@Getter
public class PaginationDto {
    private long totalCnt;
    private List<ResponseDto> posts;

    public PaginationDto(long totalCnt, List<ResponseDto> posts) {
        this.totalCnt = totalCnt;
        this.posts = posts;
    }
}
