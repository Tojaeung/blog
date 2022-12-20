package com.tojaeung.blog.tag.controller;

import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.tag.dto.AllTagResDto;
import com.tojaeung.blog.tag.dto.UpdateReqDto;
import com.tojaeung.blog.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {
	private final TagService tagService;

	// 태그 검색
	@GetMapping("api/admin/search")
	public ResponseEntity<List<String>> searchTagName(@RequestParam String tagName) {
		return ResponseEntity.ok(tagService.searchTagName(tagName));
	}

	// 태그 조회 (태그 네임으로 해당하는 모든 포스트 조회) return findPostwithCategory (페이징)
	@GetMapping("api/tags")
	public ResponseEntity<List<AllTagResDto>> findAllTags() {
		return ResponseEntity.ok(tagService.findAllTags());
	}

	// 태그 조회 (태그 네임으로 해당하는 모든 포스트 조회) return findPostwithCategory (페이징)
	@GetMapping("api/tag")
	public ResponseEntity<PageResDto> findPostsInTag(
			@RequestParam("tagName") String tagName, @PageableDefault(size = 10) Pageable pageable) {
		return ResponseEntity.ok(tagService.findPostsInTag(tagName, pageable));
	}

	// 해당하는 태그 디비내 전체 태그명 변경
	@PutMapping("api/admin/tag/{tagId}")
	public ResponseEntity<?> update(
			@PathVariable Long tagId,
			@Valid @RequestBody UpdateReqDto updateReqDto) {

		tagService.update(tagId, updateReqDto.getUpdatedTagName());

		return ResponseEntity.ok().build();
	}

	// 포스팅에 해당하는 태그 제거
	@DeleteMapping("api/admin/post/{postId}/tag/{tagId}")
	public ResponseEntity<Long> delete(@PathVariable Long postId, @PathVariable Long tagId) {
		tagService.delete(postId, tagId);

		return ResponseEntity.ok(tagId);
	}

}
