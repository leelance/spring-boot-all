# spring-boot-hibernate5, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [spring-data-jpa](http://docs.spring.io/spring-data/jpa/docs/1.10.5.RELEASE/reference/html/)
* [hibernate5](http://hibernate.org/orm/)


> * 项目启动后输入：http://localhost/

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-hibernate5/demo.jpg)

```xml
<hibernate.version>5.2.4.Final</hibernate.version>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-jpa</artifactId>
	<exclusions>
		<exclusion>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-entitymanager</artifactId>
		</exclusion>
	</exclusions>
</dependency>
<!-- MYSQL -->
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
</dependency>
```

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Spring-boot-Hibernate.v1.1
spring.application.name=Spring-boot-Hibernate

#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

security.basic.enabled=false
management.security.enabled=false

#MVC
spring.mvc.view.prefix=/WEB-INF/views/

#LOG
logging.config=classpath:log4j2.xml

spring.datasource.url=jdbc:mysql://localhost/demo-schema
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

# JPA (JpaBaseConfiguration, HibernateJpaAutoConfiguration)
spring.data.jpa.repositories.enabled=true
spring.jpa.generate-ddl=false
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=true 
spring.jpa.show-sql=true
```
Entity
```java
@Entity
@Table(name="t_city")
public class CityEntity implements Serializable {
	private static final long serialVersionUID = -2451005683000059023L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String name;

	private String state;

	private String country;

	private String map;
	//get/set Method
}
```
SimpleApplication
```java
@SpringBootApplication
public class SimpleApplication extends SpringBootServletInitializer{
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SimpleApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
```
