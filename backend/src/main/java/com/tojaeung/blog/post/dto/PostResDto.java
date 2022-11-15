package com.tojaeung.blog.post.dto;

import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.tag.dto.TagResDto;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PostResDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String thumbnail;
    private String categoryName;
    private List<TagResDto> tags;
    private LocalDate createdAt, lastModifiedAt;

    public PostResDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.thumbnail = post.getThumbnail();
        this.categoryName = post.getCategory().getName();

        List<TagResDto> tagResDtos = post.getTags().stream()
                .map((tag -> new TagResDto(tag)))
                .collect(Collectors.toList());
        this.tags = tagResDtos;

        this.createdAt = post.getCreatedAt();
        this.lastModifiedAt = post.getLastModifiedAt();
    }
}
