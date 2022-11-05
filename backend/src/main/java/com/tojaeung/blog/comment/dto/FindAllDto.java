package com.tojaeung.blog.comment.dto;

import com.tojaeung.blog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class FindAllDto {

    @Getter
    public static class Res {
        private Long id;
        private String author;
        private String content;
        private Long postId;
        private List<FindAllDto.Res> children;
        private LocalDate createdAt, lastModifiedAt;

        public Res(Comment comment) {
            this.id = comment.getId();
            this.author = comment.getAuthor();
            this.content = comment.getContent();
            this.postId = comment.getPost().getId();
            this.children = comment.getChildren().stream().map((child) -> new FindAllDto.Res(child)).collect(Collectors.toList());
            this.createdAt = comment.getCreatedAt();
            this.lastModifiedAt = comment.getLastModifiedAt();
        }
    }
}
