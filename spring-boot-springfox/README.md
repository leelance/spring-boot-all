# spring-boot-springfox, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Springfox](http://springfox.github.io/springfox/)
* [Swagger](http://swagger.io/)

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-springfox/spring-boot-springfox.jpg)

> * 项目启动后输入：http://localhost/swagger-ui.html

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=SpringBootSpringfox.v1.1
spring.application.name=SpringBootSpringfox

#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

security.basic.enabled=false
management.security.enabled=false

#MVC
spring.mvc.view.prefix=/WEB-INF/views/

security.basic.enabled=false
management.security.enabled=false

#LOG
logging.config=classpath:log4j2.xml
```
configuration
```java
@Configuration  
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket adminApi(){
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("Admin API")
				.forCodeGeneration(true)
				.pathMapping("/")
				.select()
				.paths(paths())
				.build()
				.apiInfo(apiInfo())
				.useDefaultResponseMessages(false);
	}
	
	private Predicate<String> paths(){
		return Predicates.and(PathSelectors.regex("/.*"), Predicates.not(PathSelectors.regex("/error")));
	}
	
	
	private ApiInfo apiInfo(){
		Contact contact = new Contact("lance", "https://github.com/leelance", "81222045@qq.com");
		return new ApiInfoBuilder()
				.title("Document Api")
				.description("Spring-boot-Springfox Example")
				.license("Apache License Version 2.0")
				.contact(contact)
				.version("2.0")
				.build();
	}
}
```
SimpleApplication
```java
@SpringBootApplication
public class SimpleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
```
