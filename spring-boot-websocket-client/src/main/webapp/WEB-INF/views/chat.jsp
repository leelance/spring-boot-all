<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Index</title>
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="/css/style.css">
</head>
<style type="text/css">

#connect-container div {
	padding: 5px;
}
#console {
	border: 1px solid #CCCCCC;
	border-right-color: #999999;
	border-bottom-color: #999999;
	height: 170px;
	overflow-y: scroll;
	padding: 5px;
	width: 100%;
}
#console p {
	padding: 0;
	margin: 0;
}
</style>
<body>

	<div class="container-fluid">
		<!-- Static navbar -->
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#navbar" aria-expanded="false"
						aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/index">Project name</a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="/index">Home</a></li>
						<li><a href="/index">About</a></li>
						<li><a href="/index">Contact</a></li>
						<li class="dropdown"><a href="/index" class="dropdown-toggle"
							data-toggle="dropdown" role="button" aria-haspopup="true"
							aria-expanded="false">Dropdown <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="/index">Action</a></li>
								<li><a href="/index">Another action</a></li>
								<li><a href="/index">Something else here</a></li>
							</ul>
						</li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
			<!--/.container-fluid -->
		</nav>

		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-md-8 text-center">
			   <div id="convo" data-from="Sonu Joshi">  
					<ul class="chat-thread" id="convo-ul">
						<li>Welcome to you!</li>
					</ul>
			   </div>
			   <div style="text-align:center;clear:both"></div>
			   <div id="connect-container">
					<div>
						<button id="connect" onclick="connect();">Connect</button>
						<button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
					</div>
					<div>
						<textarea id="message" style="width: 350px">Welcome to you!</textarea>
					</div>
					<div>
						<button id="echo" onclick="echo();" disabled="disabled">Send</button>
					</div>
				</div>
			</div> -->
			<div class="col-md-2"></div>
		</div>
	</div>

	<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
	<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script src="//cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
	<script src="/stomp.min.js"></script>
<script type="text/javascript">
	var ws = null;
	function setConnected(connected) {
		document.getElementById('connect').disabled = connected;
		document.getElementById('disconnect').disabled = !connected;
		document.getElementById('echo').disabled = !connected;
	}
	function connect() {
		ws = new SockJS("http://10.0.2.23/echo", false);
		ws.onopen = function () {
			setConnected(true);
			log('Info: WebSocket connection opened.');
		};
		ws.onmessage = function (event) {
			log('Received: ' + event.data);
		};
		ws.onclose = function () {
			setConnected(false);
			log('Info: WebSocket connection closed.');
		};
		
		//配置Sockjs Heartbeat
		ws.onheartbeat = function(data) {
		    console.log('heartbeat'+new Date());
		};
	}
	function disconnect() {
		if (ws != null) {
			ws.close();
			ws = null;
		}
		setConnected(false);
	}
	
	function echo() {
		if (ws != null) {
			var message = document.getElementById('message').value;
			log('Sent: ' + message);
			ws.send(message);
		} else {
			alert('WebSocket connection not established, please connect.');
		}
	}
	
	//展示聊天信息
	function log(message) {
		$('#convo ul').append("<li>"+message+"</li>")
		$("#convo-ul").scrollTop($("#convo-ul")[0].scrollHeight);
	}
</script>
</body>
</html>