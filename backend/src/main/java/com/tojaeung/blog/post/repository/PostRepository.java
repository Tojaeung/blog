package com.tojaeung.blog.post.repository;

import com.tojaeung.blog.post.domain.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"category"})
    @Query("select p from Post p " +
            "left join fetch p.category " +
            "left join fetch p.comments " +
            "where p.id = : id")
    Optional<Post> findOneWithCategory(@Param("id") Long id);


}
