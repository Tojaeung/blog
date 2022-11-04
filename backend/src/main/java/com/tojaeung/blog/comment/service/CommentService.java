package com.tojaeung.blog.comment.service;

import com.tojaeung.blog.comment.domain.Comment;
import com.tojaeung.blog.comment.dto.CreateDto;
import com.tojaeung.blog.comment.dto.FindAllInPost;
import com.tojaeung.blog.comment.repository.CommentRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.domain.Post;
import com.tojaeung.blog.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 댓글 생성
    @Transactional
    public CreateDto.Res create(Long postId, Long parentId, CreateDto.Req createReqDto) {
        // 포스트가 존재 하는지
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_POST));

        createReqDto.setPost(post);

        // 부모 댓글이 존재하는지
        if (parentId == null) {
            createReqDto.setParent(null);
        } else {
            Comment parentComment = commentRepository.findById(parentId)
                    .orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_PARENT_COMMENT));

            createReqDto.setParent(parentComment);
        }

        Comment comment = commentRepository.save(createReqDto.toEntity());

        return new CreateDto.Res(comment);
    }

    // 포스팅의 댓글들 조회하기
    @Transactional(readOnly = true)
    public List<FindAllInPost.Res> findAllInPost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new CustomException(ExceptionCode.NOT_FOUND_POST);
        } else {
            List<Comment> comments = commentRepository.findAllInPost(postId);

            // 부모댓글 필터링
            List<Comment> filterdComments = comments.stream()
                    .filter(comment -> comment.getParent() == null)
                    .collect(Collectors.toList());

            List<FindAllInPost.Res> allCommentsInPost = filterdComments.stream()
                    .map(comment -> new FindAllInPost.Res(comment))
                    .collect(Collectors.toList());

            return allCommentsInPost;
        }

    }

    @Transactional
    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
