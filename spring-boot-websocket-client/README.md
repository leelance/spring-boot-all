# spring-boot-websocket-client, 依赖spring-boot-parent
Spring Boot: user notifications with web socket

This example will shows how to send notifications, via web socket, to specific logged-in users.

Could be useful, for example, if you are trying to implement a real-time user notification system.

### Build and run

#### Configurations
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer{

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws_notice").withSockJS();
	}
}

@ResponseBody
@RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
public void sendMessage() {
	List<MessageInfo> messages = getMessage();
	messagingTemplate.convertAndSend("/user/topic/message", messages);
}
```

```js
<script>
function connect() {
   var socket = new SockJS('/ws_notice');
   var stompClient = Stomp.over(socket);

   stompClient.connect({}, function(frame) {
       stompClient.subscribe('/user/topic/message', function(message) {    	   
           notify(message.body);
       });
   });
   
   return;
}
  
function notify(message) {
	var html = "";
	$.each(eval(message), function(index, val){
		html = html 
			+ "<tr>"
				+"<td>"+val.id+"</td>"	
				+"<td>"+val.name+"</td>"
			+ "</tr>"
	});
	
	$('#tab').append(html);
}

$(document).ready(function() {
  connect();  
});
</script>
```
#### Prerequisites

- Java 7
- Maven > 3.0

#### From terminal

Go on the project's root folder, then type:

    $ mvn spring-boot:run
