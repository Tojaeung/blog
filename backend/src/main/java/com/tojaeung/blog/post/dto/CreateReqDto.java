package com.tojaeung.blog.post.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateDto {

    @NotBlank(message = "포스팅 제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "포스팅 내용을 입력해주세요.")
    private String content;
    @NotBlank(message = "썸네일을 추가해주세요.")
    private MultipartFile thumbnail;

    public CreateDto(String title, String content, MultipartFile thumbnail) {
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
    }
}
