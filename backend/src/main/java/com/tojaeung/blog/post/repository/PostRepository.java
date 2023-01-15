package com.tojaeung.blog.post.repository;

import com.tojaeung.blog.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

	@EntityGraph(attributePaths = { "category", "tags" })
	@Query("select p from Post p ")
	Page<Post> findAllPosts(Pageable pageable);

	@EntityGraph(attributePaths = { "category", "tags" })
	@Query("select p from Post p " +
			"where p.category.id = :categoryId")
	Page<Post> findPostsInCategory(@Param("categoryId") Long categoryId, Pageable pageable);

	// @EntityGraph(attributePaths = {"category"})
	// @Query("select p from Post p " +
	// "order by p.views DESC ")
	List<Post> findTop6ByOrderByViewsDesc();

	// 포스팅 조회수 증가
	@Modifying
	@Transactional
	@Query("update Post p set p.views = p.views + 1  where p.id = :postId ")
	void addView(@Param("postId") Long postId);

	@Query("select distinct p from Post p " +
			"join fetch p.category " +
			// "join fetch p.comments " + // org.hibernate.loader.MultipleBagFetchException:
			// cannot simultaneously fetch multiple bags
			"left join fetch p.tags " +
			"where p.id = :postId ")
	Optional<Post> findPost(@Param("postId") Long postId);

	// 포스팅 검색
	@EntityGraph(attributePaths = { "category" })
	@Query("select p from Post p " +
	// "join fetch p.category " + // 페이징시 페치조인 안되기떄문에 @EntityGraph를 사용해줬다.
			"where p.title like %:keyword% or p.content like %:keyword% ")
	Page<Post> searchPosts(@Param("keyword") String keyword, Pageable pageable);
}
