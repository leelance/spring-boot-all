# spring-boot-freemarker, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [freemarker](http://freemarker.org/)

> * http://localhost/system/login展示后台发布新闻列表
> * http://localhost/前端Freemark模板展示
> * 中间用到了Mysql, Mybatis, druid;可以参考spring-boot相关的demo

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

```java
@SpringBootApplication
@MapperScan(basePackages="com.lance.freemaker.mapper")
public class SimpleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter{

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new AdminInterceptor()).addPathPatterns("/system/admin/**");
	}
}

```
###application.properties
```properties
# FREEMARKER (FreeMarkerAutoConfiguration)
spring.freemarker.allow-request-override=false
spring.freemarker.allow-session-override=false
spring.freemarker.cache=true
spring.freemarker.charset=UTF-8
spring.freemarker.check-template-location=true
spring.freemarker.content-type=text/html
spring.freemarker.enabled=true
spring.freemarker.expose-request-attributes=false
spring.freemarker.expose-session-attributes=false
spring.freemarker.expose-spring-macro-helpers=true
spring.freemarker.prefer-file-system-access=true
spring.freemarker.suffix=.ftl
spring.freemarker.template-loader-path=classpath:/templates/
spring.freemarker.settings.template_update_delay=0
spring.freemarker.settings.default_encoding=UTF-8
spring.freemarker.settings.classic_compatible=true
spring.freemarker.order=1
```
