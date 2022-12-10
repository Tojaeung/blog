package com.tojaeung.blog.post.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.image.domain.Image;
import com.tojaeung.blog.image.util.ImageUtil;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.CreateReqDto;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.post.dto.UpdateReqDto;
import com.tojaeung.blog.post.repository.PostRepository;
import com.tojaeung.blog.tag.domain.Tag;
import com.tojaeung.blog.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    private final TagRepository tagRepository;
    private final ImageUtil imageUtil;

    // 포스팅 생성
    @Transactional
    public Post create(Long categotyId, CreateReqDto createReqDto, MultipartFile thumbnail) {
        Category category = categoryRepository.findById(categotyId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        // 썸네일 aws s3저장
        Image image = imageUtil.saveToAwsS3(thumbnail);

        Post post = Post.builder()
                .title(createReqDto.getTitle())
                .content(createReqDto.getContent())
                .thumbnail(image.getSavedPath())
                .views(0)
                .category(category)
                .build();

        Post newPost = postRepository.save(post);

        // 태그 저장
        List<String> tags = createReqDto.getTags();
        for (String tagName : tags) {
            Tag tag = Tag.builder()
                    .name(tagName)
                    .post(newPost)
                    .build();
            tagRepository.save(tag);
        }

        return newPost;
    }

    @Transactional(readOnly = true)
    public PageResDto findAllPosts(Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize(),
                Sort.by("createdAt").descending());

        Page<Post> pages = postRepository.findAllPosts(pageRequest);

        long totalCnt = pages.getTotalElements();

        List<PostResDto> allPosts = pages.getContent().stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());

        return new PageResDto(totalCnt, allPosts);

    }

    @Transactional(readOnly = true)
    public PageResDto findPostsInCategory(Long categoryId, Pageable pageable) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_CATEGORY);
        } else {
            int pageNumber = pageable.getPageNumber();
            PageRequest pageRequest = PageRequest.of(
                    pageNumber - 1,
                    pageable.getPageSize(),
                    Sort.by("createdAt").descending());

            Page<Post> pages = postRepository.findPostsInCategory(categoryId, pageRequest);
            long totalCnt = pages.getTotalElements();

            List<PostResDto> allPostsInCategory = pages.stream()
                    .map(post -> new PostResDto(post))
                    .collect(Collectors.toList());

            return new PageResDto(totalCnt, allPostsInCategory);
        }

    }

    @Transactional(readOnly = true)
    public List<PostResDto> findTop5() {
        List<Post> posts = postRepository.findTop5ByOrderByViewsDesc();
        List<PostResDto> top5Posts = posts.stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());
        return top5Posts;
    }

    // 특정포스팅 가져오기 (부모 카테고리와 함께)
    @Transactional
    public PostResDto findPost(Long postId) {
        if (!postRepository.existsById(postId))
            throw new CustomException(ExceptionCode.NOT_FOUND_POST);
        else {
            // 조회수 views 증가
            postRepository.addView(postId);

            Post findPost = postRepository.findPost(postId)
                    .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

            return new PostResDto(findPost);
        }
    }

    @Transactional(readOnly = true)
    public PageResDto searchPosts(String keyword, @PageableDefault(size = 10) Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize(),
                Sort.by("createdAt").descending());

        Page<Post> pages = postRepository.searchPosts(keyword, pageRequest);
        long totalCnt = pages.getTotalElements();

        List<PostResDto> searchedPosts = pages.stream()
                .map(post -> new PostResDto(post))
                .collect(Collectors.toList());

        return new PageResDto(totalCnt, searchedPosts);
    }

    // 포스팅 변경하기
    @Transactional
    public void update(Long postId, UpdateReqDto updateReqDto, MultipartFile updatedThumbnail) {
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        Category updatedCategory = categoryRepository.findById(updateReqDto.getUpdatedCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        Image image = imageUtil.saveToAwsS3(updatedThumbnail);

        Post updatedPost = Post.builder()
                .title(updateReqDto.getUpdatedTitle())
                .content(updateReqDto.getUpdatedContent())
                .thumbnail(image.getSavedPath())
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
