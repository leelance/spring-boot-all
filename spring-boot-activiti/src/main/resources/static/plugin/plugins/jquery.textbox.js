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
var _1=0;
function _2(_3){
$(_3).addClass("textbox-f").hide();
var _4=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_3);
var _5=$(_3).attr("name");
if(_5){
_4.find("input.textbox-value").attr("name",_5);
$(_3).removeAttr("name").attr("textboxName",_5);
}
return _4;
};
function _6(_7){
var _8=$.data(_7,"textbox");
var _9=_8.options;
var tb=_8.textbox;
var _a="_easyui_textbox_input"+(++_1);
tb.find(".textbox-text").remove();
if(_9.multiline){
$("<textarea id=\""+_a+"\" class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input id=\""+_a+"\" type=\""+_9.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
$("#"+_a).attr("tabindex",$(_7).attr("tabindex")||"").css("text-align",$(_7).css("text-align"));
tb.find(".textbox-addon").remove();
var bb=_9.icons?$.extend(true,[],_9.icons):[];
if(_9.iconCls){
bb.push({iconCls:_9.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+_9.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(_9.buttonText||_9.buttonIcon){
var _b=$("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
_b.addClass("textbox-button-"+_9.buttonAlign).linkbutton({text:_9.buttonText,iconCls:_9.buttonIcon,onClick:function(){
var t=$(this).parent().prev();
t.textbox("options").onClickButton.call(t[0]);
}});
}
if(_9.label){
if(typeof _9.label=="object"){
_8.label=$(_9.label);
_8.label.attr("for",_a);
}else{
$(_8.label).remove();
_8.label=$("<label class=\"textbox-label\"></label>").html(_9.label);
_8.label.css("textAlign",_9.labelAlign).attr("for",_a);
if(_9.labelPosition=="after"){
_8.label.insertAfter(tb);
}else{
_8.label.insertBefore(_7);
}
_8.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_8.label.addClass("textbox-label-"+_9.labelPosition);
}
}else{
$(_8.label).remove();
}
_c(_7);
_d(_7,_9.disabled);
_e(_7,_9.readonly);
};
function _f(_10){
var tb=$.data(_10,"textbox").textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_10).remove();
};
function _11(_12,_13){
var _14=$.data(_12,"textbox");
var _15=_14.options;
var tb=_14.textbox;
var _16=tb.parent();
if(_13){
if(typeof _13=="object"){
$.extend(_15,_13);
}else{
_15.width=_13;
}
}
if(isNaN(parseInt(_15.width))){
var c=$(_12).clone();
c.css("visibility","hidden");
c.insertAfter(_12);
_15.width=c.outerWidth();
c.remove();
}
var _17=tb.is(":visible");
if(!_17){
tb.appendTo("body");
}
var _18=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _19=tb.find(".textbox-addon");
var _1a=_19.find(".textbox-icon");
if(_15.height=="auto"){
_18.css({margin:"",paddingTop:"",paddingBottom:"",height:"",lineHeight:""});
}
tb._size(_15,_16);
if(_15.label&&_15.labelPosition){
if(_15.labelPosition=="top"){
_14.label._size({width:_15.labelWidth=="auto"?tb.outerWidth():_15.labelWidth},tb);
if(_15.height!="auto"){
tb._size("height",tb.outerHeight()-_14.label.outerHeight());
}
}else{
_14.label._size({width:_15.labelWidth,height:tb.outerHeight()},tb);
if(!_15.multiline){
_14.label.css("lineHeight",_14.label.height()+"px");
}
tb._size("width",tb.outerWidth()-_14.label.outerWidth());
}
}
if(_15.buttonAlign=="left"||_15.buttonAlign=="right"){
btn.linkbutton("resize",{height:tb.height()});
}else{
btn.linkbutton("resize",{width:"100%"});
}
var _1b=tb.width()-_1a.length*_15.iconWidth-_1c("left")-_1c("right");
var _1d=_15.height=="auto"?_18.outerHeight():(tb.height()-_1c("top")-_1c("bottom"));
_19.css(_15.iconAlign,_1c(_15.iconAlign)+"px");
_19.css("top",_1c("top")+"px");
_1a.css({width:_15.iconWidth+"px",height:_1d+"px"});
_18.css({paddingLeft:(_12.style.paddingLeft||""),paddingRight:(_12.style.paddingRight||""),marginLeft:_1e("left"),marginRight:_1e("right"),marginTop:_1c("top"),marginBottom:_1c("bottom")});
if(_15.multiline){
_18.css({paddingTop:(_12.style.paddingTop||""),paddingBottom:(_12.style.paddingBottom||"")});
_18._outerHeight(_1d);
}else{
_18.css({paddingTop:0,paddingBottom:0,height:_1d+"px",lineHeight:_1d+"px"});
}
_18._outerWidth(_1b);
if(!_17){
tb.insertAfter(_12);
}
_15.onResize.call(_12,_15.width,_15.height);
function _1e(_1f){
return (_15.iconAlign==_1f?_19._outerWidth():0)+_1c(_1f);
};
function _1c(_20){
var w=0;
btn.filter(".textbox-button-"+_20).each(function(){
if(_20=="left"||_20=="right"){
w+=$(this).outerWidth();
}else{
w+=$(this).outerHeight();
}
});
return w;
};
};
function _c(_21){
var _22=$(_21).textbox("options");
var _23=$(_21).textbox("textbox");
_23.validatebox($.extend({},_22,{deltaX:function(_24){
return $(_21).textbox("getTipX",_24);
},onBeforeValidate:function(){
_22.onBeforeValidate.call(_21);
var box=$(this);
if(!box.is(":focus")){
if(box.val()!==_22.value){
_22.oldInputValue=box.val();
box.val(_22.value);
}
}
},onValidate:function(_25){
var box=$(this);
if(_22.oldInputValue!=undefined){
box.val(_22.oldInputValue);
_22.oldInputValue=undefined;
}
var tb=box.parent();
if(_25){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
_22.onValidate.call(_21,_25);
}}));
};
function _26(_27){
var _28=$.data(_27,"textbox");
var _29=_28.options;
var tb=_28.textbox;
var _2a=tb.find(".textbox-text");
_2a.attr("placeholder",_29.prompt);
_2a.unbind(".textbox");
$(_28.label).unbind(".textbox");
if(!_29.disabled&&!_29.readonly){
if(_28.label){
$(_28.label).bind("click.textbox",function(e){
if(!_29.hasFocusMe){
_2a.focus();
$(_27).textbox("setSelectionRange",{start:0,end:_2a.val().length});
}
});
}
_2a.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
_29.value=$(this).val();
if(_29.value==""){
$(this).val(_29.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
_29.hasFocusMe=true;
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=_29.value){
$(this).val(_29.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _2b in _29.inputEvents){
_2a.bind(_2b+".textbox",{target:_27},_29.inputEvents[_2b]);
}
}
var _2c=tb.find(".textbox-addon");
_2c.unbind().bind("click",{target:_27},function(e){
var _2d=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(_2d.length){
var _2e=parseInt(_2d.attr("icon-index"));
var _2f=_29.icons[_2e];
if(_2f&&_2f.handler){
_2f.handler.call(_2d[0],e);
}
_29.onClickIcon.call(_27,_2e);
}
});
_2c.find(".textbox-icon").each(function(_30){
var _31=_29.icons[_30];
var _32=$(this);
if(!_31||_31.disabled||_29.disabled||_29.readonly){
_32.addClass("textbox-icon-disabled");
}else{
_32.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.linkbutton((_29.disabled||_29.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_33){
if($(this).hasClass("easyui-fluid")||_33){
_11(_27);
}
return false;
});
};
function _d(_34,_35){
var _36=$.data(_34,"textbox");
var _37=_36.options;
var tb=_36.textbox;
var _38=tb.find(".textbox-text");
var ss=$(_34).add(tb.find(".textbox-value"));
_37.disabled=_35;
if(_37.disabled){
_38.blur();
_38.validatebox("disable");
tb.addClass("textbox-disabled");
ss.attr("disabled","disabled");
$(_36.label).addClass("textbox-label-disabled");
}else{
_38.validatebox("enable");
tb.removeClass("textbox-disabled");
ss.removeAttr("disabled");
$(_36.label).removeClass("textbox-label-disabled");
}
};
function _e(_39,_3a){
var _3b=$.data(_39,"textbox");
var _3c=_3b.options;
var tb=_3b.textbox;
var _3d=tb.find(".textbox-text");
_3c.readonly=_3a==undefined?true:_3a;
if(_3c.readonly){
_3d.triggerHandler("blur.textbox");
}
_3d.validatebox("readonly",_3c.readonly);
tb.removeClass("textbox-readonly").addClass(_3c.readonly?"textbox-readonly":"");
};
$.fn.textbox=function(_3e,_3f){
if(typeof _3e=="string"){
var _40=$.fn.textbox.methods[_3e];
if(_40){
return _40(this,_3f);
}else{
return this.each(function(){
var _41=$(this).textbox("textbox");
_41.validatebox(_3e,_3f);
});
}
}
_3e=_3e||{};
return this.each(function(){
var _42=$.data(this,"textbox");
if(_42){
$.extend(_42.options,_3e);
if(_3e.value!=undefined){
_42.options.originalValue=_3e.value;
}
}else{
_42=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_3e),textbox:_2(this)});
_42.options.originalValue=_42.options.value;
}
_6(this);
_26(this);
if(_42.options.doSize){
_11(this);
}
var _43=_42.options.value;
_42.options.value="";
$(this).textbox("initValue",_43);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},cloneFrom:function(jq,_44){
return jq.each(function(){
var t=$(this);
if(t.data("textbox")){
return;
}
if(!$(_44).data("textbox")){
$(_44).textbox();
}
var _45=$.extend(true,{},$(_44).textbox("options"));
var _46=t.attr("name")||"";
t.addClass("textbox-f").hide();
t.removeAttr("name").attr("textboxName",_46);
var _47=$(_44).next().clone().insertAfter(t);
var _48="_easyui_textbox_input"+(++_1);
_47.find(".textbox-value").attr("name",_46);
_47.find(".textbox-text").attr("id",_48);
var _49=$($(_44).textbox("label")).clone();
if(_49.length){
_49.attr("for",_48);
if(_45.labelPosition=="after"){
_49.insertAfter(t.next());
}else{
_49.insertBefore(t);
}
}
$.data(this,"textbox",{options:_45,textbox:_47,label:(_49.length?_49:undefined)});
var _4a=$(_44).textbox("button");
if(_4a.length){
t.textbox("button").linkbutton($.extend(true,{},_4a.linkbutton("options")));
}
_26(this);
_c(this);
});
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},label:function(jq){
return $.data(jq[0],"textbox").label;
},destroy:function(jq){
return jq.each(function(){
_f(this);
});
},resize:function(jq,_4b){
return jq.each(function(){
_11(this,_4b);
});
},disable:function(jq){
return jq.each(function(){
_d(this,true);
_26(this);
});
},enable:function(jq){
return jq.each(function(){
_d(this,false);
_26(this);
});
},readonly:function(jq,_4c){
return jq.each(function(){
_e(this,_4c);
_26(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_4d){
return jq.each(function(){
var _4e=$(this).textbox("options");
var _4f=$(this).textbox("textbox");
_4d=_4d==undefined?"":String(_4d);
if($(this).textbox("getText")!=_4d){
_4f.val(_4d);
}
_4e.value=_4d;
if(!_4f.is(":focus")){
if(_4d){
_4f.removeClass("textbox-prompt");
}else{
_4f.val(_4e.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_50){
return jq.each(function(){
var _51=$.data(this,"textbox");
$(this).textbox("setText",_50);
_51.textbox.find(".textbox-value").val(_50);
$(this).val(_50);
});
},setValue:function(jq,_52){
return jq.each(function(){
var _53=$.data(this,"textbox").options;
var _54=$(this).textbox("getValue");
$(this).textbox("initValue",_52);
if(_54!=_52){
_53.onChange.call(this,_52,_54);
$(this).closest("form").trigger("_change",[this]);
}
});
},getText:function(jq){
var _55=jq.textbox("textbox");
if(_55.is(":focus")){
return _55.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var _56=$(this).textbox("options");
$(this).textbox("setValue",_56.originalValue);
});
},getIcon:function(jq,_57){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_57+")");
},getTipX:function(jq,_58){
var _59=jq.data("textbox");
var _5a=_59.options;
var tb=_59.textbox;
var _5b=tb.find(".textbox-text");
var _5c=tb.find(".textbox-addon")._outerWidth();
var _5d=tb.find(".textbox-button")._outerWidth();
var _58=_58||_5a.tipPosition;
if(_58=="right"){
return (_5a.iconAlign=="right"?_5c:0)+(_5a.buttonAlign=="right"?_5d:0)+1;
}else{
if(_58=="left"){
return (_5a.iconAlign=="left"?-_5c:0)+(_5a.buttonAlign=="left"?-_5d:0)-1;
}else{
return _5c/2*(_5a.iconAlign=="right"?1:-1)+_5d/2*(_5a.buttonAlign=="right"?1:-1);
}
}
},getSelectionStart:function(jq){
return jq.textbox("getSelectionRange").start;
},getSelectionRange:function(jq){
var _5e=jq.textbox("textbox")[0];
var _5f=0;
var end=0;
if(typeof _5e.selectionStart=="number"){
_5f=_5e.selectionStart;
end=_5e.selectionEnd;
}else{
if(_5e.createTextRange){
var s=document.selection.createRange();
var _60=_5e.createTextRange();
_60.setEndPoint("EndToStart",s);
_5f=_60.text.length;
end=_5f+s.text.length;
}
}
return {start:_5f,end:end};
},setSelectionRange:function(jq,_61){
return jq.each(function(){
var _62=$(this).textbox("textbox")[0];
var _63=_61.start;
var end=_61.end;
if(_62.setSelectionRange){
_62.setSelectionRange(_63,end);
}else{
if(_62.createTextRange){
var _64=_62.createTextRange();
_64.collapse();
_64.moveEnd("character",end);
_64.moveStart("character",_63);
_64.select();
}
}
});
}};
$.fn.textbox.parseOptions=function(_65){
var t=$(_65);
return $.extend({},$.fn.validatebox.parseOptions(_65),$.parser.parseOptions(_65,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign","label","labelPosition","labelAlign",{multiline:"boolean",iconWidth:"number",labelWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{doSize:true,width:"auto",height:"auto",prompt:"",value:"",type:"text",multiline:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",label:null,labelWidth:"auto",labelPosition:"before",labelAlign:"left",inputEvents:{blur:function(e){
var t=$(e.data.target);
var _66=t.textbox("options");
if(t.textbox("getValue")!=_66.value){
t.textbox("setValue",_66.value);
}
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.textbox("setValue",t.textbox("getText"));
}
}},onChange:function(_67,_68){
},onResize:function(_69,_6a){
},onClickButton:function(){
},onClickIcon:function(_6b){
}});
})(jQuery);

