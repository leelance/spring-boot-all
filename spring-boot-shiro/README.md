# spring-boot-shiro, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [mybatis](https://github.com/mybatis/spring-boot-starter)
* [druid](https://github.com/alibaba/druid)
* [shiro](http://shiro.apache.org/)

> * 项目启动后输入：http://localhost/
> * 该项目中, 增加了对url的拦截[URLPermissionsFilter](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-shiro/src/main/java/com/lance/shiro/config/URLPermissionsFilter.java)，
> * 用admin/123456,拥有index权限reports未任何权限, lance/123456尚未分配任何权限.
> * 参考[schema.sql](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-shiro/src/main/resources/init-sql/schema.sql)
> * springmvc-shiro采用xml配置, 参考[demo-springmvc-shiro](https://github.com/leelance/demo/tree/master/demo-springmvc-shiro)

Add dependencies to pom
```xml
<shiro.version>1.2.5</shiro.version>
<dependency>
	<groupId>org.apache.shiro</groupId>
	<artifactId>shiro-core</artifactId>
	<version>${shiro.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.shiro</groupId>
	<artifactId>shiro-web</artifactId>
	<version>${shiro.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.shiro</groupId>
	<artifactId>shiro-ehcache</artifactId>
	<version>${shiro.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.shiro</groupId>
	<artifactId>shiro-spring</artifactId>
	<version>${shiro.version}</version>
</dependency>
```
application.properties
```
#MYBATIS
mybatis.type-aliases-package=com.lance.mybatis.domain
mybatis.mapper-locations=classpath*:/mapper/*Mapper.xml
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.configuration.default-fetch-size=100
mybatis.configuration.default-statement-timeout=30

spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.url=jdbc:mysql://localhost/demo-schema
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

# see https://github.com/alibaba/druid
spring.datasource.initialSize=5
spring.datasource.minIdle=5
spring.datasource.maxActive=20
spring.datasource.maxWait=60000
spring.datasource.timeBetweenEvictionRunsMillis=60000
spring.datasource.validationQuery=SELECT 1
spring.datasource.testWhileIdle=true
spring.datasource.testOnBorrow=false
spring.datasource.testOnReturn=false
spring.datasource.poolPreparedStatements=true
spring.datasource.maxPoolPreparedStatementPerConnectionSize=20
spring.datasource.filters=stat,wall
spring.datasource.connectionProperties=druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
```
Shiro configuration
```java
@Configuration
public class ShiroConfig {
	
	/**
	 * FilterRegistrationBean
	 * @return
	 */
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter")); 
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*"); 
        filterRegistration.setDispatcherTypes(DispatcherType.REQUEST);
        return filterRegistration;
	}
	
	/**
	 * @see org.apache.shiro.spring.web.ShiroFilterFactoryBean
	 * @return
	 */
	@Bean(name = "shiroFilter")
	public ShiroFilterFactoryBean shiroFilter(){
		ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
		bean.setSecurityManager(securityManager());
		bean.setLoginUrl("/login");
		bean.setUnauthorizedUrl("/unauthor");
		
		Map<String, Filter>filters = Maps.newHashMap();
		filters.put("perms", urlPermissionsFilter());
		filters.put("anon", new AnonymousFilter());
		bean.setFilters(filters);
		
		Map<String, String> chains = Maps.newHashMap();
		chains.put("/login", "anon");
		chains.put("/unauthor", "anon");
		chains.put("/logout", "logout");
		chains.put("/base/**", "anon");
		chains.put("/css/**", "anon");
		chains.put("/layer/**", "anon");
		chains.put("/**", "authc,perms");
		bean.setFilterChainDefinitionMap(chains);
		return bean;
	}
	
	/**
	 * @see org.apache.shiro.mgt.SecurityManager
	 * @return
	 */
	@Bean(name="securityManager")
	public DefaultWebSecurityManager securityManager() {
		DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
		manager.setRealm(userRealm());
		manager.setCacheManager(cacheManager());
		manager.setSessionManager(defaultWebSessionManager());
		return manager;
	}
	
	/**
	 * @see DefaultWebSessionManager
	 * @return
	 */
	@Bean(name="sessionManager")
	public DefaultWebSessionManager defaultWebSessionManager() {
		DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
		sessionManager.setCacheManager(cacheManager());
		sessionManager.setGlobalSessionTimeout(1800000);
		sessionManager.setDeleteInvalidSessions(true);
		sessionManager.setSessionValidationSchedulerEnabled(true);
		sessionManager.setDeleteInvalidSessions(true);
		return sessionManager;
	}
	
	/**
	 * @see UserRealm--->AuthorizingRealm
	 * @return
	 */
	@Bean
	@DependsOn(value="lifecycleBeanPostProcessor")
	public UserRealm userRealm() {
		UserRealm userRealm = new UserRealm();
		userRealm.setCacheManager(cacheManager());
		return userRealm;
	}
	
	@Bean
	public URLPermissionsFilter urlPermissionsFilter() {
		return new URLPermissionsFilter();
	}
	
	@Bean
	public EhCacheManager cacheManager() {
		EhCacheManager cacheManager = new EhCacheManager();
		cacheManager.setCacheManagerConfigFile("classpath:ehcache.xml");
		return cacheManager;
	}
	
	@Bean
	public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
		return new LifecycleBeanPostProcessor();
	}
}
```
