package com.tojaeung.blog.post.repository;

import com.tojaeung.blog.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select p from Post p " +
            "join fetch p.category " +
            "where p.id = :postId")
    Optional<Post> findOneWithCategory(@Param("postId") Long postId);

    @Query("select p from Post p " +
            "join fetch p.category " +
            "where p.category.id = :categoryId")
    List<Post> findAllInCategory(@Param("categoryId") Long categoryId);

    @EntityGraph(attributePaths = {"category"})
    @Query("select p from Post p " +
            "order by p.views DESC ")
    Page<Post> findTop5(Pageable pageable);

    // 포스팅 조회수 증가
    @Modifying
    @Transactional
    @Query("update Post p set p.views = p.views + 1  where p.id = :postId ")
    void addView(@Param("postId") Long postId);
}
