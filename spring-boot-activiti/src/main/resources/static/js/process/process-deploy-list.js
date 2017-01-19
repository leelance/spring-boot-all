var ProcessManage = {
	thiz: null,
	grid: '#process-manage-grid',
	tbar: '#process-manage-tbar',
	form: '#process-manage-form',
	dialog: '#process-manage-dialog',
	
	init: function(){
		thiz = this;
		
		//初始化Grid列表数据
		thiz.initGrid();
	},
	
	//新增按钮事件
	addProcess: function() {
		var d = thiz.createProcessDialog();
		d.dialog({title: "新增流程"}).dialog('open');
	},
	
	//修改流程
	update: function() {
		var message = Ext.getSingleSelected(thiz.grid);
		if(message){
			return Ext.alert(message);
		}
		
		var record = Ext.getRecord(thiz.grid);
		var d = this.createProcessDialog();
		d.dialog({title: "修改流程--"+record.processName}).dialog('open');
		
		//加载form表单
		$(thiz.form).form('load', record)
	},
	
	//删除流程定义
	del: function() {
		var message = Ext.getSingleSelected(thiz.grid);
		if(message){
			return Ext.alert(message);
		}
		
		Ext.confirm('您确认要删除这条记录吗?', function(){
			Ext.progress('正在删除数据...');
			var row = Ext.getRecord(thiz.grid);
			$.get("/admin/process/manage/delete/"+row.id, function(result){
				if(result.errorCode==0){
					$(thiz.grid).datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	//查询流程
	search: function() {
		$(thiz.grid).datagrid("load", {processName: $('#processName').val()})
	},
	
	//初始化表单
	initGrid: function(){
		$(thiz.grid).datagrid({
			toolbar: thiz.tbar,
		    url:'/admin/process/manage/list',
		    method: 'post',
		    fitColumns: true,
		    striped: true,
		    fit: true,
		    pagination: true,
	        rownumbers: true,
	        ctrlSelect: false,
	        singleSelect: true,
	        pageList: [20,40,80,100],
	        pageSize: 20,
		    columns:[[
				{field:'id',title:'',checkbox:'true', width:20},
				{field:'processName',title:'流程名称',width:80},
				{field:'processKey',title:'流程Key',width:80},
				{field:'processFile',title:'流程文件',width:120},
				{field:'createTime',title:'创建时间',width:80}
		    ]]
		});	
	},
	
	//创建新增对话框
	createProcessDialog: function(){
		$(thiz.form).form('reset');
		$(thiz.form).find('input[name=id]').val(0);
		
		var d = $(thiz.dialog).dialog({
		    width:400,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false,
		    resizable: false,
		    modal: true,
		    iconCls: 'icon-win',
		    buttons: [
		       {text: '保 存', handler: thiz.saveProcess}, 
		       {text: '关 闭', handler: function(){d.dialog('close');}}
		    ] 
		});
		return d;
	},
	
	//保存数据
	saveProcess: function() {
		$(thiz.form).form('submit',{
	        url: '/admin/process/manage/save',
	        onSubmit: function(){
	        	var flag = $(this).form('enableValidation').form('validate');
	        	if(flag) {
	        		Ext.progress('正在保存数据...');
	        	}
	            return flag;
	        },
	        success: function(result){
	        	result = $.parseJSON(result);
	            if(result.errorCode ==0){
	            	var d = thiz.createProcessDialog();
	            	d.dialog('close');
	            	$(thiz.grid).datagrid("reload");
	            }else{
	            	Ext.alert(result.errorText);
	            }
	            
	            Ext.progressClose();
	        }
	    });
	}
}

//JS入口
$(document).ready(function(){
	ProcessManage.init();
});
