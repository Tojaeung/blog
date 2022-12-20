package com.tojaeung.blog.image.domain;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "image_id")
	private Long id;

	@Column
	private String originalName; // 원래 파일이름

	@Column
	private String savedName; // UUID + 확장자 (실질적인 파일이름)

	@Column
	private String savedPath; // 파일 저장경로
}
