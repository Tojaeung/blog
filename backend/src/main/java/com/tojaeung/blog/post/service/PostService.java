package com.tojaeung.blog.post.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.CreateDto;
import com.tojaeung.blog.post.dto.UpdateDto;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    // 포스팅 생성
    @Transactional
    public CreateDto.Res create(Long categotyId, CreateDto.Req createReqDto) {
        Category category = categoryRepository.findById(categotyId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        createReqDto.setCategory(category);
        Post post = postRepository.save(createReqDto.toEntity());

        return new CreateDto.Res(post);
    }

    // 특정포스팅 가져오기 (부모 카테고리와 함께)
    @Transactional(readOnly = true)
    public Post findOneWithCategory(Long postId) {
        Post post = postRepository.findOneWithCategory(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        return post;
    }

    // 포스팅 변경하기
    @Transactional
    public UpdateDto.Res update(Long postId, UpdateDto.Req updateReqDto) {
        Post post = postRepository.findOneWithCategory(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        // 변경감지 사용
        post.update(updateReqDto.toEntity());

        return new UpdateDto.Res(post);
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
