package com.tojaeung.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Value("${cors-allowed-origin}")
    private String corsAllowedOrigin;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);  // 쿠리를 요청으로 보내는 유무
        config.addAllowedOrigin(corsAllowedOrigin);   // 요청받을 주소
        config.addAllowedHeader("*");   // 요청받을 헤더
        config.addAllowedMethod("*");   // 요청받을 메서드

        source.registerCorsConfiguration("/api/**", config);
        source.registerCorsConfiguration("/admin/**", config);
        return new CorsFilter(source);
    }
}
