package com.masterrad.schoolbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;


@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * /myAccount - Secured /myBalance - Secured /myLoans - Secured /myCards -
     * Secured /notices - Not Secured /contact - Not Secured
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new KeycloakRoleConverter());

        http.cors().configurationSource(new CorsConfigurationSource() {
            @Override public CorsConfiguration getCorsConfiguration(HttpServletRequest
                                                                            request) { CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://skola.test:4401"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L); return config;
            }
        }).and()
                .authorizeRequests()
                .antMatchers("/api/students").permitAll()
                .antMatchers("/api/professors").permitAll()
                .antMatchers("/api/courses").permitAll()
                .antMatchers("/api/professors/{professorId}").permitAll()
                .antMatchers("/api/students/{studentId}").permitAll()
                .antMatchers("/api/courses/{courseId}").permitAll()
//                .antMatchers("/api/students").hasAnyRole("ADMIN", "PROFESSOR")
//                .antMatchers("/api/professors").hasAnyRole("ADMIN")
//                .antMatchers("/api/courses").authenticated()
                .antMatchers("/myCards").hasAnyRole("USER", "ADMIN")
                .antMatchers("/notices").permitAll()
                .antMatchers("/contact").permitAll()
                .and().csrf().disable()
                .oauth2ResourceServer().jwt().jwtAuthenticationConverter(jwtAuthenticationConverter);

//nf industry standards kada implementiras oauth tako da ne treba crsf
        /**
         * This configuration is needed to view the /h2-console with out any issues.
         * Since H2 Console uses frames to display the UI, we need to allow the frames.
         * Otherwise since by default Spring Security consider X-Frame-Options: DENY
         * to avoid Clickjacking attacks, the /h2-console will not work properly.
         * More details can be found at
         * https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/headers.html#headers-frame-options
         */
        http.headers().frameOptions().sameOrigin();

    }

}

