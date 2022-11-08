package com.tojaeung.blog.File.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tojaeung.blog.File.domain.File;
import com.tojaeung.blog.File.dto.ResponseDto;
import com.tojaeung.blog.File.repository.FileRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final FileRepository fileRepository;
    private final AmazonS3Client amazonS3Client;

    // 포스팅 생성
    @Transactional
    public ResponseDto upload(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            return null;
        }
        String originalName = multipartFile.getOriginalFilename();
        // 파일 이름으로 쓸 uuid 생성
        String uuid = UUID.randomUUID().toString();

        // 확장자 추출(ex : .png)
        String extension = originalName.substring(originalName.lastIndexOf("."));

        // uuid와 확장자 결합
        String savedName = uuid + extension;

        // 파일을 불러올 때 사용할 파일 경로
        String savedPath = "https://" + bucket + ".s3.ap-northeast-2.amazonaws.com/" + savedName;

        // 파일 엔티티 생성
        File file = File.builder()
                .originalName(originalName)
                .savedName(savedName)
                .savedPath(savedPath)
                .build();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, savedName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new CustomException(ExceptionCode.FAILED_IMAGE_UPLOAD);
        }

        // 데이터베이스에 파일 정보 저장 
        File newFile = fileRepository.save(file);

        return new ResponseDto(newFile.getId(), newFile.getSavedPath());
    }
}
