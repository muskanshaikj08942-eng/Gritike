
package com.gritike.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // BCrypt password encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF because we are using REST APIs
            .csrf(csrf -> csrf.disable())

            // We are not using Spring Security form login
            .formLogin(form -> form.disable())

            // We are not using HTTP Basic authentication
            .httpBasic(basic -> basic.disable())

            // No server-side login session
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // API access rules
            .authorizeHttpRequests(auth -> auth

                // Login and registration are public
                .requestMatchers("/api/auth/**").permitAll()

                // Products are public
                .requestMatchers("/api/products/**").permitAll()

                // Current application routes are public
                .anyRequest().permitAll()
            );

        return http.build();
    }
}

