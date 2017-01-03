var ProcessManage = {
	thiz: null,
	grid: '#process-manage-grid',
	tbar: '#process-manage-tbar',
	
	init: function(){
		thiz= this;
		
		//初始化Grid列表数据
		thiz.initGrid();
	},
	
	//添加模块
	addModule: function(){
		var d = this.createModuleDialog();
		d.dialog({title: "新增模块"}).dialog('open');
	},
	
	//修改模块弹出修改框
	updateModule: function() {
		var message = Ext.getSingleSelected(thiz.grid);
		if(message){
			return Ext.alert(message);
		}
		
		this.update();
	},
	
	//执行更新操作
	update: function() {
		var record = Ext.getRecord(thiz.grid);
		var d = this.createModuleDialog();
		d.dialog({title: "修改模块--"+record.moduleName}).dialog('open');
		
		//加载form表单
		$("#sysModuleForm").form('load', record)
	},
	
	//删除模块
	deleteModule: function(){
		var message = Ext.getSingleSelected('#sys-module-grid');
		if(message){
			return Ext.alert(message);
		}
		
		Ext.confirm('您确认要删除这条记录吗?', function(){
			Ext.progress('正在删除数据...');
			var rows = Ext.getRecord('#sys-module-grid');
			$.get("/admin/sysmodule/delete/"+rows.id, function(result){
				if(result.errorCode==0){
					$("#sys-module-grid").datagrid("reload")
				}else{
					Ext.alert(result.errorText);
				}
				Ext.progressClose();
			});
		});
	},
	
	searchModule: function() {
		$("#sys-module-grid").datagrid("load", {sysModuleName: $('#sysModuleName').val()})
	},
	
	//模块详情
	detailModule: function(index){
		$('#sys-module-grid').datagrid('selectRow',index); 
		var row = Ext.getRecord('#sys-module-grid');
		if(!row){return;}
		
		//弹出Dialog, 并修改Title和隐藏Button
		var d = this.createModuleDialog();
		d.dialog({title: "查看模块--"+row.moduleName}).dialog('open');
		$(".dialog-button a").eq(0).hide();
		
		$("#sysModuleForm").form('load', row)
	},
	
	//保存模块
	saveModule: function(){
		$('#sysModuleForm').form('submit',{
	        url: '/admin/sysmodule/save',
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
	            	var d = Module.createModuleDialog();
	            	d.dialog('close');
	            	$("#sys-module-grid").datagrid("reload");
	            }else{
	            	Ext.alert(result.errorText);
	            }
	            
	            Ext.progressClose();
	        }
	    });
	},
	
	//初始化表单
	initGrid: function(){
		$(thiz.grid).datagrid({
			toolbar: thiz.tbar,
		    url:'/admin/sysmodule/list',
		    method: 'post',
		    fitColumns: true,
		    striped: true,
		    fit: true,
		    pagination:true,
	        rownumbers:true,
	        ctrlSelect: false,
	        singleSelect: true,
	        pageList: [20,40,80,100],
	        pageSize: 20,
		    columns:[[
				{field:'id',title:'',checkbox:'true', width:20},
				{field:'moduleName',title:'模块名称',width:80,formatter:function(v,r,i){return '<a href="javascript:void(0)" onclick="Module.detailModule('+i+')">'+v+'</a>';}},
				{field:'moduleUrl',title:'模块路径',width:100},
				{field:'moduleParentName',title:'上级模块',width:80},
				{field:'moduleRemark',title:'描述',width:120},
				{field:'moduleType',title:'类型',width:30,formatter:function(v){return v==1?'菜单':'功能'}},
				{field:'sequence',title:'排序',width:30},
				{field:'status',title:'是否启用',width:30,formatter:function(v){return v==0?'否':'是'}},
				{field:'createDate',title:'创建时间',width:60}
		    ]]
		});	
	},
	
	//模块框
	createModuleDialog: function() {
		$('#sysModuleForm').form('clear');
		$('#sysModuleForm input[name=status][value=1]').prop('checked', true);
		$('#sysModuleForm input[name=moduleType][value=1]').prop('checked', true);
		$('#sysModuleForm input[name=id]').val(0);
		
		var d = $('#sysModuleDialog').dialog({
		    width:500,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false,
		    resizable: false,
		    modal: true,
		    iconCls: 'icon-win',
		    buttons: [
		       {text: '保 存', handler: this.saveModule}, 
		       {text: '关 闭', handler: function(){d.dialog('close');}}
		    ] 
		});
		return d;
	}
}

//JS入口
(function($) {
	ProcessManage.init();
})(jQuery);
