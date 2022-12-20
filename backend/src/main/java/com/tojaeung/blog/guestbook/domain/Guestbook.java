package com.tojaeung.blog.guestbook.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Guestbook {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "guestbook_id")
	private Long id;

	@Column
	private String author;

	@Column
	private String content;

	@Column
	private Boolean isAdmin;

	@CreatedDate
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDate createdAt;
	@LastModifiedDate
	@Column(name = "last_modified_at", nullable = false)
	private LocalDate lastModifiedAt;
}
