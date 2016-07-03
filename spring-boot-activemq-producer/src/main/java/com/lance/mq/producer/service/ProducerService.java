package com.lance.mq.producer.service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.lance.mq.producer.info.OrderInfo;

@Component
public class ProducerService {
	Logger log = LogManager.getLogger(getClass());
	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private ActiveMQQueue helloQueue;
	
	/**
	 * 发送Text消息队列
	 * @param message
	 */
	public void sendTextQueueMessage(final String message) {
		jmsTemplate.send(helloQueue, new MessageCreator(){
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(message);
			}
		});
	}
	
	/**
	 * 发送消息并处理消息返回值
	 * @param message
	 * @throws JMSException 
	 */
	public String sendTextQueueMessageAndReceive(final String message) throws JMSException {
		Message replyMessage = jmsTemplate.sendAndReceive(helloQueue, new MessageCreator(){
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(message);
			}
		});
		
		log.info("sendTextAndReceive: {}", JSON.toJSONString(replyMessage));
		TextMessage textMessage = (TextMessage)replyMessage;
		return textMessage.getText();
	}
	
	/**
	 * 订单入队列
	 * @param info
	 * @throws JMSException 
	 */
	public String sendObjectQueueMessage(final OrderInfo info) throws JMSException {
		Message message = jmsTemplate.sendAndReceive(helloQueue, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createObjectMessage(info);
			}
		});
		
		log.info("sendTextAndReceive: {}", JSON.toJSONString(message));
		TextMessage textMessage = (TextMessage)message;
		return textMessage.getText();
	}
}