# spring-boot-cache-redis, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [redis](http://redis.io/)
* [jedis](https://github.com/xetorthio/jedis)

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-redis</artifactId>
</dependency>
<dependency>
	<groupId>redis.clients</groupId>
	<artifactId>jedis</artifactId>
</dependency>
```

```java
@EnableCaching
@EnableScheduling
@SpringBootApplication
public class SimpleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}

@Component
@CacheConfig(cacheNames="CityService")
public class CityService {
	Logger logger = LogManager.getLogger(getClass());

	@Cacheable
	public CityInfo getCity(int id, String city) {
		logger.info("id: {}, city: {}", id, city);
		return new CityInfo(id, city);
	}
}
```
###application.properties
```properties
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Cache.v1.1
spring.application.name=Cache Boot

#Server
server.port=80

#LOG
logging.config=classpath:log4j2.xml

# REDIS (RedisProperties)
spring.redis.database=4
spring.redis.host=127.0.0.1
spring.redis.password=123456
spring.redis.pool.max-active=8
spring.redis.pool.max-idle=8
spring.redis.pool.max-wait=-1
spring.redis.pool.min-idle=0
spring.redis.port=6379
spring.redis.timeout=0
```
