<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Notification</title>
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="//cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
<script src="/stomp.min.js"></script>
</head>
<body>
<table id="tab" class="table table-striped table-bordered">
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
		</tr>
	</thead>
</table>

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
</body>
</html>