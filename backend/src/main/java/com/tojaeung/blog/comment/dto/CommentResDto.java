package com.tojaeung.blog.comment.dto;

import com.tojaeung.blog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CommentResDto {
    private Long id;
    private String author;
    private String content;
    private Long parentId;
    private List<CommentResDto> children;
    private LocalDate createdAt, lastModifiedAt;

    public CommentResDto(Comment comment) {
        this.id = comment.getId();
        this.author = comment.getAuthor();
        this.content = comment.getContent();

        if (comment.getParent() == null) this.parentId = null;
        else this.parentId = comment.getParent().getId();
        
        if (comment.getChildren() == null) this.children = new ArrayList<>();
        else {
            List<CommentResDto> children = comment.getChildren().stream()
                    .map(childComment -> new CommentResDto(childComment))
                    .collect(Collectors.toList());
            this.children = children;
        }

        this.createdAt = comment.getCreatedAt();
        this.lastModifiedAt = comment.getLastModifiedAt();
    }

}
