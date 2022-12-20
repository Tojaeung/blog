package com.tojaeung.blog.tag.domain;

import com.tojaeung.blog.post.domain.Post;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "tag_id")
	private Long id;

	@Column
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;
}
