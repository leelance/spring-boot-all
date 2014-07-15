var imgHolder = {
	init: function() {
		$('#home-left li').removeClass("active").eq(1).prop('class','active');
		hljs.configure({tabReplace: '    '});
		hljs.initHighlightingOnLoad();
	}
}

$(function(){
	imgHolder.init();
});