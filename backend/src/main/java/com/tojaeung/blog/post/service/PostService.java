package com.tojaeung.blog.post.service;

import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.NewPostDto;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    // 포스팅 생성
    public Post create(String name, NewPostDto postDto) {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        Post newPost = Post.builder()
                .title(postDto.getTitle())
                .desc(postDto.getDesc())
                .category(category)
                .build();

        return postRepository.save(newPost);
    }

    // 특정포스팅 가져오기 (부모 카테고리와 함께)
    public Post findOneWithCategory(Long id) {
        Post post = postRepository.findOneWithCategory(id)
                .orElseThrow(() -> new CustomException(ExceptionCode.INVALID_ADMIN_USERNAME));

        return post;
    }


    // 포스팅 제거
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

}
