package com.tojaeung.blog.comment.dto;

import com.tojaeung.blog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CommentResDto {
    private Long id;
    private String author;
    private String content;
    private Boolean isAdmin;
    private Long postId;
    private Long parentId;
    private List<CommentResDto> children;
    private LocalDate createdAt, lastModifiedAt;

    public CommentResDto(Comment comment) {
        this.id = comment.getId();
        this.author = comment.getAuthor();
        this.content = comment.getContent();
        this.isAdmin = comment.getIsAdmin();
        this.postId = comment.getPost().getId();

        if (comment.getParent() == null) this.parentId = null;
        else this.parentId = comment.getParent().getId();

        if (comment.getChildren() == null) this.children = new ArrayList<>();
        else {
            // 자식댓글 생성날짜 내림차순으로 정렬
            Collections.sort(comment.getChildren(), (c1, c2) -> {
                if (c1.getCreatedAt().isBefore(c2.getCreatedAt())) return -1;
                return 1;
            });

            List<CommentResDto> children = comment.getChildren().stream()
                    .map(childComment -> new CommentResDto(childComment))
                    .collect(Collectors.toList());
            this.children = children;
        }

        this.createdAt = comment.getCreatedAt();
        this.lastModifiedAt = comment.getLastModifiedAt();
    }

}
