<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Netty WebSocket</title>
<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="/resources/css/chat.css" rel="stylesheet">

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="/resources/js/jquery-1.7.2.min.js"><\/script>')</script>
<!--[if lt IE 9]>
  <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<!--[if lt IE 7]>
<script src="/resources/js/IE7.js" type="text/javascript"></script>
<![endif]-->
<!--[if IE 6]>
<script src="/resources/js/iepng.js" type="text/javascript"></script>
<script type="text/javascript">
EvPNG.fix('body, div, ul, img, li, input, a, span ,label'); 
</script>
<![endif]-->

<script src="/resources/js/chat.js"></script>
</head>

<body class="keBody">
<div class="kePublic">
<!--效果html开始-->
    <div class="content">
        <div class="chatBox">
            <div class="chatLeft">
                <div class="chat01">
                    <div class="chat01_title">
                        <ul class="talkTo">
                            <li><a href="javascript:;" id="curName">Person</a></li></ul>
                        <a class="close_btn" href="javascript:;"></a>
                    </div>
                    <!-- Chat Content -->
                    <div class="chat01_content"></div>
                </div>
                <div class="chat02">
                    <div class="chat02_title">
                    	<a class="chat02_title_btn ctb01" href="javascript:;"></a>
                        <label class="chat02_title_t"><a href="#">聊天记录</a></label>
                        <div class="wl_faces_box">
                            <div class="wl_faces_content">
                                <div class="title">
                                    <ul>
                                        <li class="title_name">常用表情</li><li class="wl_faces_close"><span>&nbsp;</span></li></ul>
                                </div>
                                <div class="wl_faces_main">
                                    <ul>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_01.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_02.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_03.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_04.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_05.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_06.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_07.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_08.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_09.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_10.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_11.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_12.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_13.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_14.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_15.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_16.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_17.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_18.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_19.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_20.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_21.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_22.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_23.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_24.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_25.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_26.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_27.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_28.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_29.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_30.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_31.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_32.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_33.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_34.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_35.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_36.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_37.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_38.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_39.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_40.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_41.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_42.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_43.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_44.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_45.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_46.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_47.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_48.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_49.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_50.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_51.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_52.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_53.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_54.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_55.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_56.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_57.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="/resources/img/emo_58.gif" /></a></li><li><a href="javascript:;">
                                                <img src="/resources/img/emo_59.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="/resources/img/emo_60.gif" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="wlf_icon"></div>
                        </div>
                    </div>
                    <div class="chat02_content">
                        <textarea id="textarea"></textarea>
                    </div>
                    <div class="chat02_bar">
                        <ul>
                            <li style="left: 20px; top: 10px; padding-left: 30px;"></li>
                            <li style="right: 5px; top: 5px;"><a href="javascript:;">
                                <img src="/resources/img/send_btn.jpg"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chatRight">
                <div class="chat03">
                    <div class="chat03_title">
                        <label class="chat03_title_t">成员列表</label>
                    </div>
                    <div class="chat03_content" id="chatList">
                        <ul></ul>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
</div>

<input type="hidden" id="Token" value="${token}">
</body>
</html>