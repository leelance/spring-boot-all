package com.lance.websocket.config;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;

import org.apache.commons.lang3.time.DateUtils;

public class SockTaskRunner implements Runnable{
	public void run() {
		Iterator<SocketSessionInfo> it = SocketSessionHandler.sessions.iterator();
		while(it.hasNext()) {
			SocketSessionInfo info = it.next();
			
			if(DateUtils.truncatedCompareTo(new Date(), info.getEndSessionTime(), Calendar.MINUTE) > 0) {
				try {
					info.getWebSocketSession().close();
					SocketSessionHandler.newInstance().removeSession(info.getSessionId());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}