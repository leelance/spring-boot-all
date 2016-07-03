# spring-boot-shiro, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [mybatis](https://github.com/mybatis/spring-boot-starter)
* [druid](https://github.com/alibaba/druid)
* [shiro](http://shiro.apache.org/)
* [redis](http://redis.io/)
* [jedis](https://github.com/xetorthio/jedis)

> * 项目启动后输入：http://localhost/
> * 该项目中, 增加了对url的拦截[URLPermissionsFilter](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-shiro/src/main/java/com/lance/shiro/config/URLPermissionsFilter.java)，
> * 用admin/123456,拥有index权限reports未任何权限, lance/123456尚未分配任何权限.
> * 参考[schema.sql](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-shiro/src/main/resources/init-sql/schema.sql)
> * shiro Cache交于Redis进行管理
> * springmvc-shiro采用xml配置, 参考[demo-springmvc-shiro](https://github.com/leelance/demo/tree/master/demo-springmvc-shiro)

Add dependencies to pom
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-redis</artifactId>
</dependency>
```

Shiro-Redis configuration
```java
@Bean(name="shrioRedisCacheManager")
@DependsOn(value="redisTemplate")
public ShrioRedisCacheManager redisCacheManager() {
	ShrioRedisCacheManager cacheManager = new ShrioRedisCacheManager(redisTemplate());
	return cacheManager;
}

@Bean(name="redisTemplate")
public RedisTemplate<byte[], Object> redisTemplate() {
    RedisTemplate<byte[], Object> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory());
    return template;
}

@Bean
public JedisConnectionFactory connectionFactory(){
	JedisConnectionFactory conn = new JedisConnectionFactory();
	conn.setDatabase(3);
	conn.setHostName("127.0.0.1");
	conn.setPassword("123456");
	conn.setPort(6379);
	conn.setTimeout(3000);
	return conn;
}

//CacheManager
public class ShrioRedisCacheManager extends AbstractCacheManager{
	private RedisTemplate<byte[], Object> redisTemplate;
	
	public ShrioRedisCacheManager(RedisTemplate<byte[], Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	@Override
	protected Cache<byte[], Object> createCache(String name) throws CacheException {
		return new ShrioRedisCache<byte[], Object>(redisTemplate, name);
	}
}

```
