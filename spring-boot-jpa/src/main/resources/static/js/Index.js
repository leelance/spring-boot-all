var Index = {
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
		var record = Ext.getRecord(Index.grid);
		var d = this.createTaskInfoDialog();
		d.dialog({title: "Update"}).dialog('open');
		
		//加载form表单
		$(this.form).form('load', record);
	},
	
	//删除模块
	deleteTaskInfo: function(){
		var message = Ext.getSingleSelected(this.grid);
		if(message){
			return Ext.alert(message);
		}
		
		Ext.confirm('您确认要删除这条记录吗?', function(){
			Ext.progress('Loading...');
			var record = Ext.getRecord(Index.grid);
			$.get("/delete/"+record.id, function(result){
				if(result.errorCode==0){
					$(Index.grid).datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	//保存模块
	saveTaskInfo: function(){
		$(Index.form).form('submit',{
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
	            	var d = Index.createTaskInfoDialog();
	            	d.dialog('close');
	            	$(Index.grid).datagrid("reload");
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
				{field:'name',title:'Name',width:120},
				{field:'sex',title:'Sex',width:50},
				{field:'createTime',title:'CreateTime',width:70}
		    ]]
		});	
	},
	
	//模块框
	createTaskInfoDialog: function() {
		$(this.form).form('clear');
		$('#taskinfoForm input[name=id]').val(0);
		
		var d = $('#taskinfoDialog').dialog({
		    width:320,
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