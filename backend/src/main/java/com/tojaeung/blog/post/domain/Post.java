package com.tojaeung.blog.post.domain;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.comment.domain.Comment;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long id;
    @Column
    private String title;
    @Column
    private String desc;
    @Column
    private String views;
    @Column
    private String thumbnail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "post"
            , fetch = FetchType.LAZY
            , orphanRemoval = true)
    List<Comment> comments = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "last_modified_at", nullable = false)
    private LocalDateTime lastModifiedAt;
}
