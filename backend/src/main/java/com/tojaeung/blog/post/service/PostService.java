package com.tojaeung.blog.post.service;

import com.tojaeung.blog.File.domain.File;
import com.tojaeung.blog.File.util.FileUtil;
import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.*;
import com.tojaeung.blog.post.repository.PostRepository;
import com.tojaeung.blog.tag.domain.Tag;
import com.tojaeung.blog.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final FileUtil fileUtil;

    // 포스팅 생성
    @Transactional
    public PostResDto create(Long categotyId, CreateReqDto createReqDto) {
        Category category = categoryRepository.findById(categotyId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        // 썸네일 aws s3저장
        File file = fileUtil.saveToAwsS3(createReqDto.getThumbnail());

        Post post = Post.builder()
                .title(createReqDto.getTitle())
                .content(createReqDto.getContent())
                .thumbnail(file.getSavedPath())
                .views(0)
                .category(category)
                .build();

        return new PostResDto(postRepository.save(post));
    }

    @Transactional(readOnly = true)
    public PageResDto findAll(Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize(),
                Sort.by("createdAt").descending()
        );

        Page<Post> pages = postRepository.findAll(pageRequest);

        long totalCnt = pages.getTotalElements();

        List<PostResDto> allPosts = pages.getContent().stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());

        return new PageResDto(totalCnt, allPosts);

    }

    @Transactional(readOnly = true)
    public PageResDto findAllInCategory(Long categoryId, Pageable pageable) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_CATEGORY);
        } else {
            int pageNumber = pageable.getPageNumber();
            PageRequest pageRequest = PageRequest.of(
                    pageNumber - 1,
                    pageable.getPageSize(),
                    Sort.by("createdAt").descending()
            );

            Page<Post> pages = postRepository.findAllInCategory(categoryId, pageRequest);
            long totalCnt = pages.getTotalElements();

            List<PostResDto> allPostsInCategory = pages.stream()
                    .map(post -> new PostResDto(post))
                    .collect(Collectors.toList());

            return new PageResDto(totalCnt, allPostsInCategory);
        }

    }

    public List<PostResDto> findTop5() {
        List<Post> posts = postRepository.findTop5ByOrderByViewsDesc();
        List<PostResDto> top5Posts = posts.stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());
        return top5Posts;
    }

    // 특정포스팅 가져오기 (부모 카테고리와 함께)
    @Transactional(readOnly = true)
    public PostingResDto findPosting(Long postId) {
        if (!postRepository.existsById(postId)) throw new CustomException(ExceptionCode.NOT_FOUND_POST);
        else {
            // 조회수 views 증가 
            postRepository.addView(postId);

            Post findPost = postRepository.findOneWithCategory(postId)
                    .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

            return new PostingResDto(findPost);
        }
    }

    // 포스팅 변경하기
    @Transactional
    public void update(Long postId, UpdateReqDto updateReqDto, MultipartFile updatedThumbnail) {
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        Category updatedCategory = categoryRepository.findById(updateReqDto.getUpdatedCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        File file = fileUtil.saveToAwsS3(updatedThumbnail);

        Post updatedPost = Post.builder()
                .title(updateReqDto.getUpdatedTitle())
                .content(updateReqDto.getUpdatedContent())
                .thumbnail(file.getSavedPath())
                .category(updatedCategory)
                .build();

        // 변경감지 사용
        findPost.update(updatedPost);
    }

    // 포스팅 제거
    @Transactional
    public void delete(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_POST);
        }

        postRepository.deleteById(postId);
    }
}
