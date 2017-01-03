<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div title="流程管理" style="padding:0px;">
	<!-- Grid -->
	<table id="process-manage-grid"></table>
	
	<!-- ToolBar -->
	<div id="process-manage-tbar">
		<table cellpadding="0" cellspacing="0" style="width:100%">
			<tr>
				<td>
					<a href="#" class="easyui-linkbutton" iconCls="grid-add" plain="true" onclick="Module.addModule()">新增</a>
					<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
					<a href="#" class="easyui-linkbutton" iconCls="grid-edit" plain="true" onclick="Module.updateModule()">修改</a>
					<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
					<a href="#" class="easyui-linkbutton" iconCls="grid-del" plain="true" onclick="Module.deleteModule()">删除</a>
				</td>
				<td style="text-align:right">
					<input type="text" class="easyui-textbox" id="sysModuleName" data-options="prompt:'输入模块名称'"/>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="Module.searchModule()">查询</a>
				</td>
			</tr>
		</table>
	</div>							
</div>

<script type="text/javascript" src="/js/process/process-manage-list.js"></script>