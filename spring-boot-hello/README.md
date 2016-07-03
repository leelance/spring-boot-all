# spring-boot-hello, 依赖spring-boot-parent,集成log4j2
```java
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {
	public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}

```
###application.properties
```properties
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Hello.v1.1
spring.application.name=Hello Boot

#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

#MVC
spring.mvc.view.prefix=/WEB-INF/views/

#LOG
logging.config=classpath:log4j2.xml
```
