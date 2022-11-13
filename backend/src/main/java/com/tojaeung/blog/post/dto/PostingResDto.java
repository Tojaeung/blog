package com.tojaeung.blog.post.dto;

import com.tojaeung.blog.comment.dto.CommentResDto;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.tag.dto.TagResDto;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PostingResDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private String thumbnail;
    private String categoryName;
    private List<CommentResDto> comments;
    private List<TagResDto> tagNames;
    private LocalDate createdAt, lastModifiedAt;

    public PostingResDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.thumbnail = post.getThumbnail();
        this.categoryName = post.getCategory().getName();

        List<CommentResDto> comments = post.getComments().stream()
                .map((comment -> new CommentResDto(comment)))
                .collect(Collectors.toList());
        this.comments = comments;

        List<TagResDto> tagNames = post.getTags().stream()
                .map((tag -> new TagResDto(tag)))
                .collect(Collectors.toList());
        this.tagNames = tagNames;

        this.createdAt = post.getCreatedAt();
        this.lastModifiedAt = post.getLastModifiedAt();
    }
}
