package com.tojaeung.blog.category.repository;

import com.tojaeung.blog.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    // @EntityGraph(attributePaths = {"posts"})
    @Query("select c from Category c left join fetch c.posts where c.name = :name")
    Optional<Category> findOneWithPosts(@Param("name") String name);


}
