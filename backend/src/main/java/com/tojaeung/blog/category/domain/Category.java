package com.tojaeung.blog.category.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tojaeung.blog.post.domain.Post;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    List<Post> posts;

    public void update(Category category) {
        this.name = category.getName();
    }
}
