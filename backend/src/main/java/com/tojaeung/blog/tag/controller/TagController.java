package com.tojaeung.blog.tag.controller;

import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.tag.dto.TagResDto;
import com.tojaeung.blog.tag.dto.UpdateReqDto;
import com.tojaeung.blog.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TagController {
    private final TagService tagService;

    // 태그 검색
    @GetMapping("admin/search")
    public ResponseEntity<List<TagResDto>> search(@RequestParam String tagName) {
        return ResponseEntity.ok(tagService.search(tagName));
    }

    // 태그 조회 (태그 네임으로 해당하는 모든 포스트 조회) return findPostwithCategory (페이징) 
    @GetMapping("api/tag/{tagId}")
    public ResponseEntity<PageResDto> findPostsInTag(
            @PathVariable Long tagId, @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(tagService.findPostsInTag(tagId, pageable));
    }

    // 해당하는 태그 디비내 전체 태그명 변경
    @PutMapping("admin/tag/{tagId}")
    public ResponseEntity update(
            @PathVariable Long tagId,
            @Valid @RequestBody UpdateReqDto updateReqDto) {

        tagService.update(tagId, updateReqDto.getUpdatedTagName());

        return ResponseEntity.ok().build();
    }

    // 포스팅에 해당하는 태그 제거
    @DeleteMapping("admin/post/{postId}/tag/{tagId}")
    public ResponseEntity<Long> delete(@PathVariable Long postId, @PathVariable Long tagId) {
        tagService.delete(postId, tagId);

        return ResponseEntity.ok(tagId);
    }

}
