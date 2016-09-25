<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>测试EasyUI-KindEditor-Dialog</title>
	<link rel="stylesheet" href="/plugin/themes/default/easyui.css">
	<link rel="stylesheet" href="/plugin/themes/icon.css">
	<script charset="utf-8" src="/plugin/jquery.min.js"></script>
	<script charset="utf-8" src="/plugin/jquery.easyui.min.js"></script>
	<script charset="utf-8" src="/plugin/locale/easyui-lang-zh_CN.js"></script>
	
	<!-- 编辑器引入 -->
	<link rel="stylesheet" href="/editor/themes/default/default.css" />
	<script charset="utf-8" src="/editor/kindeditor-all-min.js"></script>
	<script charset="utf-8" src="/editor/lang/zh-CN.js"></script>
	
	<!-- 自定义  -->
	<script charset="utf-8" src="/plugin/commons.js"></script>
</head>
<body>
<h2>Test EasyUI-KindEditor-Dialog!</h2>
<table class="easyui-datagrid" title="Product Table" style="width:100%;height:250px" id="index-grid"
			data-options="singleSelect:true,
			collapsible:false,
			url:'/js/datagrid_data1.json',
			method:'get',
			fit: true,
			fitColumns: true,
			striped: true,
			rownumbers:true,
			iconCls:'icon-win',
			toolbar:'#tbar'">
	<thead>
		<tr>
			<th data-options="field:'id',checkbox:'true', width:20"></th>
			<th data-options="field:'itemid',width:80,formatter:Index.itemIdFormat">Item ID</th>
			<th data-options="field:'productid',width:100">Product</th>
			<th data-options="field:'productname',width:100">Product</th>
			<th data-options="field:'listprice',width:80,align:'right'">List Price</th>
			<th data-options="field:'unitcost',width:80,align:'right'">Unit Cost</th>
			<th data-options="field:'attr1',width:250">Attribute</th>
			<th data-options="field:'status',width:60,align:'center'">Status</th>
		</tr>
	</thead>
</table>
	
<!-- ToolBar -->
<div id="tbar">
	<table cellpadding="0" cellspacing="0" style="width:100%">
		<tr>
			<td>
				<a href="#" class="easyui-linkbutton" iconCls="grid-add" plain="true" onclick="Index.addProduct()">新增</a>
				<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
				<a href="#" class="easyui-linkbutton" iconCls="grid-edit" plain="true" onclick="Index.updateProduct()">修改</a>
				<div class="datagrid-btn-separator" style="vertical-align: middle; height: 15px;display:inline-block;float:none"></div>
				<a href="#" class="easyui-linkbutton" iconCls="grid-del" plain="true" onclick="Index.deleteProduct()">删除</a>
			</td>
			<td style="text-align:right">
				<input type="text" class="easyui-textbox" id="name" data-options="prompt:'输入产品名称'"/>
				<a href="#" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="Index.searchProduct()">查询</a>
			</td>
		</tr>
	</table>
</div>

<!-- 窗口Window -->
<div id="indexDialog" style="padding:10px 0px;">
	<form id="indexForm" class="easyui-form" method="post" data-options="novalidate:true">
		<table style="width: 750px;margin: 0 auto;">
			<tr>
				<td>ItemId</td>
				<td><input class="easyui-textbox" name="itemid" style="width:50%" data-options="required:true"></td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>ProductId</td>
				<td><input class="easyui-textbox" name="productid" style="width:50%" data-options="required:true"></td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>ProductName</td>
				<td><input class="easyui-textbox" name="productname" style="width:50%;" data-options="required:true"></td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>UnitCost</td>
				<td><input class="easyui-textbox" name="unitcost" style="width:50%;" data-options="required:true"></td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>ListPrice</td>
				<td><input class="easyui-textbox" name="listprice" style="width:50%;" data-options="required:true"></td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>Status</td>
				<td>
					<span class="easyui-fluid" style="width: 313px;height: 26px; line-height: 26px;">
						<input type="radio" name="status" value="P" class="easyui-validatebox" checked="checked"/>P
						<input type="radio" name="status" class="easyui-validatebox" value="T"/>T
					</span>
				</td>
				<td width="200"></td>
			</tr>
			<tr>
				<td>Attribute</td>
				<td colspan="2">
					<textarea id="content_detail" name="attr1" style="height:200px;visibility: hidden;"></textarea>
					<input type="hidden" name="id" value="0">
				</td>
			</tr>
		</table>
	</form>
</div>
<script type="text/javascript">
var Index = {
	form: 'indexForm',
	grid: 'index-grid',
	init: function(){
		
	},
	
	//新增
	addProduct: function(){
		var d = this.createIndexDialog();
		d.dialog({title: "新增产品"}).dialog('open');
		this.openDialog();
	},
	
	//修改
	updateProduct: function(){
		var message = Ext.getSingleSelected(this.grid);
		if(message){
			return Ext.alert(message);
		}
		this.update();
	},
	
	//删除
	deleteProduct: function(){
		var message = Ext.getSingleSelected(this.grid);
		if(message){
			return Ext.alert(message);
		}
		
		Ext.confirm('您确认要删除这条记录吗?', function(){
			Ext.progress('正在删除数据...');
			
			setTimeout(function(){
				Ext.alert("删除成功!");
				Ext.progressClose();
			}, 2500)
		});
	},
	
	//查询
	searchProduct: function(){
		$("#"+this.grid).datagrid("load", {productname: $('#name').val()})
	},
	
	//详情
	detail: function(index){
		$('#'+this.grid).datagrid('selectRow',index); 
		var record = Ext.getRecord(this.grid);
		if(!record){return;}
		
		//弹出Dialog, 并修改Title和隐藏Button
		var d = this.createIndexDialog();
		d.dialog({title: "查看产品--"+record.itemid}).dialog('open');
		$(".dialog-button a").eq(0).hide();
		
		$('#content_detail').html(record.detail);
		$("#"+this.form).form('load', record);
		this.openDialog();
	},
	
	itemIdFormat: function(value, row, index){
		return '<a href="javascript:void(0)" onclick="Index.detail('+index+')">'+value+'</a>';
	},
	
	//执行更新操作
	update: function() {
		var record = Ext.getRecord(this.grid);
		var d = this.createIndexDialog();
		d.dialog({title: "修改产品"+record.itemid}).dialog('open');
		
		//加载form表单
		$('#content_detail').html(record.detail);
		$("#"+this.form).form('load', record);
		this.openDialog();
	},
	
	//Dialog框
	createIndexDialog: function() {
		$('#'+this.form).form('clear');
		$('#indexForm input[name=id]').val(0);
		var d = $('#indexDialog').dialog({
		    width:800,
		    height: 500,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false,
		    resizable: false,
		    modal: true,
		    iconCls: 'icon-win',
		    buttons: [
		       {text: '保 存'}, 
		       {text: '关 闭', handler: function(){d.dialog('close');}}
		    ],
			onBeforeClose: function(event, ui) {
				KindEditor.remove('#content_detail');
			}
		});
		return d;
	},
	
	//打开Dialog
	openDialog: function() {
		KindEditor.create('textarea[name="attr1"]', {
			resizeType: 1,
			allowImageUpload: true,
			items: [
				'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
				'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
				'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
				afterChange:function(){
					this.sync();
				}
		});
	}
}
</script>
</body>
</html>