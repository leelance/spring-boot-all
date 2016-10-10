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
		d.dialog({title: "Add Job"}).dialog('open');
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
		d.dialog({title: "Edit Job"}).dialog('open');
		
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
			Ext.progress('Loading...');
			var record = Ext.getRecord(TaskInfo.grid);
			$.get("/delete/"+record.jobName+"/"+record.jobGroup, function(result){
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
		d.dialog({title: "Detail Job"}).dialog('open');
		$(".dialog-button a").eq(0).hide();
		$(this.form).form('load', row)
	},
	
	//保存模块
	saveTaskInfo: function(){
		$(TaskInfo.form).form('submit',{
	        url: '/save',
	        onSubmit: function(){
	        	var flag = $(this).form('enableValidation').form('validate');
	        	if(flag) {
	        		Ext.progress('Loading...');
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
	
	//暂停
	pauseTaskInfo: function(index) {
		$(TaskInfo.grid).datagrid('selectRow',index); 
		var row = Ext.getRecord(this.grid);
		if(!row){return;}
		
		Ext.confirm('您确认要暂停该任务吗?', function(){
			Ext.progress('正在暂停任务...');
			var record = Ext.getRecord(TaskInfo.grid);
			$.get("/pause/"+record.jobName+"/"+record.jobGroup, function(result){
				if(result.errorCode==0){
					$(TaskInfo.grid).datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	//开始
	resumeTaskInfo: function(index) {
		$(TaskInfo.grid).datagrid('selectRow',index); 
		var row = Ext.getRecord(this.grid);
		if(!row){return;}
		
		Ext.confirm('您确认要重新开始该任务吗?', function(){
			Ext.progress('正在开始任务...');
			var record = Ext.getRecord(TaskInfo.grid);
			$.get("/resume/"+record.jobName+"/"+record.jobGroup, function(result){
				if(result.errorCode==0){
					$(TaskInfo.grid).datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	//初始化表单
	initGrid: function(){
		$(this.grid).datagrid({
			toolbar: '#taskinfo-tbar',
		    url:'/list',
		    method: 'post',
		    fitColumns: true,
		    striped: true,
		    fit: true,
		    pagination:false,
	        rownumbers:true,
	        ctrlSelect: false,
	        singleSelect: true,
	        border: false,
		    columns:[[
				{field:'id',title:'',checkbox:'true', width:20},
				{field:'jobName',title:'JobName',width:120,formatter:function(v,r,i){return '<a href="javascript:void(0)" onclick="TaskInfo.detailTaskInfo('+i+')">'+v+'</a>';}},
				{field:'jobGroup',title:'JobGroup',width:50},
				{field:'jobDescription',title:'JobDescription',width:120},
				{field:'jobStatus',title:'JobStatus',width:50},
				{field:'cronExpression',title:'CronExpression',width:60},
				{field:'createTime',title:'CreateTime',width:70},
				{field:'Opr',title:'Opr',width:40,formatter:function(v,r,i){
						var val = '';
						if(r.jobStatus == 'NORMAL') {
							val = '<a href="javascript:void(0)" onclick="TaskInfo.pauseTaskInfo('+i+')">暂停</a>'
						}else if(r.jobStatus == 'PAUSED'){
							val = '<a href="javascript:void(0)" onclick="TaskInfo.resumeTaskInfo('+i+')">开始</a>'
						}
						return val;
					}
				}
		    ]]
		});	
	},
	
	//模块框
	createTaskInfoDialog: function() {
		$(this.form).form('clear');
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
		       {text: 'Save', handler: this.saveTaskInfo}, 
		       {text: 'Close', handler: function(){d.dialog('close');}}
		    ] 
		});
		return d;
	}
}