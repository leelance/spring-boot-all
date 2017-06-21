$(document).ready(function() {
	//发送事件执行方法
    function send() {
        function h() {
        	- 1 != val.indexOf("*#emo_") && (val = val.replace("*#", "<img src='/resources/img/").replace("#*", ".gif'/>"), h());
        }
        
        var val = $("#textarea").val();
        h();
        if(val != null && val != '') {
			websocket.send(val);
        }else {
        	alert("\u8bf7\u8f93\u5165\u804a\u5929\u5185\u5bb9!");
        }
    }

    //创建socket
    var websocket;
    function createWebsocket() {
    	var token = $('#Token').val();
    	if ('WebSocket' in window) {
    		websocket = new WebSocket("ws://127.0.0.1:9090/ws?token="+token);
    	} else if ('MozWebSocket' in window) {
    		websocket = new MozWebSocket("ws://127.0.0.1:9090/ws?token="+token);
    	} else {
    		websocket = new SockJS("http://127.0.0.1:9090/ws?token="+token);
    	}
    	
        websocket.onopen = function(event) {
        	initUsers();
    		console.log("WebSocket:已连接");
    	};
    	
    	websocket.onmessage = function(ev) {
    		var obj=JSON.parse(ev.data);
    		if(!obj || obj == undefined) {
    			return false;
    		}
    		
    		var users = obj.to;
    		var cur = obj.from;
    		if(!!obj.message) {//如果空消息不予处理
    			var code = cur.phone==token? 'Me':cur.code;
    			
    			 var content = "<div class='message clearfix'>" +
		     			"<div class='user-logo'>" +
		     				"<img src='" + cur.headImg + "'/>" + 
		     			"</div>" + 
		     			"<div class='wrap-text'>" + 
		     				"<h5 class='clearfix'>"+code+"</h5>" + 
		     				"<span class='bubble leftBubble'>" + 
		     					obj.message + 
		     					"<span class='bottomLevel'></span><span class='topLevel'></span>"+
		     				"</span>" + 
		     			"</div>" + 
			    			"<div class='wrap-ri'>" + 
			    				"<div clsss='clearfix'>" +
			    					"<span>" + obj.createTime + "</span>" +
			    			    "</div>" + 
			    			"</div>" + 
			    			"<div style='clear:both;'></div>" + 
		     		"</div>";
 
				 $(".chat01_content").append(content);
				 $("#textarea").val("")
				 $(".chat01_content").scrollTop($(".message").height()*$(".message").length)
    		}
           
            refresh(users);
		};
		
		websocket.onerror = function(event) {
			console.log("WebSocket:发生错误 ");
		};
		
		websocket.onclose = function(event) {
			console.log("WebSocket:已关闭");
		}
    }
    
    //初始化WebSocket
    createWebsocket();
    
    //用户列表鼠标事件
    $(".chat03_content li").mouseover(function() {
        $(this).addClass("hover").siblings().removeClass("hover")
    }).mouseout(function() {
        $(this).removeClass("hover").siblings().removeClass("hover")
    });
    
    //表情显示隐藏
    $(".ctb01").mouseover(function() {
        $(".wl_faces_box").show()
    }).mouseout(function() {
        $(".wl_faces_box").hide()
    })
    
    //表情显示隐藏
    $(".wl_faces_box").mouseover(function() {
        $(".wl_faces_box").show()
    }).mouseout(function() {
        $(".wl_faces_box").hide()
    });
    $(".wl_faces_close").click(function() {
        $(".wl_faces_box").hide()
    })
    //选中表情
    $(".wl_faces_main img").click(function() {
        var a = $(this).attr("src");
        $("#textarea").val($("#textarea").val() + "*#" + a.substr(a.indexOf("img/") + 4, 6) + "#*"),
        $("#textarea").focusEnd(),
        $(".wl_faces_box").hide()
    })
    
    //发送事件
    $(".chat02_bar img").click(function() {
    	send()
    });
    
    document.onkeydown = function(a) {
        var b = document.all ? window.event: a;
        return 13 == b.keyCode ? (send(), !1) : void 0
    };
    
    $.fn.setCursorPosition = function(a) {
        return 0 == this.lengh ? this: $(this).setSelection(a, a)
    };
    
    $.fn.setSelection = function(a, b) {
        if (0 == this.lengh) return this;
        if (input = this[0], input.createTextRange) {
            var c = input.createTextRange();
            c.collapse(!0),
            c.moveEnd("character", b),
            c.moveStart("character", a),
            c.select()
        } else input.setSelectionRange && (input.focus(), input.setSelectionRange(a, b));
        return this
    };
    $.fn.focusEnd = function() {
        this.setCursorPosition(this.val().length)
    }
});

//初始化用户列表
function initUsers() {
	var token = $('#Token').val();
	 $.get("/chat/users?token="+token, function(result){
		 $('#curName').html(result.curName);
		 refresh(result.users);
	 });
}

function refresh(data) {
	var h = "";
	 $.each(data, function(key, obj) {
		 h += '<li>'
               +'<label class="online"></label>'
               +'<a href="javascript:;">'
               +    '<img src="'+obj.headImg+'">'
               +'</a>'
               +'<a href="javascript:;" class="chat03_name">'+obj.code+'</a>'
             +'</li>';
	 });
	 
	 $('#chatList ul').html("").append(h);
}