package com.lance.mq.consumer;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class SimpleApplication {
	static Logger logger = LogManager.getLogger();

	public static void main(String[] args) {
		ConfigurableApplicationContext content = SpringApplication.run(SimpleApplication.class, args);
		
		//Test Bean
		String[]beanNames = content.getBeanDefinitionNames();
		for(String name: beanNames) {
			logger.info("beanName: {}", name);
		}
	}
}
