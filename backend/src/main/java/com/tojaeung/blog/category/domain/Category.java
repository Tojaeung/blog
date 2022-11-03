package com.tojaeung.blog.category.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tojaeung.blog.post.domain.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id")
    private Long id;
    @Column
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "category"
            , fetch = FetchType.LAZY
            , orphanRemoval = true)
    List<Post> posts = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
