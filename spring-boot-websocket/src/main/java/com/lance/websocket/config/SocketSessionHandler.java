package com.lance.websocket.config;

import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

import com.google.common.collect.Maps;

public final class SocketSessionHandler {
	public static Map<String, WebSocketSession> sessions = Maps.newConcurrentMap();
	
	private SocketSessionHandler(){}
	
	private static class SocketSessionHandlerHolder {
		private static final SocketSessionHandler handler = new SocketSessionHandler();
	}
	
	public static SocketSessionHandler newInstance(){
		return SocketSessionHandlerHolder.handler;
	}
	
	public synchronized void addSession(WebSocketSession session){
        sessions.put(session.getId(), session);
    }

	public synchronized void removeSession(String id) {
        sessions.remove(id);
    }
}
