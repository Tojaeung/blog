package com.tojaeung.blog.auth.dto;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RefreshResponseDto {
    private String accessToken;
    private String username;
}
