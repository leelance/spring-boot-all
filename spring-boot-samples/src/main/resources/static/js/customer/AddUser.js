var AddUser = {
	init: function() {
		$('#home-left li').removeClass("active").eq(3).prop('class','active');
		
		this.queryUser();
	},
	
	/**
	 * query users
	 */
	queryUser: function() {
		$.getJSON("/user/list", function(json){
		    $("#user-tmpl").tmpl(json).appendTo("#query-user");
		});
	}
}

$(function(){
	AddUser.init();
});