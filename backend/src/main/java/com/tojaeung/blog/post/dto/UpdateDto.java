package com.tojaeung.blog.post.dto;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.post.domain.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class UpdateDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req {
        @NotBlank(message = "포스팅 제목을 입력해주세요.")
        private String title;
        @NotBlank(message = "포스팅 내용을 입력해주세요.")
        private String content;
        @NotBlank(message = "썸네일을 추가해주세요.")
        private String thumbnail;

        public Post toEntity() {
            Post post = Post.builder()
                    .title(title)
                    .content(content)
                    .thumbnail(thumbnail)
                    .build();
            return post;
        }
    }

    @Getter
    public static class Res {
        private Long id;
        private String title;
        private String content;
        private int views;
        private String thumbnail;
        private Category category;
        private LocalDate createdAt, lastModifiedAt;

        public Res(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.views = post.getViews();
            this.thumbnail = post.getThumbnail();
            this.category = post.getCategory();
            this.createdAt = post.getCreatedAt();
            this.lastModifiedAt = post.getLastModifiedAt();
        }
    }
}
