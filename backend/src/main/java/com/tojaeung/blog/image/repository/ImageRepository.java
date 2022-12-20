package com.tojaeung.blog.image.repository;

import com.tojaeung.blog.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
