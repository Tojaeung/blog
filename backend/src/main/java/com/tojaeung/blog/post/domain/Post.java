package com.tojaeung.blog.post.domain;

import com.tojaeung.blog.category.domain.Category;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

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
    @Column(length = 50000)
    private String content;
    @Column
    private int views;
    @Column
    private String thumbnail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;
    @LastModifiedDate
    @Column(name = "last_modified_at", nullable = false)
    private LocalDate lastModifiedAt;

    // 변경감지를 위한 엔티티 업데이트
    public void update(Post post) {
        this.title = post.getTitle();
        this.content = post.getContent();
        this.thumbnail = post.getThumbnail();
    }

}
