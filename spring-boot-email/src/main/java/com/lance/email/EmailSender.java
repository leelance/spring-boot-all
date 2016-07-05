package com.lance.email;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component("emailSender")
public class EmailSender {
	private Logger logger = LogManager.getLogger(getClass());
	private String defaultFrom = "server1@qq.com";
	@Autowired
	private JavaMailSender javaMailSender;
	
	/**
	 * 发送邮件
	 * @param to			收件人地址
	 * @param subject		邮件主题
	 * @param content		邮件内容
	 * @author lance
	 */
	public boolean sender(String to, String subject, String content) {
		return sender(to, subject, content, true);
	}
	
	/**
	 * 发送邮件
	 * @param to			收件人地址
	 * @param subject		邮件主题
	 * @param content		邮件内容
	 * @param html			是否格式内容为HTML
	 * @author lance
	 */
	public boolean sender(String to, String subject, String content, boolean html){
		if(StringUtils.isBlank(to)) {
			logger.error("邮件发送失败：收件人地址不能为空.");
			return false;
		}
		return sender(new String[]{to}, subject, content, html);
	}
	
	/**
	 * sender message
	 * @param to
	 * @param subject
	 * @param content
	 * @param html
	 * @return
	 */
	public boolean sender(String[] to, String subject, String content, boolean html){
		if(to == null || to.length == 0) {
			logger.error("批量邮件发送失败：收件人地址不能为空.");
			return false;
		}
		
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(defaultFrom);
		simpleMailMessage.setTo(to);
		simpleMailMessage.setSubject(subject);
		simpleMailMessage.setText(content);
		
		try {
			javaMailSender.send(simpleMailMessage);
			return true;
		} catch (MailException e) {
			logger.error("发送邮件错误：{}, TO:{}, Subject:{},Content:{}.", e, to, subject, content);
			return false;
		}
	}
}
