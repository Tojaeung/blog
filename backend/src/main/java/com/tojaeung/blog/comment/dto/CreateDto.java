package com.tojaeung.blog.comment.dto;

import com.tojaeung.blog.comment.domain.Comment;
import com.tojaeung.blog.post.domain.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CreateDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req {
        @NotBlank(message = "작성자를 입력해주세요.")
        @Size(max = 10, message = "최대 10글자 입니다.")
        private String author;
        @NotBlank(message = "댓글을 입력해주세요.")
        @Size(max = 255, message = "최대 255자 입니다.")
        private String content;

        @Null
        private Post post;
        @Null
        private Comment parent;

        public Comment toEntity() {
            Comment comment = Comment.builder()
                    .author(author)
                    .content(content)
                    .post(post)
                    .parent(parent)
                    .build();

            return comment;
        }
    }

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
            this.children = new ArrayList<>();
            this.createdAt = comment.getCreatedAt();
            this.lastModifiedAt = comment.getLastModifiedAt();
        }
    }
}
