package com.tojaeung.blog.category.dto;

import com.tojaeung.blog.category.domain.Category;
import lombok.Getter;

public class FindAllDto {

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
