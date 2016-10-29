# spring-boot-welcome-page, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)


> * 项目启动后输入：http://localhost/

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=SpringBootWelcome.v1.1
spring.application.name=SpringBootWelcome

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

```java
@Configuration
public class WebMvcConfigure extends WebMvcConfigurerAdapter{

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.jsp");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
		super.addViewControllers(registry);
	}

}
Or
@Bean
public EmbeddedServletContainerFactory servletContainer() {
	TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory();
	TomcatContextCustomizer contextCustomizer = new TomcatContextCustomizer() {
		@Override
		public void customize(Context context) {
			context.addWelcomeFile("index.jsp");
			context.setWebappVersion("3.1");
		}
	};
	factory.addContextCustomizers(contextCustomizer);
	return factory;
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
