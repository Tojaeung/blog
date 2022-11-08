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

    @Override
    @EntityGraph(attributePaths = {"category"})
    @Query("select p from Post p ")
    Page<Post> findAll(Pageable pageable);

    @Query("select p from Post p " +
            "join fetch p.category " +
            "where p.id = :postId")
    Optional<Post> findOneWithCategory(@Param("postId") Long postId);

    @EntityGraph(attributePaths = {"category"})
    @Query("select p from Post p " +
            // "join fetch p.category " +   // 페이징시 페치조인 안되기떄문에 @EntityGraph를 사용해줬다. 
            "where p.category.id = :categoryId")
    Page<Post> findAllInCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    // @EntityGraph(attributePaths = {"category"})
    // @Query("select p from Post p " +
    //         "order by p.views DESC ")
    List<Post> findTop5ByOrderByViewsDesc();

    // 포스팅 조회수 증가
    @Modifying
    @Transactional
    @Query("update Post p set p.views = p.views + 1  where p.id = :postId ")
    void addView(@Param("postId") Long postId);
}
