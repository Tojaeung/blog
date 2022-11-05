package com.tojaeung.blog.post.dto;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.post.domain.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDate;

public class CreateDto {

    @Setter
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req {
        @NotBlank(message = "포스팅 제목을 입력해주세요.")
        private String title;
        @NotBlank(message = "포스팅 내용을 입력해주세요.")
        private String content;
        @NotBlank(message = "썸네일을 추가해주세요.")
        private String thumbnail;

        @Null
        private Category category;

        public Post toEntity() {
            Post post = Post.builder()
                    .title(title)
                    .content(content)
                    .views(0)
                    .thumbnail(thumbnail)
                    .category(category)
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
        private String categoryName;
        private LocalDate createdAt, lastModifiedAt;

        public Res(Post post) {
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
}
