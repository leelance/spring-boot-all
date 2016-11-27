# spring-boot-jpa-querydsl, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [spring-data-jpa](http://docs.spring.io/spring-data/jpa/docs/1.10.5.RELEASE/reference/html/)
* [hibernate5](http://hibernate.org/orm/)
* [QueryDSL](http://www.querydsl.com/)


> * 项目启动后输入：http://localhost/

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-jpa-querydsl/querydsl.jpg)

```xml
<hibernate.version>5.2.4.Final</hibernate.version>
<!-- QueryDSL -->
<dependency>
	<groupId>com.querydsl</groupId>
	<artifactId>querydsl-core</artifactId>
</dependency>
<dependency>
	<groupId>com.querydsl</groupId>
	<artifactId>querydsl-jpa</artifactId>
</dependency>
```

QueryDSL 
```java
public List<CityEntity> findAll(String hotelName) {
	QCityEntity cityEntity = QCityEntity.cityEntity;
	JPAQuery<CityEntity>query = new JPAQuery<>(em);
	BooleanExpression express = cityEntity.state.eq("1");

	if(StringUtils.hasText(hotelName)) {
		express = express.and(cityEntity.hotels.any().name.likeIgnoreCase('%'+hotelName+'%'));
	}
	return query.select(cityEntity).from(cityEntity).where(express).fetch();
}
```

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=Spring-boot-JPA-QueryDSL.v1.1
spring.application.name=Spring-boot-JPA-QueryDSL

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
	
	@OneToMany(mappedBy="city", cascade=CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval=true)
	private Set<HotelEntity>hotels = new HashSet<>();
	//get/set Method
}
```

SQL
```xml
-- ----------------------------
-- Records of t_city
-- ----------------------------
INSERT INTO `t_city` VALUES ('2', 'China', 'China.ShangHai', 'ShangHai', '1');
INSERT INTO `t_city` VALUES ('3', 'China', 'China.NanJing', 'NanJing', '1');
INSERT INTO `t_city` VALUES ('4', 'China', 'China.BeiJing', 'BeiJing', '1');
INSERT INTO `t_city` VALUES ('5', 'China', 'China.GuangDong', 'GuangDong', '1');
INSERT INTO `t_city` VALUES ('6', 'China', 'China.ShanDong', 'ShangDong', '0');
-- ----------------------------
-- Records of t_hotel
-- ----------------------------
INSERT INTO `t_hotel` VALUES ('1', 'ShangHai.HutaiLu', 'Seven.Day', '2');
INSERT INTO `t_hotel` VALUES ('2', 'ShangHai.HongQiao', 'MoTai', '2');
INSERT INTO `t_hotel` VALUES ('3', 'ShangHai.JiangXi', 'HanTing', '2');
INSERT INTO `t_hotel` VALUES ('4', 'ShangHai.RenMin', 'Eight.Day', '2');
INSERT INTO `t_hotel` VALUES ('5', 'ShangHai', 'Nine.Day', '2');
INSERT INTO `t_hotel` VALUES ('8', 'BeiJing', 'Seven.Day', '3');
INSERT INTO `t_hotel` VALUES ('9', 'BeiJing', 'Nine.Day', '3');
INSERT INTO `t_hotel` VALUES ('10', 'NanJing', 'MoTai', '4');
INSERT INTO `t_hotel` VALUES ('11', 'NanJing', 'HanTing', '4');
INSERT INTO `t_hotel` VALUES ('12', 'GuangDong', 'Nine.Day', '5');
INSERT INTO `t_hotel` VALUES ('13', 'GuangDong', 'Eight.Day', '5');
```
