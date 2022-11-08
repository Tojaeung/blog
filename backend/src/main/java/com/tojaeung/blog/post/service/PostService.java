package com.tojaeung.blog.post.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tojaeung.blog.category.domain.Category;
import com.tojaeung.blog.category.repository.CategoryRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.dto.CreateReqDto;
import com.tojaeung.blog.post.dto.PaginationDto;
import com.tojaeung.blog.post.dto.ResponseDto;
import com.tojaeung.blog.post.dto.UpdateDto;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    // 포스팅 생성
    @Transactional
    public ResponseDto create(Long categotyId, CreateReqDto createReqDto) {
        Category category = categoryRepository.findById(categotyId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_CATEGORY));

        Post post = Post.builder()
                .title(createReqDto.getTitle())
                .content(createReqDto.getContent())
                .thumbnail(saveThumbnailToS3(createReqDto.getThumbnail()))
                .views(0)
                .category(category)
                .build();

        return new ResponseDto(postRepository.save(post));
    }

    @Transactional(readOnly = true)
    public PaginationDto findAll(Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        PageRequest pageRequest = PageRequest.of(
                pageNumber - 1,
                pageable.getPageSize(),
                Sort.by("createdAt").descending()
        );

        Page<Post> pages = postRepository.findAll(pageRequest);

        long totalCnt = pages.getTotalElements();

        List<ResponseDto> allPosts = pages.getContent().stream()
                .map(post -> new ResponseDto(post))
                .collect(Collectors.toList());

        return new PaginationDto(totalCnt, allPosts);

    }

    @Transactional(readOnly = true)
    public PaginationDto findAllInCategory(Long categoryId, Pageable pageable) {
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

            List<ResponseDto> allPostsInCategory = pages.stream()
                    .map(post -> new ResponseDto(post))
                    .collect(Collectors.toList());

            return new PaginationDto(totalCnt, allPostsInCategory);
        }

    }

    public List<ResponseDto> findTop5() {
        List<Post> posts = postRepository.findTop5ByOrderByViewsDesc();
        List<ResponseDto> top5Posts = posts.stream()
                .map(post -> new ResponseDto(post))
                .collect(Collectors.toList());
        return top5Posts;
    }

    // 특정포스팅 가져오기 (부모 카테고리와 함께)
    @Transactional(readOnly = true)
    public ResponseDto findOneWithCategory(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_POST);
        } else {
            // 조회수 views 증가 
            postRepository.addView(postId);

            Post post = postRepository.findOneWithCategory(postId)
                    .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

            return new ResponseDto(post);
        }
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


    /**
     * 썸네일을 Aws S3에 저장하는 함수
     *
     * @param multipartFile 썸네일 File 객체
     * @return 썸네일이 저장된 Url 리턴
     */
    public String saveThumbnailToS3(MultipartFile multipartFile) {
        String originalName = multipartFile.getOriginalFilename();
        // 파일 이름으로 쓸 uuid 생성
        String uuid = UUID.randomUUID().toString();

        // 확장자 추출(ex : .png)
        String extension = originalName.substring(originalName.lastIndexOf("."));

        // uuid와 확장자 결합
        String savedName = uuid + extension;

        // 파일을 불러올 때 사용할 파일 경로
        String savedPath = "https://" + bucket + ".s3.ap-northeast-2.amazonaws.com/" + savedName;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, savedName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new CustomException(ExceptionCode.FAILED_IMAGE_UPLOAD);
        }

        return savedPath;
    }
}
