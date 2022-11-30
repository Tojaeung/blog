package com.tojaeung.blog.config;

import com.tojaeung.blog.auth.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()  // Bearer 토큰을 사용한다.
                .formLogin().disable()
                .csrf().disable()
                .cors()

                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("api/admin/**").authenticated()
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // enable h2-console
                .headers()
                .frameOptions()
                .sameOrigin()

                // .exceptionHandling()
                // .authenticationEntryPoint(jwtAuthenticationEntryPoint)  // 인증을 받지 않은 상태에서 요청시 발생
                // .accessDeniedHandler(jwtAccessDeniedHandler) // 권한 사용을 하기 떄문에 주석처리

                // 세션을 사용하지 않는다.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(
                "/h2-console/**"
                , "/favicon.ico"
                , "/error");
    }
}
