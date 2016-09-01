<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>后台管理系统</title>
	<link rel="stylesheet" type="text/css" href="/plugin/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="/plugin/themes/icon.css">
	<script type="text/javascript" src="/plugin/jquery.min.js"></script>
	<script type="text/javascript" src="/plugin/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout" style="overflow-y:hidden">
	<!-- Header -->
	<div data-options="region:'north',border:false" style="overflow: hidden; height: 30px; line-height: 30px;">
        <span style="float:right; padding-right:20px;" class="head">
        	<a href="#" id="editpass">修改密码</a> |
        	<a href="#" id="loginOut">安全退出</a>
        </span>
        <span style="padding-left:10px; font-size: 16px;">后台管理系统</span>
    </div>
	
	<!-- 左边菜单导航  -->
	<div data-options="region:'west',title:'菜单',iconCls:'icon-tip'" style="width:220px;">
		<div class="easyui-accordion" data-options="fit:true,border:false,animate:true,plain:true" id="menu">
			<div title="System" data-options="iconCls:'icon-ok'" style="overflow:auto;padding:10px;">
				<ul class="easyui-tree">
					<li><a href="/admin/tab">Tab</a></li>
					<li><a href="/admin/nestedlayout">nestedlayout</a></li>
					<li><a href="/admin/datagrid">datagrid</a></li>
					<li>potato</li>
					<li>lettuce</li>
				</ul>
			</div>
			<div title="Help" data-options="iconCls:'icon-help'" style="padding:10px;">
				<ul class="easyui-tree">
					<li>tomato</li>
					<li>carrot</li>
					<li>cabbage</li>
					<li>potato</li>
					<li>lettuce</li>
				</ul>
			</div>
			<div title="TreeMenu" data-options="iconCls:'icon-search'" style="padding:10px;">
				<ul class="easyui-tree">
					<li>
						<span>Foods</span>
						<ul>
							<li>
								<span>Fruits</span>
								<ul>
									<li>apple</li>
									<li>orange</li>
								</ul>
							</li>
							<li>
								<span>Vegetables</span>
								<ul>
									<li>tomato</li>
									<li>carrot</li>
									<li>cabbage</li>
									<li>potato</li>
									<li>lettuce</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	<!-- 中间内容页面  -->
	<div id="mainPanle" data-options="region:'center'" style="overflow-y:hidden;padding: 5px 10px;">
		<sitemesh:write property='body'/>
	</div>
</body>
</html>