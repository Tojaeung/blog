package com.tojaeung.blog.guestbook.service;

import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import com.tojaeung.blog.guestbook.domain.Guestbook;
import com.tojaeung.blog.guestbook.dto.CreateReqDto;
import com.tojaeung.blog.guestbook.dto.GuestbookResDto;
import com.tojaeung.blog.guestbook.repository.GuestbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuestbookService {
	private final GuestbookRepository guestbookRepository;

	// 방명록 생성
	@Transactional
	public GuestbookResDto create(CreateReqDto createReqDto) {

		Guestbook guestbook = Guestbook.builder()
				.author(createReqDto.getAuthor())
				.content(createReqDto.getContent())
				.isAdmin(createReqDto.getIsAdmin())
				.build();

		Guestbook savedGuestbook = guestbookRepository.save(guestbook);

		return new GuestbookResDto(savedGuestbook);
	}

	// 포스팅의 댓글들 조회하기

	@Transactional(readOnly = true)
	public List<GuestbookResDto> findAllGuestBooks() {

		List<Guestbook> findGuestbooks = guestbookRepository.findAllGuestbooks();

		List<GuestbookResDto> allGuestbooks = findGuestbooks.stream()
				.map(guestbook -> new GuestbookResDto(guestbook))
				.collect(Collectors.toList());

		return allGuestbooks;
	}

	@Transactional
	public void delete(Long guestbookId) {
		if (!guestbookRepository.existsById(guestbookId)) {
			throw new CustomException(ExceptionCode.NOT_FOUND_GUESTBOOK);
		}
		guestbookRepository.deleteById(guestbookId);
	}
}
