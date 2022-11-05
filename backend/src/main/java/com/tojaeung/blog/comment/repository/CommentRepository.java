package com.tojaeung.blog.comment.repository;

import com.tojaeung.blog.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c " +
            "join fetch c.post " +
            "where c.post.id = :postId and c.parent.id is null ")
    List<Comment> findAllInPost(@Param("postId") Long postId);

}
