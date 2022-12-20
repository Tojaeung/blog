package com.tojaeung.blog.guestbook.dto;

import com.tojaeung.blog.guestbook.domain.Guestbook;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class GuestbookResDto {
	private Long id;
	private String author;
	private String content;
	private Boolean isAdmin;
	private LocalDate createdAt, lastModifiedAt;

	public GuestbookResDto(Guestbook guestbook) {
		this.id = guestbook.getId();
		this.author = guestbook.getAuthor();
		this.content = guestbook.getContent();
		this.isAdmin = guestbook.getIsAdmin();
		this.createdAt = guestbook.getCreatedAt();
		this.lastModifiedAt = guestbook.getLastModifiedAt();
	}
}
