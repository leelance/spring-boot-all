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
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p,div.menu");
if(p.length){
_1(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _2(_3){
var _4=$.data(_3,"combo");
var _5=_4.options;
if(!_4.panel){
_4.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_4.panel.panel({minWidth:_5.panelMinWidth,maxWidth:_5.panelMaxWidth,minHeight:_5.panelMinHeight,maxHeight:_5.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _6=$(this).panel("options").comboTarget;
var _7=$.data(_6,"combo");
if(_7){
_7.options.onShowPanel.call(_6);
}
},onBeforeClose:function(){
_1($(this).parent());
},onClose:function(){
var _8=$(this).panel("options").comboTarget;
var _9=$(_8).data("combo");
if(_9){
_9.options.onHidePanel.call(_8);
}
}});
}
var _a=$.extend(true,[],_5.icons);
if(_5.hasDownArrow){
_a.push({iconCls:"combo-arrow",handler:function(e){
_f(e.data.target);
}});
}
$(_3).addClass("combo-f").textbox($.extend({},_5,{icons:_a,onChange:function(){
}}));
$(_3).attr("comboName",$(_3).attr("textboxName"));
_4.combo=$(_3).next();
_4.combo.addClass("combo");
};
function _b(_c){
var _d=$.data(_c,"combo");
var _e=_d.options;
var p=_d.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!_e.cloned){
p.panel("destroy");
}
$(_c).textbox("destroy");
};
function _f(_10){
var _11=$.data(_10,"combo").panel;
if(_11.is(":visible")){
var _12=_11.combo("combo");
_13(_12);
if(_12!=_10){
$(_10).combo("showPanel");
}
}else{
var p=$(_10).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(_11).not(p).panel("close");
$(_10).combo("showPanel");
}
$(_10).combo("textbox").focus();
};
function _1(_14){
$(_14).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _15(e){
var _16=e.data.target;
var _17=$.data(_16,"combo");
var _18=_17.options;
if(!_18.editable){
_f(_16);
}else{
var p=$(_16).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(p).each(function(){
var _19=$(this).combo("combo");
if(_19!=_16){
_13(_19);
}
});
}
};
function _1a(e){
var _1b=e.data.target;
var t=$(_1b);
var _1c=t.data("combo");
var _1d=t.combo("options");
_1c.panel.panel("options").comboTarget=_1b;
switch(e.keyCode){
case 38:
_1d.keyHandler.up.call(_1b,e);
break;
case 40:
_1d.keyHandler.down.call(_1b,e);
break;
case 37:
_1d.keyHandler.left.call(_1b,e);
break;
case 39:
_1d.keyHandler.right.call(_1b,e);
break;
case 13:
e.preventDefault();
_1d.keyHandler.enter.call(_1b,e);
return false;
case 9:
case 27:
_13(_1b);
break;
default:
if(_1d.editable){
if(_1c.timer){
clearTimeout(_1c.timer);
}
_1c.timer=setTimeout(function(){
var q=t.combo("getText");
if(_1c.previousText!=q){
_1c.previousText=q;
t.combo("showPanel");
_1d.keyHandler.query.call(_1b,q,e);
t.combo("validate");
}
},_1d.delay);
}
}
};
function _1e(_1f){
var _20=$.data(_1f,"combo");
var _21=_20.combo;
var _22=_20.panel;
var _23=$(_1f).combo("options");
var _24=_22.panel("options");
_24.comboTarget=_1f;
if(_24.closed){
_22.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:($.fn.window?$.fn.window.defaults.zIndex++:99)),left:-999999});
_22.panel("resize",{width:(_23.panelWidth?_23.panelWidth:_21._outerWidth()),height:_23.panelHeight});
_22.panel("panel").hide();
_22.panel("open");
}
(function(){
if(_24.comboTarget==_1f&&_22.is(":visible")){
_22.panel("move",{left:_25(),top:_26()});
setTimeout(arguments.callee,200);
}
})();
function _25(){
var _27=_21.offset().left;
if(_23.panelAlign=="right"){
_27+=_21._outerWidth()-_22._outerWidth();
}
if(_27+_22._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_27=$(window)._outerWidth()+$(document).scrollLeft()-_22._outerWidth();
}
if(_27<0){
_27=0;
}
return _27;
};
function _26(){
var top=_21.offset().top+_21._outerHeight();
if(top+_22._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_21.offset().top-_22._outerHeight();
}
if(top<$(document).scrollTop()){
top=_21.offset().top+_21._outerHeight();
}
return top;
};
};
function _13(_28){
var _29=$.data(_28,"combo").panel;
_29.panel("close");
};
function _2a(_2b,_2c){
var _2d=$.data(_2b,"combo");
var _2e=$(_2b).textbox("getText");
if(_2e!=_2c){
$(_2b).textbox("setText",_2c);
_2d.previousText=_2c;
}
};
function _2f(_30){
var _31=[];
var _32=$.data(_30,"combo").combo;
_32.find(".textbox-value").each(function(){
_31.push($(this).val());
});
return _31;
};
function _33(_34,_35){
var _36=$.data(_34,"combo");
var _37=_36.options;
var _38=_36.combo;
if(!$.isArray(_35)){
_35=_35.split(_37.separator);
}
var _39=_2f(_34);
_38.find(".textbox-value").remove();
var _3a=$(_34).attr("textboxName")||"";
for(var i=0;i<_35.length;i++){
var _3b=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_38);
_3b.attr("name",_3a);
if(_37.disabled){
_3b.attr("disabled","disabled");
}
_3b.val(_35[i]);
}
var _3c=(function(){
if(_39.length!=_35.length){
return true;
}
var a1=$.extend(true,[],_39);
var a2=$.extend(true,[],_35);
a1.sort();
a2.sort();
for(var i=0;i<a1.length;i++){
if(a1[i]!=a2[i]){
return true;
}
}
return false;
})();
if(_3c){
if(_37.multiple){
_37.onChange.call(_34,_35,_39);
}else{
_37.onChange.call(_34,_35[0],_39[0]);
}
$(_34).closest("form").trigger("_change",[_34]);
}
};
function _3d(_3e){
var _3f=_2f(_3e);
return _3f[0];
};
function _40(_41,_42){
_33(_41,[_42]);
};
function _43(_44){
var _45=$.data(_44,"combo").options;
var _46=_45.onChange;
_45.onChange=function(){
};
if(_45.multiple){
_33(_44,_45.value?_45.value:[]);
}else{
_40(_44,_45.value);
}
_45.onChange=_46;
};
$.fn.combo=function(_47,_48){
if(typeof _47=="string"){
var _49=$.fn.combo.methods[_47];
if(_49){
return _49(this,_48);
}else{
return this.textbox(_47,_48);
}
}
_47=_47||{};
return this.each(function(){
var _4a=$.data(this,"combo");
if(_4a){
$.extend(_4a.options,_47);
if(_47.value!=undefined){
_4a.options.originalValue=_47.value;
}
}else{
_4a=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_47),previousText:""});
_4a.options.originalValue=_4a.options.value;
}
_2(this);
_43(this);
});
};
$.fn.combo.methods={options:function(jq){
var _4b=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:_4b.width,height:_4b.height,disabled:_4b.disabled,readonly:_4b.readonly});
},cloneFrom:function(jq,_4c){
return jq.each(function(){
$(this).textbox("cloneFrom",_4c);
$.data(this,"combo",{options:$.extend(true,{cloned:true},$(_4c).combo("options")),combo:$(this).next(),panel:$(_4c).combo("panel")});
$(this).addClass("combo-f").attr("comboName",$(this).attr("textboxName"));
});
},combo:function(jq){
return jq.closest(".combo-panel").panel("options").comboTarget;
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_b(this);
});
},showPanel:function(jq){
return jq.each(function(){
_1e(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_13(this);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setText","");
var _4d=$.data(this,"combo").options;
if(_4d.multiple){
$(this).combo("setValues",[]);
}else{
$(this).combo("setValue","");
}
});
},reset:function(jq){
return jq.each(function(){
var _4e=$.data(this,"combo").options;
if(_4e.multiple){
$(this).combo("setValues",_4e.originalValue);
}else{
$(this).combo("setValue",_4e.originalValue);
}
});
},setText:function(jq,_4f){
return jq.each(function(){
_2a(this,_4f);
});
},getValues:function(jq){
return _2f(jq[0]);
},setValues:function(jq,_50){
return jq.each(function(){
_33(this,_50);
});
},getValue:function(jq){
return _3d(jq[0]);
},setValue:function(jq,_51){
return jq.each(function(){
_40(this,_51);
});
}};
$.fn.combo.parseOptions=function(_52){
var t=$(_52);
return $.extend({},$.fn.textbox.parseOptions(_52),$.parser.parseOptions(_52,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_15,keydown:_1a,paste:_1a,drop:_1a},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:false,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_53,_54){
}});
})(jQuery);

