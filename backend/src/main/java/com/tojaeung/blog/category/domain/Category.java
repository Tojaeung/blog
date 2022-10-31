package com.tojaeung.blog.category.domain;

import com.tojaeung.blog.post.domain.Post;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "category"
            , fetch = FetchType.LAZY
            , orphanRemoval = true)
    List<Post> posts = new ArrayList<>();
}
