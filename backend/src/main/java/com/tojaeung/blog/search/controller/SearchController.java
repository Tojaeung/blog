package com.tojaeung.blog.search.controller;

import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SearchController {
    private final SearchService searchService;

    // 전체 검색 (포스팅, 태그)
    @GetMapping("api/search")
    public ResponseEntity<PageResDto> searchAll(
            @RequestParam("keyword") String keyword,
            @PageableDefault(size = 10) Pageable pageable) {

        return ResponseEntity.ok(searchService.searchAll(keyword, pageable));
    }
}
