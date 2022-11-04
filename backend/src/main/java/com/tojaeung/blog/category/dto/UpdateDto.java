package com.tojaeung.blog.category.dto;

import com.tojaeung.blog.category.domain.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class UpdateDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req {
        @NotBlank(message = "변경할 카테고리 이름을 입력해주세요.")
        private String updatedName;

        public Category toEntity() {
            Category category = Category.builder()
                    .name(updatedName)
                    .build();
            return category;
        }
    }

    @Getter
    public static class Res {
        private Long id;
        private String name;
        private int postCnt;

        public Res(Category category) {
            this.id = category.getId();
            this.name = category.getName();
            this.postCnt = category.getPosts().size();
        }
    }
}
