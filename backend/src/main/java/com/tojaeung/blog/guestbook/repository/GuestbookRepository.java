package com.tojaeung.blog.guestbook.repository;

import com.tojaeung.blog.guestbook.domain.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {

    @Query("select g from Guestbook g " +
            "order by g.createdAt asc ")
    List<Guestbook> findAllGuestbooks();

}
