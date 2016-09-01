# spring-boot-sitemesh, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [EasyUi](http://www.jeasyui.net/)
* [SiteMesh](http://wiki.sitemesh.org/wiki/display/sitemesh3/Getting+Started+with+SiteMesh+3)

```xml
<dependency>
	<groupId>org.sitemesh</groupId>
	<artifactId>sitemesh</artifactId>
	<version>3.0.1</version>
</dependency>
```

```java
public class WebSiteMeshFilter extends ConfigurableSiteMeshFilter{

	@Override
	protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {
		builder.addDecoratorPath("/admin/*", "/admin/index")
			   .addExcludedPath("/admin/index")
			   .addExcludedPath("/plugin/*");
	}
}

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter{
	/**
	 * 装饰器
	 * @return
	 * 2016年8月27日下午12:37:20
	 */
	@Bean
	public FilterRegistrationBean siteMeshFilter(){
		FilterRegistrationBean fitler = new FilterRegistrationBean();
		WebSiteMeshFilter siteMeshFilter = new WebSiteMeshFilter();
		fitler.setFilter(siteMeshFilter);
		return fitler;
	}
}
```
###application.properties
```properties
#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

security.basic.enabled=false
management.security.enabled=false

#MVC
spring.mvc.view.prefix=/WEB-INF/views/
spring.resources.static-locations=classpath:/static/

security.basic.enabled=false
management.security.enabled=false

#LOG
logging.config=classpath:log4j2.xml
```
