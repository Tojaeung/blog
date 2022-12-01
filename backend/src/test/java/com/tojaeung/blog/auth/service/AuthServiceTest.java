package com.tojaeung.blog.auth.service;

import com.tojaeung.blog.auth.domain.Admin;
import com.tojaeung.blog.auth.dto.AuthResponseDto;
import com.tojaeung.blog.auth.jwt.JwtTokenProvider;
import com.tojaeung.blog.auth.repository.AuthRepository;
import com.tojaeung.blog.exception.CustomException;
import com.tojaeung.blog.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @InjectMocks
    private AuthService authService;

    @Mock
    private AuthRepository authRepository;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("존재하지 않는 관리자 ID로 로그인 하는경우")
    void unExistingAdminId_then_login() {
        Admin admin = new Admin("이상한ID", "1234");

        BDDMockito.given(authRepository.findByUsername(admin.getUsername())).willReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(admin))
                .isInstanceOf(CustomException.class)
                .extracting("exceptionCode")
                .isEqualTo(ExceptionCode.INVALID_ADMIN_USERNAME);
    }

    @Test
    @DisplayName("올바르지 않는 비밀번호로 로그인 하는경우")
    void invalidAdminPassword_then_login() {
        Admin admin = new Admin("이상한ID", "1234");

        BDDMockito.given(authRepository.findByUsername(admin.getUsername())).willReturn(Optional.of(admin));
        BDDMockito.given(admin.checkPassword(admin.getPassword(), passwordEncoder)).willReturn(false);

        assertThatThrownBy(() -> authService.login(admin))
                .isInstanceOf(CustomException.class)
                .extracting("exceptionCode")
                .isEqualTo(ExceptionCode.INVALID_ADMIN_PASSWORD);
    }

    @Test
    @DisplayName("로그인에 성공하는 경우")
    void login_then_success() {
        Admin admin = new Admin("올바른ID", "올바른Password");

        BDDMockito.given(authRepository.findByUsername(admin.getUsername())).willReturn(Optional.of(admin));
        BDDMockito.given(admin.checkPassword(admin.getPassword(), passwordEncoder)).willReturn(true);
        BDDMockito.given(jwtTokenProvider.createAccessToken(admin.getUsername(), admin.getRoles())).willReturn("엑세스토큰발급");

        AuthResponseDto authResponseDto = authService.login(admin);

        assertThat(authResponseDto.getAccessToken()).isEqualTo("엑세스토큰발급");
        assertThat(authResponseDto.getUsername()).isEqualTo("올바른ID");
    }
}
