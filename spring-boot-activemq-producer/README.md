# spring-boot-activemq-producer, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [ActiveMQ](http://activemq.apache.org/)

> * springmvc集成ActiveMQ,采用XML配置[demo-springmvc-activemq](https://github.com/leelance/demo/tree/master/demo-springmvc-activemq)

```xml
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jms</artifactId>
</dependency>
<dependency>
	<groupId>org.apache.activemq</groupId>
	<artifactId>activemq-client</artifactId>
</dependency>
<dependency>
	<groupId>org.apache.activemq</groupId>
	<artifactId>activemq-spring</artifactId>
</dependency>
```

```java
@Configuration
@Description(value = "ActiveMQ Configuration")
public class ActiveMQConfig {
	public static final String QUEUE_HELLO = "queue.hello";
	
	@Bean(name="helloQueue")
	public Queue helloQueue() {
		return new ActiveMQQueue(QUEUE_HELLO);
	}
	
	public PooledConnectionFactory connectionFactory(ActiveMQConnectionFactory connectionFactory) {
		PooledConnectionFactory pool = new PooledConnectionFactory(connectionFactory);
		pool.setMaxConnections(5);
		return pool;
	}
	
	@Bean(name="jmsTemplate")
	public JmsTemplate jmsTemplate(ActiveMQConnectionFactory connectionFactory) {
		JmsTemplate template = new JmsTemplate(connectionFactory(connectionFactory));
		template.setDefaultDestination(helloQueue());
		template.setMessageConverter(new SimpleMessageConverter());
		return template;
	}
}
```
###application.properties
```properties
# ACTIVEMQ (ActiveMQProperties)
spring.activemq.broker-url=tcp://10.0.2.95:61616
spring.activemq.in-memory=true
spring.activemq.pooled=false
```
