package com.tojaeung.blog.comment.dto;

import com.tojaeung.blog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class FindAllInPost {

    @Getter
    public static class Res {
        private Long id;
        private String author;
        private String content;
        private List<Comment> children;
        private LocalDate createdAt, lastModifiedAt;

        public Res(Comment comment) {
            this.id = comment.getId();
            this.author = comment.getAuthor();
            this.content = comment.getContent();
            this.children = comment.getChildren();
            this.createdAt = comment.getCreatedAt();
            this.lastModifiedAt = comment.getLastModifiedAt();
        }
    }
}
