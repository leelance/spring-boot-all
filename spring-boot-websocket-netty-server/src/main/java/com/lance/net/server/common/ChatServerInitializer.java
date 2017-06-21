package com.lance.net.server.common;

import java.util.concurrent.TimeUnit;

import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.group.ChannelGroup;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;

public class ChatServerInitializer extends ChannelInitializer<Channel>{
	private final ChannelGroup group;
	
	public ChatServerInitializer(ChannelGroup group) {
		this.group = group;
	}
	
	@Override
	protected void initChannel(Channel ch) throws Exception {
		ChannelPipeline pipeline = ch.pipeline();
		//处理日志
		pipeline.addLast(new LoggingHandler(LogLevel.INFO));
		
		//处理心跳
		pipeline.addLast(new IdleStateHandler(0, 0, 1800, TimeUnit.SECONDS));
		pipeline.addLast(new ChatHeartbeatHandler());
		
		pipeline.addLast(new HttpServerCodec());
		pipeline.addLast(new ChunkedWriteHandler());
		pipeline.addLast(new HttpObjectAggregator(64 * 1024));
		pipeline.addLast(new HttpRequestHandler("/ws"));
		pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));
		pipeline.addLast(new TextWebSocketFrameHandler(group));		
	}
}
