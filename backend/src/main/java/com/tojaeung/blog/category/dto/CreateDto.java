package com.tojaeung.blog.category.dto;

import com.tojaeung.blog.category.domain.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class CreateDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Req {
        @NotBlank(message = "카테고리 이름을 입력해주세요.")
        private String name;

        public Category toEntity() {
            Category category = Category.builder()
                    .name(name)
                    .build();
            return category;
        }
    }

    @Getter
    public static class Res {
        private Long id;
        private String name;

        public Res(Category category) {
            this.id = category.getId();
            this.name = category.getName();
        }
    }
}
