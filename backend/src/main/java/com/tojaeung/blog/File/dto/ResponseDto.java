package com.tojaeung.blog.File.dto;

import lombok.Getter;

@Getter
public class ResponseDto {
    private Long fileId;
    private String imageUrl;

    public ResponseDto(Long fileId, String imageUrl) {
        this.fileId = fileId;
        this.imageUrl = imageUrl;
    }
}
