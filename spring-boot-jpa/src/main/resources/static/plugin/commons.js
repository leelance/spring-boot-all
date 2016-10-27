var Ext = function() {
	return {
		/** date-box 格式化日期 */
		formatDate : function(date) {
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
					+ date.getDate();
		},

		formatDateTime : function(date) {
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
					+ date.getDate() + " " + date.getHours() + ":"
					+ date.getMinutes() + ":" + date.getSeconds();
		},
		
		/**
		 * 在页面中任何嵌套层次的窗口中获取顶层窗口
		 * @return 当前页面的顶层窗口对象
		 */
		getTopWinow : function() {
			var p = window;
			while (p != p.parent) {
				p = p.parent;
			}
			return p;
		},
		
		/**
		 * 单选按钮组默认选中
		 * @param name 按钮组名称
		 * @param selectValue 选中项的值
		 */
		selectRadio : function(name, selectValue) {
			$('[name="' + name + '"]:radio').each(function() {
				if (this.value == selectValue) {
					this.checked = "checked";
				}
			});
		},
		
		/**
		 * 根据GridID获取选择集合
		 * @param GridID
		 */
		getSelections: function(id) {
			return $(id).datagrid('getSelections');
		},
		
		/**
		 * 根据GridID获取选择集合
		 * @param GridID
		 */
		getSingleSelected : function(id, nullMessage, oneMessage) {
			var message = null;
			var rows = this.getSelections(id);
			if(rows.length == 0){
				message = nullMessage || '请选择记录!';
			}else if(rows.length > 1){
				message = oneMessage || '一次只能选择一条记录!';
			}
			return message;
		},
		
		/**获取选择单行记录值*/
		getRecord: function(id) {
			return $(id).datagrid('getSelected');
		},
		
		/**Alert弹框提示*/
		alert: function(message, title) {
			var _title = title || '提示';
			$.messager.alert(_title, message);
		},
		
		/**Confirm确认框*/
		confirm: function(message, callback, title){
			var _title = title || '提示';
			$.messager.confirm(_title, message, function (r) {  
		        if (r) {  
		            if (jQuery.isFunction(callback)){callback.call();}
		        }  
		    }); 
		},
		
		/**进度条加载*/
		progress: function(message, title) {
			var _title = title || '请等待';
			var _message = message || '正在加载数据...';
			$.messager.progress({
				title: _title,
				msg: _message
			});
		},
		
		/**进度条关闭*/
		progressClose: function() {
			$.messager.progress('close');
		},
		
		/**Tree全选和反选*/
		treeChecked: function(treeId, checked) {
			var nodes = $(treeId).tree('getChildren'); 
			for(var i=0; i<nodes.length; i++) {
				$(treeId).tree(checked?'check':'uncheck',nodes[i].target);
			}		    
		}
	}
}();

$.ajaxSetup({
	complete : function(request, textStatus) {
		// 通过XMLHttpRequest取得响应头,sessionstatus，
		var sessionstatus = request.getResponseHeader("sessionstatus");
		if (sessionstatus == 'timeout') {
			// 如果超时就处理 ，指定要跳转的页面
			var top = Ext.getTopWinow(); // 获取当前页面的顶层窗口对象
			top.location.href = "/back/login"; // 跳转到登陆页面
		}
		
		//访问频率
		var timerInterval = request.getResponseHeader('TimeInterval');
		if (timerInterval != null && timerInterval != '') {
			$.messager.alert('提示', '操作间隔为' + timerInterval + '秒，请不要频繁操作');
		}
	}
});


/**
 * 扩展easyui的validator插件rules，支持更多类型验证
 */
$.extend($.fn.validatebox.defaults.rules,{
	 // 判断最小长度
	minLength : {
		validator : function(value, param) {
			return value.length >= param[0];
		},
		message : '最少输入 {0} 个字符'
	},
	length: {// 长度
		validator : function(value, param) {
			var len = $.trim(value).length;
			return len >= param[0] && len <= param[1];
		},
		message : "输入内容长度必须介于{0}和{1}之间"
	},
	phone : {// 验证电话号码
		validator : function(value) {
			return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
					.test(value);
		},
		message : '格式不正确,请使用下面格式:020-88888888'
	},
	mobile : {// 验证手机号码
		validator : function(value) {
			return /^(13|14|15|17|18)\d{9}$/i.test(value);
		},
		message : '手机号码格式不正确'
	},
	phoneAndMobile : {// 电话号码或手机号码
		validator : function(value) {
			return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
					.test(value)
					|| /^(13|14|15|17|18)\d{9}$/i.test(value);
		},
		message : '电话号码或手机号码格式不正确'
	},
	idcard : {// 验证身份证
		validator : function(value) {
			return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value)
					|| /^\d{18}(\d{2}[A-Za-z0-9])?$/i
							.test(value);
		},
		message : '身份证号码格式不正确'
	},
	intOrFloat : {// 验证整数或小数
		validator : function(value) {
			return /^\d+(\.\d+)?$/i.test(value);
		},
		message : '请输入数字，并确保格式正确'
	},
	currency : {// 验证货币
		validator : function(value) {
			return /^\d+(\.\d+)?$/i.test(value);
		},
		message : '货币格式不正确'
	},
	qq : {// 验证QQ,从10000开始
		validator : function(value) {
			return /^[1-9]\d{4,9}$/i.test(value);
		},
		message : 'QQ号码格式不正确'
	},
	integer : {// 验证整数
		validator : function(value) {
			return /^[+]?[1-9]+\d*$/i.test(value);
		},
		message : '请输入整数'
	},
	chinese : {// 验证中文
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/i.test(value);
		},
		message : '请输入中文'
	},
	chineseAndLength : {// 验证中文及长度
		validator : function(value) {
			var len = $.trim(value).length;
			if (len >= param[0] && len <= param[1]) {
				return /^[\u0391-\uFFE5]+$/i.test(value);
			}
		},
		message : '请输入中文'
	},
	english : {// 验证英语
		validator : function(value) {
			return /^[A-Za-z]+$/i.test(value);
		},
		message : '请输入英文'
	},
	englishAndLength : {// 验证英语及长度
		validator : function(value, param) {
			var len = $.trim(value).length;
			if (len >= param[0] && len <= param[1]) {
				return /^[A-Za-z]+$/i.test(value);
			}
		},
		message : '请输入英文'
	},
	englishUpperCase : {// 验证英语大写
		validator : function(value) {
			return /^[A-Z]+$/.test(value);
		},
		message : '请输入大写英文'
	},
	unnormal : {// 验证是否包含空格和非法字符
		validator : function(value) {
			return /.+/i.test(value);
		},
		message : '输入值不能为空和包含其他非法字符'
	},
	username : {// 验证用户名
		validator : function(value) {
			return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
		},
		message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
	},
	faxno : {// 验证传真
		validator : function(value) {
			return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
					.test(value);
		},
		message : '传真号码不正确'
	},
	zip : {// 验证邮政编码
		validator : function(value) {
			return /^[1-9]\d{5}$/i.test(value);
		},
		message : '邮政编码格式不正确'
	},
	ip : {// 验证IP地址
		validator : function(value) {
			return /d+.d+.d+.d+/i.test(value);
		},
		message : 'IP地址格式不正确'
	},
	name : {// 验证姓名，可以是中文或英文
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/i.test(value)
					| /^\w+[\w\s]+\w+$/i.test(value);
		},
		message : '请输入姓名'
	},
	engOrChinese : {// 可以是中文或英文
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/i.test(value)
					| /^\w+[\w\s]+\w+$/i.test(value);
		},
		message : '请输入中文'
	},
	engOrChineseAndLength : {// 可以是中文或英文
		validator : function(value) {
			var len = $.trim(value).length;
			if (len >= param[0] && len <= param[1]) {
				return /^[\u0391-\uFFE5]+$/i.test(value)
						| /^\w+[\w\s]+\w+$/i.test(value);
			}
		},
		message : '请输入中文或英文'
	},
	carNo : {
		validator : function(value) {
			return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value);
		},
		message : '车牌号码无效（例：粤B12350）'
	},
	carenergin : {
		validator : function(value) {
			return /^[a-zA-Z0-9]{16}$/.test(value);
		},
		message : '发动机型号无效(例：FG6H012345654584)'
	},
	same : {
		validator : function(value, param) {
			if ($("#" + param[0]).val() != "" && value != "") {
				return $("#" + param[0]).val() == value;
			} else {
				return true;
			}
		},
		message : '两次输入的密码不一致!'
	}
});
