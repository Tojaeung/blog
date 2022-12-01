package com.tojaeung.blog.image.service;

import com.tojaeung.blog.image.domain.Image;
import com.tojaeung.blog.image.dto.ImageResponseDto;
import com.tojaeung.blog.image.repository.ImageRepository;
import com.tojaeung.blog.image.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    private final ImageUtil imageUtil;

    @Transactional
    public ImageResponseDto upload(MultipartFile multipartFile) {
        // 파일 aws S3에 저장
        Image image = imageUtil.saveToAwsS3(multipartFile);

        Image newImage = imageRepository.save(image);

        return new ImageResponseDto(newImage.getId(), newImage.getSavedPath());
    }
}
