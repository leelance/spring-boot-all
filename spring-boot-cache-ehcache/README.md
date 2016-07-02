# spring-boot-cache-ehcache, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Ehcache2.10.*](http://www.ehcache.org/generated/2.10.2/html/ehc-all/)

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
	<groupId>net.sf.ehcache</groupId>
	<artifactId>ehcache</artifactId>
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

spring.cache.type=ehcache
spring.cache.ehcache.config=classpath:ehcache.xml
```
