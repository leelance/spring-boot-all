package com.lance.querydsl.config;

import javax.persistence.EntityManagerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class WebMVCConfig {

	 @Bean
     public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
         return new JpaTransactionManager(entityManagerFactory);
     }	
}
