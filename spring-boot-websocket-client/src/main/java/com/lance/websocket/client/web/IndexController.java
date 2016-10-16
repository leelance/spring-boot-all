package com.lance.websocket.client.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	/**
	 * Index
	 * @return
	 */
	@RequestMapping(value={"", "/", "index"})
	public String index() {
		return "index.jsp";
	}
	
	@RequestMapping("chat")
	public String chat() {
		return "chat.jsp";
	}
	
	@RequestMapping("notifications")
	public String notifications() {
		return "notifications.jsp";
	}
	
	@RequestMapping("notifications-button")
	public String notificationsButton() {
		return "notifications-buttion.jsp";
	}
	
	@ResponseBody
	@RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
	public void sendMessage() {
		List<MessageInfo> messages = getMessage();
		messagingTemplate.convertAndSend("/user/topic/message", messages);
	}
	
	private List<MessageInfo> getMessage(){
		List<MessageInfo> list = new ArrayList<>();
		list.add(new MessageInfo("Message-Text1"));
		list.add(new MessageInfo("Message-Text2"));
		list.add(new MessageInfo("Message-Text3"));
		list.add(new MessageInfo("Message-Text4"));
		return list;
	}
}
