package com.tojaeung.blog.tag.service;

import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.post.dto.PageResDto;
import com.tojaeung.blog.post.dto.PostResDto;
import com.tojaeung.blog.post.repository.PostRepository;
import com.tojaeung.blog.tag.domain.Tag;
import com.tojaeung.blog.tag.dto.AllTagResDto;
import com.tojaeung.blog.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
	private final TagRepository tagRepository;
	private final PostRepository postRepository;

	@Transactional(readOnly = true)
	public List<String> searchTagName(String tagName) {
		return tagRepository.searchTagName(tagName);
	}

	@Transactional(readOnly = true)
	public List<AllTagResDto> findAllTags() {
		// 중복된 태그이름을 제거하기 위해 모든 태그이름들만 가져왔다.
		List<String> allTagNames = tagRepository.findAllTags();

		// 프론트에서 list key에 id를 집어넣기 위해 UUID를 id에 인위적으로 넣어준다.
		List<AllTagResDto> allTagResDtos = allTagNames.stream()
				.map(tagName -> new AllTagResDto(UUID.randomUUID(), tagName))
				.collect(Collectors.toList());

		return allTagResDtos;
	}

	@Transactional(readOnly = true)
	public PageResDto findPostsInTag(String tagName, Pageable pageable) {
		if (!tagRepository.existsByName(tagName))
			throw new CustomException(ExceptionCode.NOT_FOUND_TAG);

		int pageNumber = pageable.getPageNumber();
		PageRequest pageRequest = PageRequest.of(
				pageNumber - 1,
				pageable.getPageSize()
		// Sort.by("createdAt").descending()
		);

		Page<Tag> pages = tagRepository.findPostsInTag(tagName, pageRequest);

		long totalCnt = pages.getTotalElements();

		// tag.post에서 post를 추출해서 PostResDto로 반환
		List<PostResDto> postsInTag = pages.getContent().stream()
				.map(tag -> new PostResDto(tag.getPost()))
				.collect(Collectors.toList());

		return new PageResDto(totalCnt, postsInTag);

	}

	@Transactional
	public void update(Long tagId, String updatedTagName) {
		Tag findTag = tagRepository.findById(tagId)
				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_FOUND_TAG));

		if (tagRepository.existsByName(updatedTagName))
			throw new CustomException(ExceptionCode.ALREADY_EXISTING_TAG);

		// 벌크성 수정 쿼리
		tagRepository.updateTagName(findTag.getName(), updatedTagName);
	}

	@Transactional
	public void delete(Long postId, Long tagId) {
		if (!postRepository.existsById(postId))
			throw new CustomException(ExceptionCode.NOT_FOUND_POST);
		if (!tagRepository.existsById(tagId))
			throw new CustomException(ExceptionCode.NOT_FOUND_TAG);

		tagRepository.deleteById(tagId);
	}
}
