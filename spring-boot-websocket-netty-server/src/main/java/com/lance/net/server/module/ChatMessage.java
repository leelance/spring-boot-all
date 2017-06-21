package com.lance.net.server.module;

import java.util.Date;
import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;
import com.lance.net.server.common.ChatConstants;

public class ChatMessage {
	//发送消息则
	private UserInfo from;
	
	//发送内容
	private String message;
	
	//接收者列表
	private Map<String, UserInfo> to;
	
	//发送时间
	@JSONField(format="yyyy-MM-dd HH:mm:ss")
	private Date createTime;
	
	public ChatMessage() {
		
	}
	
	public ChatMessage(UserInfo from,String message) {
		this.from = from;
		this.message = message;
		this.to = ChatConstants.onlines;
		this.createTime = new Date();
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public UserInfo getFrom() {
		return from;
	}

	public void setFrom(UserInfo from) {
		this.from = from;
	}

	public Map<String, UserInfo> getTo() {
		return to;
	}

	public void setTo(Map<String, UserInfo> to) {
		this.to = to;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
