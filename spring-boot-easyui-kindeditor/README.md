# spring-boot-easyui-kindeditor, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Easyui](http://www.jeasyui.net/)
* [Kindeditor](http://kindeditor.org/demo)

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-easyui-kindeditor/easyui-kindeditor-dialog.jpg)

> * 项目启动后输入：http://localhost/


application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=EasyUI-KindEditor-Dialog.v1.1
spring.application.name=EasyUI-KindEditor-Dialog

#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

security.basic.enabled=false
management.security.enabled=false

#MVC
spring.mvc.view.prefix=/WEB-INF/views/
spring.resources.static-locations=classpath:/static/

security.basic.enabled=false
management.security.enabled=false

#LOG
logging.config=classpath:log4j2.xml
```
configuration
```java
@SpringBootApplication
public class SimpleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleApplication.class, args);
	}
}
```
JS
```js
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
```
