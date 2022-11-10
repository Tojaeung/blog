package com.tojaeung.blog.File.service;

import com.tojaeung.blog.File.domain.File;
import com.tojaeung.blog.File.dto.ResponseDto;
import com.tojaeung.blog.File.repository.FileRepository;
import com.tojaeung.blog.File.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final FileUtil fileUtil;

    // 포스팅 생성
    @Transactional
    public ResponseDto upload(MultipartFile multipartFile) {
        

        // 파일 aws S3에 저장
        File file = fileUtil.saveToAwsS3(multipartFile);

        // 데이터베이스에 파일 정보 저장 
        File newFile = fileRepository.save(file);

        return new ResponseDto(newFile.getId(), newFile.getSavedPath());
    }
}
