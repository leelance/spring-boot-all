package com.lance.net.server.common;

import java.net.InetSocketAddress;

import org.springframework.stereotype.Component;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.util.concurrent.ImmediateEventExecutor;

@Component
public class ChatServer {
	private final ChannelGroup channelGroup = new DefaultChannelGroup(ImmediateEventExecutor.INSTANCE);
	private final EventLoopGroup bossGroup = new NioEventLoopGroup();
	private final EventLoopGroup workGroup = new NioEventLoopGroup();
	private Channel channel;
	
	public ChannelFuture start(InetSocketAddress address) {
		ServerBootstrap bootstrap = new ServerBootstrap();
		bootstrap.group(bossGroup, workGroup)
				.channel(NioServerSocketChannel.class)
				.childHandler(new ChatServerInitializer(channelGroup))
				.option(ChannelOption.SO_BACKLOG, 128)
				.childOption(ChannelOption.SO_KEEPALIVE, true);
		
		ChannelFuture future = bootstrap.bind(address).syncUninterruptibly();
		channel = future.channel();
		return future;
	}
	
	public void destroy() {
		if(channel != null) {
			channel.close();
		}
		
		channelGroup.close();
		workGroup.shutdownGracefully();
		bossGroup.shutdownGracefully();
	}
	
	public static void main(String[] args) {
		ChatServer server = new ChatServer();
		InetSocketAddress address = new InetSocketAddress("127.0.0.1", 9090);
		ChannelFuture future = server.start(address);
		
		Runtime.getRuntime().addShutdownHook(new Thread(){
			@Override
			public void run() {
				server.destroy();
			}
		});
		
		future.channel().closeFuture().syncUninterruptibly();
	}
}
