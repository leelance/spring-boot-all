<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project Management</title>

<!-- CSS件 -->
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/customer/home.css">
<link rel="stylesheet" href="/css/plugins/zenburn.css">

<!-- JS file -->
<script src="http://code.jquery.com/jquery.js"></script>

</head>
<body>
	<!-- header -->
	<jsp:include page="../common/header.jsp"></jsp:include>
	<!-- content -->
	<div class="container-fluid">
		<div class="row">
			<!-- left -->
			<div class="col-sm-3 col-md-2 sidebar">
				<jsp:include page="../common/home-left.jsp"></jsp:include>
			</div>

			<!-- center content -->
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="row">			
					<h3>jQuery.tmpl.js</h3>
					  <p>
					  	基本语法: jQuery.tmpl( template [, data] [, options] )
					  </p>
					  <table class="table table-bordered">
					  	<tr>
					  		<td>template</td>
					  		<td>Html标签或者用户定义的模字符串模板</td>
					  	</tr>
					  	<tr>
					  		<td>data</td>
					  		<td>欲渲染的数据, 任何JavaScript类型的数据, 通常Array或Json对象</td>
					  	</tr>
					  	<tr>
					  		<td>options</td>
					  		<td>用户自定义key-value一对值, 继承tmplItem数据结构</td>
					  	</tr>
					 </table>
					 <p>
					 	Git地址: <a href="https://github.com/BorisMoore/jquery-tmpl" target="_blank">https://github.com/BorisMoore/jquery-tmpl</a>
					 </p>
					  <p>
					  	Demo
					  </p>
					  <pre>
在id=target的ul里面插入&lt;li&gt;John Doe&lt;/li&gt;
<code>$.tmpl( "&lt;li&gt;\${Name}&lt;/li&gt;", { "Name" : "John Doe" }).appendTo( "#target" );<br/>
</code>
下面实例演示本地数组数据
<code>var movies = [
     { Name: "The Red Violin", ReleaseYear: "1998" },
     { Name: "Eyes Wide Shut", ReleaseYear: "1999" },
     { Name: "The Inheritance", ReleaseYear: "1976" }
];

var markup = "&lt;li&gt;&lt;b&gt;${Name}&lt;/b&gt; (${ReleaseYear})&lt;/li&gt;";

// Compile the markup as a named template
$.template( "movieTemplate", markup );

// Render the template with the movies data and insert
// the rendered HTML under the "movieList" element
$.tmpl( "movieTemplate", movies ).appendTo( "#movieList" );</code>
ajax请求远端数据
<code>var markup = "&lt;li&gt;&lt;b&gt;${Name}&lt;/b&gt; (${ReleaseYear})&lt;/li&gt;";

// Compile the markup as a named template
$.template( "movieTemplate", markup );

$.ajax({
  dataType: "jsonp",
  url: moviesServiceUrl,
  jsonp: "$callback",
  success: showMovies
});

// Within the callback, use .tmpl() to render the data.
function showMovies( data ) {
  // Render the template with the "movies" data and insert
  // the rendered HTML under the 'movieList' element
  $.tmpl( "movieTemplate", data )
    .appendTo( "#movieList" );
}</code>
Template常用标签, 表达式
<code>\${}, {{each}}, {{if}}, {{else}}, {{html}}, {{tmpl}} and {{wrap}}</code>
下面是常用Html和js分离的方式
<code class="xml">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;script src="http://code.jquery.com/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
	&lt;script src="../../../jquery.tmpl.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;!-- Html中自定义的模板 --&gt;
&lt;script id="movieTemplate" type="text/x-jquery-tmpl"&gt;
	&lt;li&gt;
		&lt;b&gt;\${Name}&lt;/b&gt; (${ReleaseYear})
	&lt;/li&gt;
&lt;/script&gt;

&lt;ul id="movieList">&lt;/ul&gt;

&lt;script type="text/javascript"&gt;
	var movies = [
		{ Name: "The Red Violin", ReleaseYear: "1998" },
		{ Name: "Eyes Wide Shut", ReleaseYear: "1999" },
		{ Name: "The Inheritance", ReleaseYear: "1976" }
	];

	//渲染模板数据
	$( "#movieTemplate" ).tmpl( movies ).appendTo( "#movieList" );

&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
					  </pre>
				</div>
			</div>
		</div>
	</div>

	<!-- JS file -->
	<script src="/js/plugins/highlight.js"></script>
	<script type="text/javascript">
		$(function(){
			$('#home-left li').removeClass("active").eq(2).prop('class','active');
			hljs.configure({tabReplace: '    '});
			hljs.initHighlightingOnLoad();
		})
	</script>
</body>
</html>