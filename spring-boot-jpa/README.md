# spring-boot-jpa, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)


> * 项目启动后输入：http://localhost/

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Spring-boot-Jpa.v1.1
spring.application.name=Spring-boot-JPA

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

spring.jpa.properties.hibernate.hbm2ddl.auto=update
```
Entity
```java
@Entity
@Table(name="t_teacher")
public class Teacher implements Serializable {
	private static final long serialVersionUID = 9181998751400657281L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String name;
	
	private String sex;
	
	@JSONField(format="yyyy-MM-dd")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createTime;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="t_teacher_student")
	private Set<Student> students = new HashSet<Student>();
}
public interface TeacherRepository extends JpaRepository<Teacher, Integer>{

	/**
	 * findByName
	 * @param name
	 * @return
	 */
	List<Teacher>findByName(String name);
}
```
SimpleApplication
```java
@SpringBootApplication
public class SimpleApplication {

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

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
```
