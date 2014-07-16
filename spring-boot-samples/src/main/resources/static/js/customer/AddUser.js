var AddUser = {
	init: function() {
		$('#home-left li').removeClass("active").eq(3).prop('class','active');
		
		this.queryUser();
		
		this.saveUser();
		
		this.handlerAddress();
	},
	
	/**
	 * query users
	 */
	queryUser: function() {
		$.getJSON("/user/list", function(json){
		    $("#user-tmpl").tmpl(json).appendTo("#query-user");
		});
		
		//处理name下显示/隐藏地址信息
		$("#query-user").on('click', '.user-name-hide', function(){
			$(this).next().toggle();
		});
	},
	
	/**
	 * save user
	 */
	saveUser: function() {
		$("#saveBtn").on('click', function(){
			$("#user-form").submit();
		});
	},
	
	/**
	 * handler address
	 * add address/ delete address
	 */
	handlerAddress: function(){
		$(".address-btn").on('click', 'a',function(){
			var len = $('#user-form .addr-group-border').length;
			var data = {
				cityName: 'addresses['+len+'].city',
				proName: 'addresses['+len+'].province',
				addName: 'addresses['+len+'].address'
			}
			$('#user-addr-tmpl').tmpl(data).appendTo("#user-form");
		});
		
		$("#user-form").on('click','.address-del-btn a',function(){
			console.log($(this).parents('.addr-group-border'));
			$(this).parents('.addr-group-border').remove();
		});
	}
}

$(function(){
	AddUser.init();
});