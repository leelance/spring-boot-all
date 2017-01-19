<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Index</title>
	<link rel="stylesheet" type="text/css" href="/plugin/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="/plugin/themes/icon.css">
	<script type="text/javascript" src="/plugin/jquery.min.js"></script>
	<script type="text/javascript" src="/plugin/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/plugin/locale/easyui-lang-zh_CN.js"></script>
</head>
<body class="easyui-layout" style="overflow-y:hidden">
<!-- Header -->
	<div data-options="region:'north',border:false" style="overflow: hidden; height: 30px; line-height: 30px;">
        <span style="float:right; padding-right:20px;" class="head">
        	<a href="#" id="editpass">Password</a> |
        	<a href="#" id="loginOut">Sign Out</a>
        </span>
        <span style="padding-left:10px; font-size: 16px;">Spring-boot-Activiti-Sample</span>
    </div>
	
	<!-- 左边菜单导航  -->
	<div data-options="region:'west',title:'Navigation',iconCls:'icon-tip'" style="width:220px;">
		<div class="easyui-accordion" data-options="fit:true,border:false" id="accordion_menu">
			<div title="首页">
				<ul class="easyui-tree">
					<li><a class="menu-li" href="/admin/welcome">首页</a></li>
				</ul>
			</div>
			<div title="代办流程">
				<ul class="easyui-tree">
					<li>Tomato</li>
					<li>Carrot</li>
				</ul>
			</div>
			<div title="管理流程">
				<ul class="easyui-tree">
					<li><a class="menu-li" href="/admin/process/deploy/list">发布流程</a></li>
					<li><a class="menu-li" href="/admin/process/manage/list">流程管理</a></li>
				</ul>
			</div>
			<div title="系统设置">
				<ul class="easyui-tree">
					<li>用户管理</li>
					<li><a class="menu-li" href="/admin/system/role/index">角色管理</a></li>
				</ul>
			</div>
		</div>
	</div>
	
	<!-- 中间内容页面  -->
	<div id="mainPanle" data-options="region:'center'" style="overflow-y:hidden">
		<div id="centerTab" class="easyui-tabs" data-options="fit:true,border:false">
			<sitemesh:write property='body'/>
		</div> 
	</div>
<script type="text/javascript">
	$(function(){
		var url = window.location.pathname;
		var title = $('a[href="'+url+'"]').parents('div.accordion-body').prev('div').find('.panel-title').html();
		$('#accordion_menu').accordion('select', title);
	});
</script>
</body>
</html>
