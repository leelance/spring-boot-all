# spring-boot-activemq-consumer, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [ActiveMQ](http://activemq.apache.org/)

> * springmvc集成ActiveMQ,采用XML配置消费者[demo-springmvc-activemq-consumer](https://github.com/leelance/demo/tree/master/demo-springmvc-activemq-consumer)

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
	
	@Bean(name="textMessageListenerAdapter")
	public MessageListenerAdapter messageListenerAdapter() {
		MessageListenerAdapter adapter = new MessageListenerAdapter();
		adapter.setMessageConverter(new SimpleMessageConverter());
		adapter.setDelegate(textConsumerListener());
		return adapter;
	}
	
	public CachingConnectionFactory connectionFactory(ActiveMQConnectionFactory connectionFactory) {
		CachingConnectionFactory factory = new CachingConnectionFactory(connectionFactory);
		return factory;
	}
	
	@Bean
	public MessageListenerContainer messageListenerContainer(ActiveMQConnectionFactory connectionFactory) {
		DefaultMessageListenerContainer container = new DefaultMessageListenerContainer();
		container.setConnectionFactory(connectionFactory(connectionFactory));
		container.setDestination(helloQueue());
		container.setMessageListener(messageListenerAdapter());
		container.setConcurrency("10-50");
		return container;
	}
	
	@Bean
	public ConsumerListener textConsumerListener() {
		return new ConsumerListener();
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
