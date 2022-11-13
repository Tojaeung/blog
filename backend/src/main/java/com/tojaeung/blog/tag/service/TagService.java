package com.tojaeung.blog.tag.service;

import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.tag.domain.Tag;
import com.tojaeung.blog.tag.dto.TagResDto;
import com.tojaeung.blog.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<TagResDto> search(String tagName) {
        List<Tag> tags = tagRepository.search(tagName);

        List<TagResDto> tagResDtos = tags.stream()
                .map((tag -> new TagResDto(tag)))
                .collect(Collectors.toList());

        return tagResDtos;
    }

    @Transactional(readOnly = true)
    public PageResDto findPostsInTag(Long tagId, Pageable pageable) {
        Tag findTag = tagRepository.findById(tagId)
                .orElseThrow((() -> new CustomException(ExceptionCode.NOT_FOUND_TAG)));

        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize()
                // Sort.by("createdAt").descending()
        );

        Page<Tag> pages = tagRepository.findPostsInTag(findTag.getName(), pageRequest);

        long totalCnt = pages.getTotalElements();

        // tag.post에서 post를 추출해서 PostResDto로 반환 
        List<PostResDto> postsInTag = pages.getContent().stream()
                .map(tag -> new PostResDto(tag.getPost()))
                .collect(Collectors.toList());

        return new PageResDto(totalCnt, postsInTag);

    }

    @Transactional
    public void update(String tagName, String updatedTagName) {
        if (!tagRepository.existsByName(tagName)) throw new CustomException(ExceptionCode.NOT_FOUND_TAG);
        if (tagRepository.existsByName(updatedTagName)) throw new CustomException(ExceptionCode.ALREADY_EXISTING_TAG);

        // 벌크성 수정 쿼리    
        tagRepository.updateTagName(tagName, updatedTagName);
    }

    @Transactional
    public void delete(Long postId, Long tagId) {
        if (!tagRepository.existsById(postId)) throw new CustomException(ExceptionCode.NOT_FOUND_POST);

        tagRepository.deleteById(postId);
    }
}
