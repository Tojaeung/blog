package com.tojaeung.blog.comment.repository;

import com.tojaeung.blog.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query("select c from Comment c " +
	// 연관관계가 있는 300댓글와 자식댓글 302,303만이 조회된다.
	// 연관관계가 없는 301댓글은 조회되지 않는다.
	// "left join fetch c.children " +
			"where c.post.id = :postId and c.parent.id is null " +
			"order by c.createdAt asc ")
	List<Comment> findCommentsInPost(@Param("postId") Long postId);

}
