package com.tojaeung.blog.post.dto;

import com.tojaeung.blog.post.domain.Post;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PostResDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String thumbnail;
    private String categoryName;
    private LocalDate createdAt, lastModifiedAt;

    public PostResDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.thumbnail = post.getThumbnail();
        this.categoryName = post.getCategory().getName();
        this.createdAt = post.getCreatedAt();
        this.lastModifiedAt = post.getLastModifiedAt();
    }
}
