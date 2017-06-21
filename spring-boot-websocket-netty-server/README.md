# spring-boot-websocket-netty-server, 依赖spring-boot-parent
Spring Boot: user notifications with web socket

This example will shows how to send notifications, via web socket, to specific logged-in users.

Could be useful, for example, if you are trying to implement a real-time user notification system.

### Build and run

#### Configurations
```java
@SpringBootApplication
public class NettyWebSocketServerApplication implements CommandLineRunner{
	@Autowired
	private ChatServer chatServer;

    public static void main(String[] args) {
        SpringApplication.run(NettyWebSocketServerApplication.class, args);
    }
    
    @Bean
    public ChatServer chatServer() {
    	return new ChatServer();
    }

	@Override
	public void run(String... args) throws Exception {
		InetSocketAddress address = new InetSocketAddress("127.0.0.1", 9090);
		ChannelFuture future = chatServer.start(address);
		
		Runtime.getRuntime().addShutdownHook(new Thread(){
			@Override
			public void run() {
				chatServer.destroy();
			}
		});
		
		future.channel().closeFuture().syncUninterruptibly();
	}
}
```

#### Prerequisites

- Java 8
- Maven > 3.0

#### From terminal

Go on the project's root folder, then type:

    $ mvn spring-boot:run
