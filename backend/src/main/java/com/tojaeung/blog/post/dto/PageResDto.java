package com.tojaeung.blog.post.dto;

import lombok.Getter;

import java.util.List;

// 페이지네이션을 위한 totalCount를 프론트에 보내주기 위한 dto
@Getter
public class PageResDto {
    private long totalCnt;
    private List<PostResDto> posts;

    public PageResDto(long totalCnt, List<PostResDto> posts) {
        this.totalCnt = totalCnt;
        this.posts = posts;
    }
}
