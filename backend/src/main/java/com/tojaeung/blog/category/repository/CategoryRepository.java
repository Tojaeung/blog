package com.tojaeung.blog.category.repository;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.PostCntResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	@Query("select new com.tojaeung.blog.category.dto.PostCntResDto(c.id,c.name,c.posts.size) " +
			"from Category c")
	List<PostCntResDto> findAllCntPostsInCategory();

	@Query("select new com.tojaeung.blog.category.dto.PostCntResDto(c.id,c.name,c.posts.size) " +
			"from Category c where c.id = :categoryId")
	PostCntResDto findOneCntPostsInCategory(@Param("categoryId") Long categoryId);
}
