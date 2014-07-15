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
					<h3>Holder.js</h3>
					<img src="holder.js/100x100/sky">
					<img src="holder.js/100x100/vine">
					<img src="holder.js/100x100/lava">
					<img src="holder.js/100x100/gray">
					<img src="holder.js/100x100/industrial">
					<img src="holder.js/100x100/social/text:color:social">
					<img src="holder.js/100x100/sky" class="img-radius">
					<p>&nbsp;</p>
					<blockquote>
						<p>
						一个可以生成简单图像的前端JavaScript库, Holder 可直接在客户端渲染图片的占位。支持在线和离线，提供一个链式 API 对图像占位进行样式处理。
						这是一个比较有用的插件,可以是你的缩略图,以及不显示图片时占位图片,比较好看.当然他的用法不仅仅使这些.我还利用这个插件绘制了一些小图标,为网站增色不少,而且速度也比图片的好很多.<br/>
						Git: <a href="https://github.com/imsky/holder" target="_blank">https://github.com/imsky/holder</a>
						</p>
					</blockquote>
					<pre>
<code class="xml">&lt;script src="holder.js"&gt;&lt;/script &gt;
&lt;img src="holder.js/200x300" &gt;
</code>
默认六种样式: sky, vine, lava, gray, industrial, and social.
<code class="xml">
&lt;img src="holder.js/200x300/sky"&gt;</code>
用户自定义类型
<code class="xml">&lt;img data-src="example.com/100x100/simple" id="new"&gt;</code>
<code>Holder.run({
    domain: "example.com",
    themes: {
        "simple":{
            background:"#fff",
            foreground:"#000",
            size:12
            }
    },
    images: "#new"
})</code>
客户修改默认显示文字
<code>&lt;img data-src="holder.js/200x200/text:hello world"&gt;</code>
					</pre>
					<p class="text-left">
						对浏览器的支持
						<ul>
							<li>Chrome</li>
							<li>Firefox 3+</li>
							<li>Safari 4+</li>
							<li>Internet Explorer 6+ (with fallback for older IE)</li>
							<li>Android (with fallback)</li>
						</ul>
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- JS file -->
	<script src="/js/plugins/highlight.js"></script>
	<script src="/js/plugins/holder.js"></script>
	<script src="/js/customer/img-holder.js"></script>
</body>
</html>