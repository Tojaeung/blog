package com.tojaeung.blog.auth.repository;

import com.tojaeung.blog.auth.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByUsername(String username);
}
