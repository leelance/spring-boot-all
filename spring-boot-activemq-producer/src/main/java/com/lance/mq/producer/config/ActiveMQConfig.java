package com.lance.mq.producer.config;

import javax.jms.Queue;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.pool.PooledConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.converter.SimpleMessageConverter;

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
