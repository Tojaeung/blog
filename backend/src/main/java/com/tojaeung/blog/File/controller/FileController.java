package com.tojaeung.blog.File.controller;

import com.tojaeung.blog.File.dto.ResponseDto;
import com.tojaeung.blog.File.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileService fileService;

    // 포스팅 내 이미지 업로드
    @PostMapping("admin/post/upload")
    public ResponseEntity<ResponseDto> upload(
            @RequestParam("file") MultipartFile multipartFile) {

        return ResponseEntity.status(HttpStatus.CREATED).body(fileService.upload(multipartFile));
    }
}
