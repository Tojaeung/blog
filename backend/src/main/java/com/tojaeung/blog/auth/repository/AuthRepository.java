package com.tojaeung.blog.auth.repository;

import com.tojaeung.blog.auth.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Admin, Long> {

	Optional<Admin> findByUsername(String username);
}
