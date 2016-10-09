var TaskInfo = {
	grid: '#taskinfo-grid',
	form: '#taskinfoForm',
	
	init: function(){
		//初始化Grid列表数据
		this.initGrid();
	},
	
	//添加模块
	addTaskInfo: function(){
		var d = this.createTaskInfoDialog();
		d.dialog({title: "新增定时任务"}).dialog('open');
	},
	
	//修改模块弹出修改框
	updateTaskInfo: function() {
		var message = Ext.getSingleSelected(this.grid);
		if(message){
			return Ext.alert(message);
		}
		
		this.update();
	},
	
	//执行更新操作
	update: function() {
		var record = Ext.getRecord(TaskInfo.grid);
		var d = this.createTaskInfoDialog();
		d.dialog({title: "修改定时任务--"+record.moduleName}).dialog('open');
		
		//加载form表单
		$(this.form).form('load', record);
		$('#taskinfoForm input[name=id]').val(1);
	},
	
	//删除模块
	deleteTaskInfo: function(){
		var message = Ext.getSingleSelected(this.grid);
		if(message){
			return Ext.alert(message);
		}
		
		Ext.confirm('您确认要删除这条记录吗?', function(){
			Ext.progress('正在删除数据...');
			var record = Ext.getRecord(TaskInfo.grid);
			$.get("/admin/task/delete/"+record.jobName+"/"+record.jobGroup, function(result){
				if(result.errorCode==0){
					$(TaskInfo.grid).datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	//模块详情
	detailTaskInfo: function(index){
		$(TaskInfo.grid).datagrid('selectRow',index); 
		var row = Ext.getRecord(this.grid);
		if(!row){return;}
		
		//弹出Dialog, 并修改Title和隐藏Button
		var d = this.createTaskInfoDialog();
		d.dialog({title: "查看定时任务"}).dialog('open');
		$(".dialog-button a").eq(0).hide();
		
		$(this.form).form('load', row)
	},
	
	//保存模块
	saveTaskInfo: function(){
		$(TaskInfo.form).form('submit',{
	        url: '/admin/task/save',
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
	            	var d = TaskInfo.createTaskInfoDialog();
	            	d.dialog('close');
	            	$(TaskInfo.grid).datagrid("reload");
	            }else{
	            	Ext.alert(result.errorText);
	            }
	            
	            Ext.progressClose();
	        }
	    });
	},
	
	//初始化表单
	initGrid: function(){
		$(this.grid).datagrid({
			toolbar: '#taskinfo-tbar',
		    url:'/admin/task/list',
		    method: 'post',
		    fitColumns: true,
		    striped: true,
		    fit: true,
		    pagination:false,
	        rownumbers:true,
	        ctrlSelect: false,
	        singleSelect: true,
		    columns:[[
				{field:'id',title:'',checkbox:'true', width:20},
				{field:'jobName',title:'任务类',width:120,formatter:function(v,r,i){return '<a href="javascript:void(0)" onclick="TaskInfo.detailTaskInfo('+i+')">'+v+'</a>';}},
				{field:'jobGroup',title:'任务分组',width:50},
				{field:'jobDescription',title:'描述',width:120},
				{field:'jobStatus',title:'状态',width:50},
				{field:'cronExpression',title:'表达式',width:60},
				{field:'createTime',title:'创建时间',width:50}
		    ]]
		});	
	},
	
	//模块框
	createTaskInfoDialog: function() {
		$(this.form).form('reset');
		$('#taskinfoForm input[name=id]').val(0);
		
		var d = $('#taskinfoDialog').dialog({
		    width:500,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false,
		    resizable: false,
		    modal: true,
		    iconCls: 'icon-win',
		    buttons: [
		       {text: '保 存', handler: this.saveTaskInfo}, 
		       {text: '关 闭', handler: function(){d.dialog('close');}}
		    ] 
		});
		return d;
	}
}