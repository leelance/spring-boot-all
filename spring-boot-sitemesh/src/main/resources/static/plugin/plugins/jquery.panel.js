/**
 * jQuery EasyUI 1.5
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _1(_2){
_2._remove();
};
function _3(_4,_5){
var _6=$.data(_4,"panel");
var _7=_6.options;
var _8=_6.panel;
var _9=_8.children(".panel-header");
var _a=_8.children(".panel-body");
var _b=_8.children(".panel-footer");
if(_5){
$.extend(_7,{width:_5.width,height:_5.height,minWidth:_5.minWidth,maxWidth:_5.maxWidth,minHeight:_5.minHeight,maxHeight:_5.maxHeight,left:_5.left,top:_5.top});
}
_8._size(_7);
_9.add(_a)._outerWidth(_8.width());
if(!isNaN(parseInt(_7.height))){
_a._outerHeight(_8.height()-_9._outerHeight()-_b._outerHeight());
}else{
_a.css("height","");
var _c=$.parser.parseValue("minHeight",_7.minHeight,_8.parent());
var _d=$.parser.parseValue("maxHeight",_7.maxHeight,_8.parent());
var _e=_9._outerHeight()+_b._outerHeight()+_8._outerHeight()-_8.height();
_a._size("minHeight",_c?(_c-_e):"");
_a._size("maxHeight",_d?(_d-_e):"");
}
_8.css({height:"",minHeight:"",maxHeight:"",left:_7.left,top:_7.top});
_7.onResize.apply(_4,[_7.width,_7.height]);
$(_4).panel("doLayout");
};
function _f(_10,_11){
var _12=$.data(_10,"panel");
var _13=_12.options;
var _14=_12.panel;
if(_11){
if(_11.left!=null){
_13.left=_11.left;
}
if(_11.top!=null){
_13.top=_11.top;
}
}
_14.css({left:_13.left,top:_13.top});
_14.find(".tooltip-f").each(function(){
$(this).tooltip("reposition");
});
_13.onMove.apply(_10,[_13.left,_13.top]);
};
function _15(_16){
$(_16).addClass("panel-body")._size("clear");
var _17=$("<div class=\"panel\"></div>").insertBefore(_16);
_17[0].appendChild(_16);
_17.bind("_resize",function(e,_18){
if($(this).hasClass("easyui-fluid")||_18){
_3(_16);
}
return false;
});
return _17;
};
function _19(_1a){
var _1b=$.data(_1a,"panel");
var _1c=_1b.options;
var _1d=_1b.panel;
_1d.css(_1c.style);
_1d.addClass(_1c.cls);
_1e();
_1f();
var _20=$(_1a).panel("header");
var _21=$(_1a).panel("body");
var _22=$(_1a).siblings(".panel-footer");
if(_1c.border){
_20.removeClass("panel-header-noborder");
_21.removeClass("panel-body-noborder");
_22.removeClass("panel-footer-noborder");
}else{
_20.addClass("panel-header-noborder");
_21.addClass("panel-body-noborder");
_22.addClass("panel-footer-noborder");
}
_20.addClass(_1c.headerCls);
_21.addClass(_1c.bodyCls);
$(_1a).attr("id",_1c.id||"");
if(_1c.content){
$(_1a).panel("clear");
$(_1a).html(_1c.content);
$.parser.parse($(_1a));
}
function _1e(){
if(_1c.noheader||(!_1c.title&&!_1c.header)){
_1(_1d.children(".panel-header"));
_1d.children(".panel-body").addClass("panel-body-noheader");
}else{
if(_1c.header){
$(_1c.header).addClass("panel-header").prependTo(_1d);
}else{
var _23=_1d.children(".panel-header");
if(!_23.length){
_23=$("<div class=\"panel-header\"></div>").prependTo(_1d);
}
if(!$.isArray(_1c.tools)){
_23.find("div.panel-tool .panel-tool-a").appendTo(_1c.tools);
}
_23.empty();
var _24=$("<div class=\"panel-title\"></div>").html(_1c.title).appendTo(_23);
if(_1c.iconCls){
_24.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_1c.iconCls).appendTo(_23);
}
var _25=$("<div class=\"panel-tool\"></div>").appendTo(_23);
_25.bind("click",function(e){
e.stopPropagation();
});
if(_1c.tools){
if($.isArray(_1c.tools)){
$.map(_1c.tools,function(t){
_26(_25,t.iconCls,eval(t.handler));
});
}else{
$(_1c.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_25);
});
}
}
if(_1c.collapsible){
_26(_25,"panel-tool-collapse",function(){
if(_1c.collapsed==true){
_4f(_1a,true);
}else{
_3c(_1a,true);
}
});
}
if(_1c.minimizable){
_26(_25,"panel-tool-min",function(){
_5a(_1a);
});
}
if(_1c.maximizable){
_26(_25,"panel-tool-max",function(){
if(_1c.maximized==true){
_5e(_1a);
}else{
_3b(_1a);
}
});
}
if(_1c.closable){
_26(_25,"panel-tool-close",function(){
_3d(_1a);
});
}
}
_1d.children("div.panel-body").removeClass("panel-body-noheader");
}
};
function _26(c,_27,_28){
var a=$("<a href=\"javascript:void(0)\"></a>").addClass(_27).appendTo(c);
a.bind("click",_28);
};
function _1f(){
if(_1c.footer){
$(_1c.footer).addClass("panel-footer").appendTo(_1d);
$(_1a).addClass("panel-body-nobottom");
}else{
_1d.children(".panel-footer").remove();
$(_1a).removeClass("panel-body-nobottom");
}
};
};
function _29(_2a,_2b){
var _2c=$.data(_2a,"panel");
var _2d=_2c.options;
if(_2e){
_2d.queryParams=_2b;
}
if(!_2d.href){
return;
}
if(!_2c.isLoaded||!_2d.cache){
var _2e=$.extend({},_2d.queryParams);
if(_2d.onBeforeLoad.call(_2a,_2e)==false){
return;
}
_2c.isLoaded=false;
if(_2d.loadingMessage){
$(_2a).panel("clear");
$(_2a).html($("<div class=\"panel-loading\"></div>").html(_2d.loadingMessage));
}
_2d.loader.call(_2a,_2e,function(_2f){
var _30=_2d.extractor.call(_2a,_2f);
$(_2a).panel("clear");
$(_2a).html(_30);
$.parser.parse($(_2a));
_2d.onLoad.apply(_2a,arguments);
_2c.isLoaded=true;
},function(){
_2d.onLoadError.apply(_2a,arguments);
});
}
};
function _31(_32){
var t=$(_32);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _33(_34){
$(_34).panel("doLayout",true);
};
function _35(_36,_37){
var _38=$.data(_36,"panel").options;
var _39=$.data(_36,"panel").panel;
if(_37!=true){
if(_38.onBeforeOpen.call(_36)==false){
return;
}
}
_39.stop(true,true);
if($.isFunction(_38.openAnimation)){
_38.openAnimation.call(_36,cb);
}else{
switch(_38.openAnimation){
case "slide":
_39.slideDown(_38.openDuration,cb);
break;
case "fade":
_39.fadeIn(_38.openDuration,cb);
break;
case "show":
_39.show(_38.openDuration,cb);
break;
default:
_39.show();
cb();
}
}
function cb(){
_38.closed=false;
_38.minimized=false;
var _3a=_39.children(".panel-header").find("a.panel-tool-restore");
if(_3a.length){
_38.maximized=true;
}
_38.onOpen.call(_36);
if(_38.maximized==true){
_38.maximized=false;
_3b(_36);
}
if(_38.collapsed==true){
_38.collapsed=false;
_3c(_36);
}
if(!_38.collapsed){
_29(_36);
_33(_36);
}
};
};
function _3d(_3e,_3f){
var _40=$.data(_3e,"panel");
var _41=_40.options;
var _42=_40.panel;
if(_3f!=true){
if(_41.onBeforeClose.call(_3e)==false){
return;
}
}
_42.find(".tooltip-f").each(function(){
$(this).tooltip("hide");
});
_42.stop(true,true);
_42._size("unfit");
if($.isFunction(_41.closeAnimation)){
_41.closeAnimation.call(_3e,cb);
}else{
switch(_41.closeAnimation){
case "slide":
_42.slideUp(_41.closeDuration,cb);
break;
case "fade":
_42.fadeOut(_41.closeDuration,cb);
break;
case "hide":
_42.hide(_41.closeDuration,cb);
break;
default:
_42.hide();
cb();
}
}
function cb(){
_41.closed=true;
_41.onClose.call(_3e);
};
};
function _43(_44,_45){
var _46=$.data(_44,"panel");
var _47=_46.options;
var _48=_46.panel;
if(_45!=true){
if(_47.onBeforeDestroy.call(_44)==false){
return;
}
}
$(_44).panel("clear").panel("clear","footer");
_1(_48);
_47.onDestroy.call(_44);
};
function _3c(_49,_4a){
var _4b=$.data(_49,"panel").options;
var _4c=$.data(_49,"panel").panel;
var _4d=_4c.children(".panel-body");
var _4e=_4c.children(".panel-header").find("a.panel-tool-collapse");
if(_4b.collapsed==true){
return;
}
_4d.stop(true,true);
if(_4b.onBeforeCollapse.call(_49)==false){
return;
}
_4e.addClass("panel-tool-expand");
if(_4a==true){
_4d.slideUp("normal",function(){
_4b.collapsed=true;
_4b.onCollapse.call(_49);
});
}else{
_4d.hide();
_4b.collapsed=true;
_4b.onCollapse.call(_49);
}
};
function _4f(_50,_51){
var _52=$.data(_50,"panel").options;
var _53=$.data(_50,"panel").panel;
var _54=_53.children(".panel-body");
var _55=_53.children(".panel-header").find("a.panel-tool-collapse");
if(_52.collapsed==false){
return;
}
_54.stop(true,true);
if(_52.onBeforeExpand.call(_50)==false){
return;
}
_55.removeClass("panel-tool-expand");
if(_51==true){
_54.slideDown("normal",function(){
_52.collapsed=false;
_52.onExpand.call(_50);
_29(_50);
_33(_50);
});
}else{
_54.show();
_52.collapsed=false;
_52.onExpand.call(_50);
_29(_50);
_33(_50);
}
};
function _3b(_56){
var _57=$.data(_56,"panel").options;
var _58=$.data(_56,"panel").panel;
var _59=_58.children(".panel-header").find("a.panel-tool-max");
if(_57.maximized==true){
return;
}
_59.addClass("panel-tool-restore");
if(!$.data(_56,"panel").original){
$.data(_56,"panel").original={width:_57.width,height:_57.height,left:_57.left,top:_57.top,fit:_57.fit};
}
_57.left=0;
_57.top=0;
_57.fit=true;
_3(_56);
_57.minimized=false;
_57.maximized=true;
_57.onMaximize.call(_56);
};
function _5a(_5b){
var _5c=$.data(_5b,"panel").options;
var _5d=$.data(_5b,"panel").panel;
_5d._size("unfit");
_5d.hide();
_5c.minimized=true;
_5c.maximized=false;
_5c.onMinimize.call(_5b);
};
function _5e(_5f){
var _60=$.data(_5f,"panel").options;
var _61=$.data(_5f,"panel").panel;
var _62=_61.children(".panel-header").find("a.panel-tool-max");
if(_60.maximized==false){
return;
}
_61.show();
_62.removeClass("panel-tool-restore");
$.extend(_60,$.data(_5f,"panel").original);
_3(_5f);
_60.minimized=false;
_60.maximized=false;
$.data(_5f,"panel").original=null;
_60.onRestore.call(_5f);
};
function _63(_64,_65){
$.data(_64,"panel").options.title=_65;
$(_64).panel("header").find("div.panel-title").html(_65);
};
var _66=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_66){
clearTimeout(_66);
}
_66=setTimeout(function(){
var _67=$("body.layout");
if(_67.length){
_67.layout("resize");
$("body").children(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
}else{
$("body").panel("doLayout");
}
_66=null;
},100);
});
$.fn.panel=function(_68,_69){
if(typeof _68=="string"){
return $.fn.panel.methods[_68](this,_69);
}
_68=_68||{};
return this.each(function(){
var _6a=$.data(this,"panel");
var _6b;
if(_6a){
_6b=$.extend(_6a.options,_68);
_6a.isLoaded=false;
}else{
_6b=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_68);
$(this).attr("title","");
_6a=$.data(this,"panel",{options:_6b,panel:_15(this),isLoaded:false});
}
_19(this);
$(this).show();
if(_6b.doSize==true){
_6a.panel.css("display","block");
_3(this);
}
if(_6b.closed==true||_6b.minimized==true){
_6a.panel.hide();
}else{
_35(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-header");
},footer:function(jq){
return jq.panel("panel").children(".panel-footer");
},body:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-body");
},setTitle:function(jq,_6c){
return jq.each(function(){
_63(this,_6c);
});
},open:function(jq,_6d){
return jq.each(function(){
_35(this,_6d);
});
},close:function(jq,_6e){
return jq.each(function(){
_3d(this,_6e);
});
},destroy:function(jq,_6f){
return jq.each(function(){
_43(this,_6f);
});
},clear:function(jq,_70){
return jq.each(function(){
_31(_70=="footer"?$(this).panel("footer"):this);
});
},refresh:function(jq,_71){
return jq.each(function(){
var _72=$.data(this,"panel");
_72.isLoaded=false;
if(_71){
if(typeof _71=="string"){
_72.options.href=_71;
}else{
_72.options.queryParams=_71;
}
}
_29(this);
});
},resize:function(jq,_73){
return jq.each(function(){
_3(this,_73);
});
},doLayout:function(jq,all){
return jq.each(function(){
_74(this,"body");
_74($(this).siblings(".panel-footer")[0],"footer");
function _74(_75,_76){
if(!_75){
return;
}
var _77=_75==$("body")[0];
var s=$(_75).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_78,el){
var p=$(el).parents(".panel-"+_76+":first");
return _77?p.length==0:p[0]==_75;
});
s.each(function(){
$(this).triggerHandler("_resize",[all||false]);
});
};
});
},move:function(jq,_79){
return jq.each(function(){
_f(this,_79);
});
},maximize:function(jq){
return jq.each(function(){
_3b(this);
});
},minimize:function(jq){
return jq.each(function(){
_5a(this);
});
},restore:function(jq){
return jq.each(function(){
_5e(this);
});
},collapse:function(jq,_7a){
return jq.each(function(){
_3c(this,_7a);
});
},expand:function(jq,_7b){
return jq.each(function(){
_4f(this,_7b);
});
}};
$.fn.panel.parseOptions=function(_7c){
var t=$(_7c);
var hh=t.children(".panel-header,header");
var ff=t.children(".panel-footer,footer");
return $.extend({},$.parser.parseOptions(_7c,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method","header","footer",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"},"openAnimation","closeAnimation",{openDuration:"number",closeDuration:"number"},]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined),header:(hh.length?hh.removeClass("panel-header"):undefined),footer:(ff.length?ff.removeClass("panel-footer"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,openAnimation:false,openDuration:400,closeAnimation:false,closeDuration:400,tools:null,footer:null,header:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_7d,_7e,_7f){
var _80=$(this).panel("options");
if(!_80.href){
return false;
}
$.ajax({type:_80.method,url:_80.href,cache:false,data:_7d,dataType:"html",success:function(_81){
_7e(_81);
},error:function(){
_7f.apply(this,arguments);
}});
},extractor:function(_82){
var _83=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _84=_83.exec(_82);
if(_84){
return _84[1];
}else{
return _82;
}
},onBeforeLoad:function(_85){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_86,_87){
},onMove:function(_88,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);

