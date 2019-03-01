package com.lance.sharding;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ShardingApplication
 * @author lance
 * @since 2019.3.1 22:57
 */
@SpringBootApplication
@MapperScan("com.lance.sharding.mapper")
public class ShardingApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShardingApplication.class, args);
    }

}
