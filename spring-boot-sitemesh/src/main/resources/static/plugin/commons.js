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
			return /^(13|15|18)\d{9}$/i.test(value);
		},
		message : '手机号码格式不正确'
	},
	phoneAndMobile : {// 电话号码或手机号码
		validator : function(value) {
			return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
					.test(value)
					|| /^(13|15|18)\d{9}$/i.test(value);
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
/**
 * 扩展easyui validatebox的两个方法.移除验证和还原验证
 */
$.extend($.fn.validatebox.methods, {
	remove : function(jq, newposition) {
		return jq.each(function() {
			$(this).removeClass("validatebox-text validatebox-invalid").unbind(
					'focus.validatebox').unbind('blur.validatebox');
			// remove tip
			// $(this).validatebox('hideTip', this);
		});
	},
	reduce : function(jq, newposition) {
		return jq.each(function() {
			var opt = $(this).data().validatebox.options;
			$(this).addClass("validatebox-text").validatebox(opt);
			// $(this).validatebox('validateTip', this);
		});
	},
	validateTip : function(jq) {
		jq = jq[0];
		var opts = $.data(jq, "validatebox").options;
		var tip = $.data(jq, "validatebox").tip;
		var box = $(jq);
		var value = box.val();
		function setTipMessage(msg) {
			$.data(jq, "validatebox").message = msg;
		}
		;
		var disabled = box.attr("disabled");
		if (disabled == true || disabled == "true") {
			return true;
		}
		if (opts.required) {
			if (value == "") {
				box.addClass("validatebox-invalid");
				setTipMessage(opts.missingMessage);
				$(jq).validatebox('showTip', jq);
				return false;
			}
		}
		if (opts.validType) {
			var result = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
			var rule = opts.rules[result[1]];
			if (value && rule) {
				var param = eval(result[2]);
				if (!rule["validator"](value, param)) {
					box.addClass("validatebox-invalid");
					var message = rule["message"];
					if (param) {
						for (var i = 0; i < param.length; i++) {
							message = message.replace(new RegExp("\\{" + i
									+ "\\}", "g"), param[i]);
						}
					}
					setTipMessage(opts.invalidMessage || message);
					$(jq).validatebox('showTip', jq);
					return false;
				}
			}
		}
		box.removeClass("validatebox-invalid");
		$(jq).validatebox('hideTip', jq);
		return true;
	},
	showTip : function(jq) {
		jq = jq[0];
		var box = $(jq);
		var msg = $.data(jq, "validatebox").message
		var tip = $.data(jq, "validatebox").tip;
		if (!tip) {
			tip = $(
					"<div class=\"validatebox-tip\">"
							+ "<span class=\"validatebox-tip-content\">"
							+ "</span>"
							+ "<span class=\"validatebox-tip-pointer\">"
							+ "</span>" + "</div>").appendTo("body");
			$.data(jq, "validatebox").tip = tip;
		}
		tip.find(".validatebox-tip-content").html(msg);
		tip.css({
			display : "block",
			left : box.offset().left + box.outerWidth(),
			top : box.offset().top
		});
	},
	hideTip : function(jq) {
		jq = jq[0];
		var tip = $.data(jq, "validatebox").tip;
		if (tip) {
			tip.remove;
			$.data(jq, "validatebox").tip = null;
		}
	}
});