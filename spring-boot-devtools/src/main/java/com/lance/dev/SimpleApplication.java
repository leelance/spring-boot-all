package com.lance.dev;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SimpleApplication {
	
	/**
	 * 通过修改打印检测项目重新加载线程变化
	 */
	@PostConstruct
	public void init() {
		System.out.println("************init method*********");
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
