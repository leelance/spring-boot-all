package com.lance.email;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SimpleApplication {
	
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(SimpleApplication.class, args);
		
		String[]beanNames = context.getBeanDefinitionNames();
		for(String beanName: beanNames) {
			System.out.println("BeanName: " + beanName);
		}
	}
}
