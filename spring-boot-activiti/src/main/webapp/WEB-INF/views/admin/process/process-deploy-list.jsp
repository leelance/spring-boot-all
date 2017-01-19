<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div title="流程管理" style="padding:0px;">
	<!-- Grid -->
	<table id="process-manage-grid"></table>
	
	<!-- ToolBar -->
	<div id="process-manage-tbar">
		<table cellpadding="0" cellspacing="0" style="width:100%">
			<tr>
				<td>
					<a href="#" class="easyui-linkbutton" iconCls="grid-add" plain="true" onclick="ProcessManage.addProcess()">新增</a>
					<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
					<a href="#" class="easyui-linkbutton" iconCls="grid-edit" plain="true" onclick="ProcessManage.update()">修改</a>
					<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
					<a href="#" class="easyui-linkbutton" iconCls="grid-del" plain="true" onclick="ProcessManage.del()">删除</a>
				</td>
				<td style="text-align:right">
					<input type="text" class="easyui-textbox" id="processName" data-options="prompt:'输入流程名称'"/>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="ProcessManage.search()">查询</a>
				</td>
			</tr>
		</table>
	</div>
	
	<!-- 窗口Window -->
	<div id="process-manage-dialog" style="padding:10px 0px;">
		<form id="process-manage-form" class="easyui-form" method="post" data-options="novalidate:true">
			<table style="width: 350px;margin: 0 auto;">
				<tr>
					<td>任务名称</td>
					<td><input class="easyui-textbox" name="processName" style="width:100%" data-options="required:true"></td>
					<td width="50"></td>
				</tr>
				<tr>
					<td>任务文件</td>
					<td><input class="easyui-textbox" name="processFile" style="width:100%" data-options="required:true"></td>
					<td width="50"><input type="hidden" name="id" value="0"></td>
				</tr>
			</table>
		</form>
	</div>						
</div>

<script type="text/javascript" src="/plugin/commons.js"></script>
<script type="text/javascript" src="/js/process/process-deploy-list.js"></script>