package com.tojaeung.blog.category.repository;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.dto.PostCntResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select new com.tojaeung.blog.category.dto.PostCntResDto(c.id,c.name,c.posts.size) " +
            "from Category c")
    List<PostCntResDto> countPostsInCategory();
    
    // @Query("select p from Post p " +
    //         // "join fetch p.category " +   // 페이징시 페치조인 안되기떄문에 @EntityGraph를 사용해줬다. 
    //         "where p.category.id = :categoryId")
    // ResponseDto countPostsCategory(@Param("categoryId") Long categoryId);
}
