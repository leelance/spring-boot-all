package com.lance.websocket.config;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.google.common.collect.Sets;

public final class SocketSessionHandler {
	public static Set<SocketSessionInfo> sessions = Sets.newConcurrentHashSet();
	
	private SocketSessionHandler(){}
	
	private static class SocketSessionHandlerHolder {
		private static final SocketSessionHandler handler = new SocketSessionHandler();
	}
	
	public static SocketSessionHandler newInstance(){
		return SocketSessionHandlerHolder.handler;
	}
	
	/**
	 * Add WebSocketSession
	 * @param session
	 */
	public synchronized void addSession(WebSocketSession session){
        sessions.add(findOne(session));
    }
	
	/**
	 * find WebSocketSession
	 * @param session
	 * @return
	 */
	public synchronized SocketSessionInfo findOne(WebSocketSession session){
		SocketSessionInfo info = null;
		Iterator<SocketSessionInfo> it = sessions.iterator();
		while(it.hasNext()) {
			if(it.next().getSessionId().equals(session.getId())){
				info = it.next();
				info.setLastSessionTime(new Date());
			}
		}
		
		if(info == null) {
			info = new SocketSessionInfo();
			info.setSessionId(session.getId());
			info.setWebSocketSession(session);
			info.setLastSessionTime(new Date());
		}
		return info;
    }

	/**
	 * remove WebSocketSession
	 * @param id
	 */
	public synchronized void removeSession(String id) {
		SocketSessionInfo info = new SocketSessionInfo();
		info.setSessionId(id);
		sessions.remove(info);
    }
}
