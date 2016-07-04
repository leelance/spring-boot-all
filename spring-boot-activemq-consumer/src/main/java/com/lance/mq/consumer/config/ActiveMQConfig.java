package com.lance.mq.consumer.config;

import javax.jms.Queue;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.listener.DefaultMessageListenerContainer;
import org.springframework.jms.listener.MessageListenerContainer;
import org.springframework.jms.listener.adapter.MessageListenerAdapter;
import org.springframework.jms.support.converter.SimpleMessageConverter;

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