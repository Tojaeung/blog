package com.tojaeung.blog.post.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateReqDto {

    @NotBlank(message = "포스팅 제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "포스팅 내용을 입력해주세요.")
    private String content;
    @NotNull
    @Size(min = 1)
    private List<String> tags;
}
