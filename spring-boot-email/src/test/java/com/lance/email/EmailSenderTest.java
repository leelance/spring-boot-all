package com.lance.email;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=SimpleApplication.class)
public class EmailSenderTest {
	private Logger logger = LogManager.getLogger(getClass());
	@Autowired
	private EmailSender emailSender;

	@Test
	public void sender() {
		String to = "81222000@qq.com";
		String subject = "Test subject";
		String content = "Hello Spring boot Email.";
		
		boolean result = emailSender.sender(to, subject, content);
		logger.info("-------------======---------------"+result);
	}
}
