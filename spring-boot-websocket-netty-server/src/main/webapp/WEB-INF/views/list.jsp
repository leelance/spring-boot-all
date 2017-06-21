<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>详情页面</title>
<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
input[type=button] {
	margin: 5px;
	width: 50px;
	height: 35px;
	border: none;
	color: white;
	font-weight: bold;
	outline: none;
}

.clear {
	background: red;
}

.send {
	background: green;
}

.clear:active {
	background: yellow;
}

.send:active {
	background: yellow;
}

</style>
<script>		
		var websocket;
		var token = "${token}"
		if ('WebSocket' in window) {
			websocket = new WebSocket("ws://10.0.2.21/ws?token="+token);
		} else if ('MozWebSocket' in window) {
			websocket = new MozWebSocket("ws://10.0.2.21/ws"+token);
		} else {
			websocket = new SockJS("http://10.0.2.21/ws/sockjs"+token);
		}
		
		websocket.onopen = function(event) {
			console.log("WebSocket:已连接");
		};
		
		websocket.onmessage = function(event) {
			var data=JSON.parse(event.data);
			console.log("WebSocket:收到一条消息",data);
			var record = "<tr>"
						+'<td>'+data.from+'</td>'
						+'<td>'+data.text+'</td>'
						+'<td>'+data.date+'</td>'
						+'</tr>';
			console.log(record);
			$("#content").append(record);
		};
		
		websocket.onerror = function(event) {
			console.log("WebSocket:发生错误 ");
		};
		
		websocket.onclose = function(event) {
			console.log("WebSocket:已关闭");
		}
		
		function sendMsg(){
			var v=$("#msg").val();
			
			if(v==""){
				return;
			}else{
				var data={};
				data["from"]=token;
				data["text"]=v;
				websocket.send(JSON.stringify(data));
				$("#msg").val("");
			}
		}			
			
		function send(event){
			var code;
			 if(window.event){
				 code = window.event.keyCode; // IE
			 }else{
				 code = event.which; // Firefox
			 }
			if(code==13){ 
				sendMsg();            
			}
		}
		
		function clearAll(){
			$("#content").empty();
		}
</script>
</head>
<body>
	<div class="container">
	  <div class="row">
	    	<table class="table table-striped table-bordered" id="content"></table>
	  </div>
	  <div class="row">
		  	<input type="text" placeholder="请输入要发送的信息" id="msg" class="msg" onkeydown="send(event)">
			<input type="button" value="发送" class="send" onclick="sendMsg()" >
			<input type="button" value="清空" class="clear" onclick="clearAll()">
	  </div>
	</div>
</body>
</html>
