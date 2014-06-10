package com.lance.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableAutoConfiguration
@ComponentScan("com.lance")
@EntityScan("com.lance.entity")
@EnableJpaRepositories("com.lance.repository")
public class WebAppConfig extends WebMvcConfigurerAdapter{
    
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WebAppConfig.class);
	}
	
    public static void main(String[] args) {
		SpringApplication.run(WebAppConfig.class, args);
	} 
    
    /**
     * 配置拦截器
     * @author lance
     * @param registry
     */
    public void addInterceptors(InterceptorRegistry registry) {
    	registry.addInterceptor(new UserSecurityInterceptor()).addPathPatterns("/user/**");
	}
}
