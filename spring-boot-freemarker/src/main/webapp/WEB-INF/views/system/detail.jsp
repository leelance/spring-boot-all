<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>

    <!-- Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/dashboard.css" rel="stylesheet">
    <link rel="stylesheet" href="/kindeditor/themes/default/default.css" />
	<script charset="utf-8" src="/kindeditor/kindeditor-min.js"></script>
	<script charset="utf-8" src="/kindeditor/lang/zh_CN.js"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/system/admin/index"> Welcome, ${sys_user_key.name}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/system/admin/index">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="/system/logout">Exit</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li><a href="/system/admin/index">Overview <span class="sr-only">(current)</span></a></li>
            <li class="active"><a href="/system/admin/news/list">News Management</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
           <h2 class="page-header">&nbsp;<a class="pull-right btn btn-primary" href="/system/admin/news/list">Back</a></h2>
		  	
		  <div class="blog-header">
	        <h3 class="blog-title">${info.title}</h3>
	        
	        <blockquote>
			  <p class="lead blog-description">${info.summary}</p>
			</blockquote>
	      </div>
	      <div class="row">
	      		<p class="blog-post-meta pull-right"><fmt:formatDate  value="${info.createTime}" pattern="yyyy-MM-dd HH:mm:ss" /> by <a href="#">${info.author}</a></p>
	      		${info.content}
	      </div>
        </div>
      </div>
    </div>
	
	<script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/layer/layer.js"></script>
    <script src="/js/holder.min.js"></script>
  </body>
</html>