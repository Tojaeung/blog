package com.tojaeung.blog.tag.repository;

import com.tojaeung.blog.tag.domain.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    boolean existsByName(String tagName);

    @Query("select t from Tag t " +
            "where t.name like %:tagName% ")
    List<Tag> search(@Param("tagName") String tagName);

    @EntityGraph(attributePaths = {"post"})
    @Query("select t from Tag t " +
            "where t.name = :tagName ")
    Page<Tag> findPostsInTag(@Param("tagName") String tagName, Pageable pageable);

    @Modifying  // 벌크 수정 쿼리
    @Query("update Tag t set t.name = :updatedTagName " +
            "where t.name = :tagName ")
    int updateTagName(
            @Param("tagName") String tagName,
            @Param("updatedTagName") String updatedTagName);

}
