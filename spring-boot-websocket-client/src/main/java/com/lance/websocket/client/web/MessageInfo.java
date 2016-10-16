package com.lance.websocket.client.web;

import java.io.Serializable;
import java.util.UUID;

public class MessageInfo implements Serializable{
	private static final long serialVersionUID = 6367726218945501780L;

	private String id;
	
	private String name;
	
	public MessageInfo(String name) {
		this.id = UUID.randomUUID().toString();
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}