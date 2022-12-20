package com.tojaeung.blog.post.dto;

import lombok.Getter;

import java.util.Collections;
import java.util.List;

// 페이지네이션을 위한 totalCount를 프론트에 보내주기 위한 dto
@Getter
public class PageResDto {
	private long totalCnt;
	private List<PostResDto> posts;

	public PageResDto(long totalCnt, List<PostResDto> posts) {
		this.totalCnt = totalCnt;

		// 포스팅 생성날짜 오름차순으로 정렬
		Collections.sort(posts, (p1, p2) -> {
			if (p1.getCreatedAt().isBefore(p2.getCreatedAt()))
				return 1;
			return -1;
		});
		this.posts = posts;
	}
}
