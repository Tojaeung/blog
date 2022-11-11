package com.tojaeung.blog.search.service;

import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final PostRepository postRepository;

    // 포스팅의 댓글들 조회하기
    @Transactional(readOnly = true)
    public PageResDto searchAll(String keyword, Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize(),
                Sort.by("createdAt").descending()
        );

        Page<Post> pages = postRepository.search(keyword, pageRequest);
        long totalCnt = pages.getTotalElements();

        List<PostResDto> allPostsInCategory = pages.stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());

        return new PageResDto(totalCnt, allPostsInCategory);
    }
}