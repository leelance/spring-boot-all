<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

<!-- JS file -->
<script src="http://code.jquery.com/jquery.js"></script>

</head>
<body>
<!-- header -->
<jsp:include page="common/header.jsp"></jsp:include>
<!-- content -->
<div class="container-fluid">
	<div class="row">
		<!-- left -->
		<div class="col-sm-3 col-md-2 sidebar">
			<jsp:include page="common/home-left.jsp"></jsp:include>
		</div>
		
		<!-- center content -->
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<div class="row">
				<div class="col-6 col-sm-6 col-lg-4">
	              <h2>Holder.js</h2>
	              <p class="text-muted">
	              	一个可以生成简单图像的前端JavaScript库, Holder 可直接在客户端渲染图片的占位。支持在线和离线，提供一个链式 API 对图像占位进行样式处理.
	              </p>
	              <p><a class="btn btn-default" href="/user/home/holder" role="button">View details »</a></p>
	            </div>
	            <div class="col-6 col-sm-6 col-lg-4">
	              <h2>jQuery.tmpl.js</h2>
	              <p class="text-muted">
	              	基于jQuery的jquery.tmpl, 用更加直观方面的HTML代码, 和JSON变量来占位的方式来填充数据, 使html代码和js代码分离处理, 维护成本大大降低.
	              </p>
	              <p><a class="btn btn-default" href="/user/home/tmpl" role="button">View details »</a></p>
	            </div>
	            <div class="col-6 col-sm-6 col-lg-4">
	              <h2>Holder.js</h2>
	              <p class="text-muted">
	              	一个可以生成简单图像的前端JavaScript库, Holder 可直接在客户端渲染图片的占位。支持在线和离线，提供一个链式 API 对图像占位进行样式处理.
	              </p>
	              <p><a class="btn btn-default" href="/user/home/holder" role="button">View details »</a></p>
	            </div>
			</div>
		</div>
	</div>
</div>

<!-- JS file -->
<script type="text/javascript">
	$(function(){
		$('#home-left li').removeClass("active").eq(0).prop('class', 'active');
	});
</script>
</body>
</html>