<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>

	<link rel="stylesheet" type="text/css" href="/plugin/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="/plugin/themes/icon.css" />
    <script type="text/javascript" src="/plugin/jquery.min.js"></script>
    <script type="text/javascript" src="/plugin/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/plugin/locale/easyui-lang-zh_CN.js"></script>
  </head>
  <body>
   <div id="loginWin" class="easyui-window" title="登录" style="width:350px;height:210px;padding:5px;"
         data-options="closable:false,minimizable:false,maximizable:false,collapsible:false,resizable:false,draggable:false">
        <div class="easyui-layout" data-options="fit: true">
            <div data-options="region:'center',border:false" style="padding:5px;background:#fff;border:1px solid #ccc;">
                <form id="loginForm" method="post" action="/login">
                    <div style="padding:5px 0;">
                        <input class="easyui-textbox" name="username" style="width:260px;" data-options="label:'账号:',required:true">
                    </div>
                    <div style="padding:5px 0;">
                        <input class="easyui-passwordbox" name="password" style="width:260px;" data-options="label:'密码:',required:true">
                    </div>
                    <div style="padding:5px 0;">
                        <input class="easyui-textbox" name="captcha" style="width:150px;" data-options="label:'验证码:',required:true">
                        <img src="/kaptcha/backloginCapt" width="100" height="25" style="vertical-align:middle;">
                    </div>
                    <div style="padding:5px 0;text-align: center;color: red;" id="showMsg">${message}</div>
                </form>
            </div>
            <div style="text-align:right;padding:5px 0;" data-options="region:'south',border:false">
                <a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()" style="width:60px">登&nbsp;&nbsp;录</a>
            </div>
        </div>
    </div>
	<script type="text/javascript">
		function submitForm(){
			$('#loginForm').submit();
		}
	</script>
  </body>
</html>