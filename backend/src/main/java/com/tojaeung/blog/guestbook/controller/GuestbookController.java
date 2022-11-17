package com.tojaeung.blog.guestbook.controller;

import com.tojaeung.blog.guestbook.dto.CreateReqDto;
import com.tojaeung.blog.guestbook.dto.GuestbookResDto;
import com.tojaeung.blog.guestbook.service.GuestbookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GuestbookController {
    private final GuestbookService guestbookService;

    // 방명록 새로 생성
    @PostMapping("api/guestbook")
    public ResponseEntity<GuestbookResDto> create(
            @Valid @RequestBody CreateReqDto createReqDto) {

        GuestbookResDto newGuestBook = guestbookService.create(createReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(newGuestBook);
    }

    // 방명록 가져오기
    @GetMapping("api/guestbook")
    public ResponseEntity<List<GuestbookResDto>> findAllGuestbooks() {

        return ResponseEntity.ok(guestbookService.findAllGuestBooks());
    }

    // 방명록 삭제
    @DeleteMapping("admin/guestbook/{guestbookId}")
    public ResponseEntity<Long> delete(@PathVariable Long guestbookId) {
        guestbookService.delete(guestbookId);

        return ResponseEntity.ok(guestbookId);
    }
}
