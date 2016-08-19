package com.lance.websocket.config;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.web.socket.WebSocketSession;

public class SocketSessionInfo implements Serializable{
	private static final long serialVersionUID = 5120020441590774164L;
	/**管理WebSession失效时间3分钟*/
	public static final int SESSION_INVALID = 3;
	
	private String sessionId;
	
	private WebSocketSession webSocketSession;
	
	private Date lastSessionTime;
	
	private Date endSessionTime;

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public WebSocketSession getWebSocketSession() {
		return webSocketSession;
	}

	public void setWebSocketSession(WebSocketSession webSocketSession) {
		this.webSocketSession = webSocketSession;
	}

	public Date getLastSessionTime() {
		return lastSessionTime;
	}

	public void setLastSessionTime(Date lastSessionTime) {
		this.lastSessionTime = lastSessionTime;
	}

	public Date getEndSessionTime() {
		if(this.lastSessionTime != null){
			endSessionTime = DateUtils.addMinutes(lastSessionTime, SESSION_INVALID);
		}
		return endSessionTime;
	}

	public void setEndSessionTime(Date endSessionTime) {
		this.endSessionTime = endSessionTime;
	}
	
	@Override
	public boolean equals(Object obj) {
		SocketSessionInfo info = (SocketSessionInfo)obj;
		return this.sessionId.equals(info.getSessionId());
	}
}