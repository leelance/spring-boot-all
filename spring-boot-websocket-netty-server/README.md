# spring-boot-websocket-netty-server, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Netty](http://netty.io/)

Spring Boot: user notifications with web socket

This example will shows how to send notifications, via web socket, to specific logged-in users.

Could be useful, for example, if you are trying to implement a real-time user notification system.

### Build and run
springboot启动后： http://localhost/

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-websocket-netty-server/1.png)
![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-websocket-netty-server/2.png)
![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-websocket-netty-server/3.png)
![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-websocket-netty-server/4.png)
#### Configurations
```xml
<dependency>
	<groupId>io.netty</groupId>
	<artifactId>netty-all</artifactId>
	<version>4.1.12.Final</version>
</dependency>
```
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
