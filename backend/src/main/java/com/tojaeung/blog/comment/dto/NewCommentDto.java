package com.tojaeung.blog.comment.dto;

import lombok.Getter;

@Getter
public class NewCommentDto {
    private String author;
    private String desc;

    // nullable
    private Long parentId;

}
