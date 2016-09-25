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
function _1(_2,_3){
var _4=$.data(_2,"combobox");
return $.easyui.indexOfArray(_4.data,_4.options.valueField,_3);
};
function _5(_6,_7){
var _8=$.data(_6,"combobox").options;
var _9=$(_6).combo("panel");
var _a=_8.finder.getEl(_6,_7);
if(_a.length){
if(_a.position().top<=0){
var h=_9.scrollTop()+_a.position().top;
_9.scrollTop(h);
}else{
if(_a.position().top+_a.outerHeight()>_9.height()){
var h=_9.scrollTop()+_a.position().top+_a.outerHeight()-_9.height();
_9.scrollTop(h);
}
}
}
_9.triggerHandler("scroll");
};
function _b(_c,_d){
var _e=$.data(_c,"combobox").options;
var _f=$(_c).combobox("panel");
var _10=_f.children("div.combobox-item-hover");
if(!_10.length){
_10=_f.children("div.combobox-item-selected");
}
_10.removeClass("combobox-item-hover");
var _11="div.combobox-item:visible:not(.combobox-item-disabled):first";
var _12="div.combobox-item:visible:not(.combobox-item-disabled):last";
if(!_10.length){
_10=_f.children(_d=="next"?_11:_12);
}else{
if(_d=="next"){
_10=_10.nextAll(_11);
if(!_10.length){
_10=_f.children(_11);
}
}else{
_10=_10.prevAll(_11);
if(!_10.length){
_10=_f.children(_12);
}
}
}
if(_10.length){
_10.addClass("combobox-item-hover");
var row=_e.finder.getRow(_c,_10);
if(row){
$(_c).combobox("scrollTo",row[_e.valueField]);
if(_e.selectOnNavigation){
_13(_c,row[_e.valueField]);
}
}
}
};
function _13(_14,_15,_16){
var _17=$.data(_14,"combobox").options;
var _18=$(_14).combo("getValues");
if($.inArray(_15+"",_18)==-1){
if(_17.multiple){
_18.push(_15);
}else{
_18=[_15];
}
_19(_14,_18,_16);
}
};
function _1a(_1b,_1c){
var _1d=$.data(_1b,"combobox").options;
var _1e=$(_1b).combo("getValues");
var _1f=$.inArray(_1c+"",_1e);
if(_1f>=0){
_1e.splice(_1f,1);
_19(_1b,_1e);
}
};
function _19(_20,_21,_22){
var _23=$.data(_20,"combobox").options;
var _24=$(_20).combo("panel");
if(!$.isArray(_21)){
_21=_21.split(_23.separator);
}
if(!_23.multiple){
_21=_21.length?[_21[0]]:[""];
}
$.map($(_20).combo("getValues"),function(v){
if($.easyui.indexOfArray(_21,v)==-1){
var el=_23.finder.getEl(_20,v);
if(el.hasClass("combobox-item-selected")){
el.removeClass("combobox-item-selected");
_23.onUnselect.call(_20,_23.finder.getRow(_20,v));
}
}
});
var _25=null;
var vv=[],ss=[];
for(var i=0;i<_21.length;i++){
var v=_21[i];
var s=v;
var row=_23.finder.getRow(_20,v);
if(row){
s=row[_23.textField];
_25=row;
var el=_23.finder.getEl(_20,v);
if(!el.hasClass("combobox-item-selected")){
el.addClass("combobox-item-selected");
_23.onSelect.call(_20,row);
}
}
vv.push(v);
ss.push(s);
}
if(!_22){
$(_20).combo("setText",ss.join(_23.separator));
}
if(_23.showItemIcon){
var tb=$(_20).combobox("textbox");
tb.removeClass("textbox-bgicon "+_23.textboxIconCls);
if(_25&&_25.iconCls){
tb.addClass("textbox-bgicon "+_25.iconCls);
_23.textboxIconCls=_25.iconCls;
}
}
$(_20).combo("setValues",vv);
_24.triggerHandler("scroll");
};
function _26(_27,_28,_29){
var _2a=$.data(_27,"combobox");
var _2b=_2a.options;
_2a.data=_2b.loadFilter.call(_27,_28);
_2b.view.render.call(_2b.view,_27,$(_27).combo("panel"),_2a.data);
var vv=$(_27).combobox("getValues");
$.easyui.forEach(_2a.data,false,function(row){
if(row["selected"]){
$.easyui.addArrayItem(vv,row[_2b.valueField]+"");
}
});
if(_2b.multiple){
_19(_27,vv,_29);
}else{
_19(_27,vv.length?[vv[vv.length-1]]:[],_29);
}
_2b.onLoadSuccess.call(_27,_28);
};
function _2c(_2d,url,_2e,_2f){
var _30=$.data(_2d,"combobox").options;
if(url){
_30.url=url;
}
_2e=$.extend({},_30.queryParams,_2e||{});
if(_30.onBeforeLoad.call(_2d,_2e)==false){
return;
}
_30.loader.call(_2d,_2e,function(_31){
_26(_2d,_31,_2f);
},function(){
_30.onLoadError.apply(this,arguments);
});
};
function _32(_33,q){
var _34=$.data(_33,"combobox");
var _35=_34.options;
var qq=_35.multiple?q.split(_35.separator):[q];
if(_35.mode=="remote"){
_36(qq);
_2c(_33,null,{q:q},true);
}else{
var _37=$(_33).combo("panel");
_37.find(".combobox-item-hover").removeClass("combobox-item-hover");
_37.find(".combobox-item,.combobox-group").hide();
var _38=_34.data;
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _39=q;
var _3a=undefined;
for(var i=0;i<_38.length;i++){
var row=_38[i];
if(_35.filter.call(_33,q,row)){
var v=row[_35.valueField];
var s=row[_35.textField];
var g=row[_35.groupField];
var _3b=_35.finder.getEl(_33,v).show();
if(s.toLowerCase()==q.toLowerCase()){
_39=v;
_13(_33,v,true);
}
if(_35.groupField&&_3a!=g){
_35.finder.getGroupEl(_33,g).show();
_3a=g;
}
}
}
vv.push(_39);
});
_36(vv);
}
function _36(vv){
_19(_33,_35.multiple?(q?vv:[]):vv,true);
};
};
function _3c(_3d){
var t=$(_3d);
var _3e=t.combobox("options");
var _3f=t.combobox("panel");
var _40=_3f.children("div.combobox-item-hover");
if(_40.length){
var row=_3e.finder.getRow(_3d,_40);
var _41=row[_3e.valueField];
if(_3e.multiple){
if(_40.hasClass("combobox-item-selected")){
t.combobox("unselect",_41);
}else{
t.combobox("select",_41);
}
}else{
t.combobox("select",_41);
}
}
var vv=[];
$.map(t.combobox("getValues"),function(v){
if(_1(_3d,v)>=0){
vv.push(v);
}
});
t.combobox("setValues",vv);
if(!_3e.multiple){
t.combobox("hidePanel");
}
};
function _42(_43){
var _44=$.data(_43,"combobox");
var _45=_44.options;
$(_43).addClass("combobox-f");
$(_43).combo($.extend({},_45,{onShowPanel:function(){
$(this).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show();
_19(this,$(this).combobox("getValues"),true);
$(this).combobox("scrollTo",$(this).combobox("getValue"));
_45.onShowPanel.call(this);
}}));
var p=$(_43).combo("panel");
p.unbind(".combobox");
for(var _46 in _45.panelEvents){
p.bind(_46+".combobox",{target:_43},_45.panelEvents[_46]);
}
};
function _47(e){
$(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
var _48=$(e.target).closest("div.combobox-item");
if(!_48.hasClass("combobox-item-disabled")){
_48.addClass("combobox-item-hover");
}
e.stopPropagation();
};
function _49(e){
$(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
e.stopPropagation();
};
function _4a(e){
var _4b=$(this).panel("options").comboTarget;
if(!_4b){
return;
}
var _4c=$(_4b).combobox("options");
var _4d=$(e.target).closest("div.combobox-item");
if(!_4d.length||_4d.hasClass("combobox-item-disabled")){
return;
}
var row=_4c.finder.getRow(_4b,_4d);
if(!row){
return;
}
var _4e=row[_4c.valueField];
if(_4c.multiple){
if(_4d.hasClass("combobox-item-selected")){
_1a(_4b,_4e);
}else{
_13(_4b,_4e);
}
}else{
$(_4b).combobox("setValue",_4e).combobox("hidePanel");
}
e.stopPropagation();
};
function _4f(e){
var _50=$(this).panel("options").comboTarget;
if(!_50){
return;
}
var _51=$(_50).combobox("options");
if(_51.groupPosition=="sticky"){
var _52=$(this).children(".combobox-stick");
if(!_52.length){
_52=$("<div class=\"combobox-stick\"></div>").appendTo(this);
}
_52.hide();
var _53=$(_50).data("combobox");
$(this).children(".combobox-group:visible").each(function(){
var g=$(this);
var _54=_51.finder.getGroup(_50,g);
var _55=_53.data[_54.startIndex+_54.count-1];
var _56=_51.finder.getEl(_50,_55[_51.valueField]);
if(g.position().top<0&&_56.position().top>0){
_52.show().html(g.html());
return false;
}
});
}
};
$.fn.combobox=function(_57,_58){
if(typeof _57=="string"){
var _59=$.fn.combobox.methods[_57];
if(_59){
return _59(this,_58);
}else{
return this.combo(_57,_58);
}
}
_57=_57||{};
return this.each(function(){
var _5a=$.data(this,"combobox");
if(_5a){
$.extend(_5a.options,_57);
}else{
_5a=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_57),data:[]});
}
_42(this);
if(_5a.options.data){
_26(this,_5a.options.data);
}else{
var _5b=$.fn.combobox.parseData(this);
if(_5b.length){
_26(this,_5b);
}
}
_2c(this);
});
};
$.fn.combobox.methods={options:function(jq){
var _5c=jq.combo("options");
return $.extend($.data(jq[0],"combobox").options,{width:_5c.width,height:_5c.height,originalValue:_5c.originalValue,disabled:_5c.disabled,readonly:_5c.readonly});
},cloneFrom:function(jq,_5d){
return jq.each(function(){
$(this).combo("cloneFrom",_5d);
$.data(this,"combobox",$(_5d).data("combobox"));
$(this).addClass("combobox-f").attr("comboboxName",$(this).attr("textboxName"));
});
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_5e){
return jq.each(function(){
_19(this,_5e);
});
},setValue:function(jq,_5f){
return jq.each(function(){
_19(this,$.isArray(_5f)?_5f:[_5f]);
});
},clear:function(jq){
return jq.each(function(){
_19(this,[]);
});
},reset:function(jq){
return jq.each(function(){
var _60=$(this).combobox("options");
if(_60.multiple){
$(this).combobox("setValues",_60.originalValue);
}else{
$(this).combobox("setValue",_60.originalValue);
}
});
},loadData:function(jq,_61){
return jq.each(function(){
_26(this,_61);
});
},reload:function(jq,url){
return jq.each(function(){
if(typeof url=="string"){
_2c(this,url);
}else{
if(url){
var _62=$(this).combobox("options");
_62.queryParams=url;
}
_2c(this);
}
});
},select:function(jq,_63){
return jq.each(function(){
_13(this,_63);
});
},unselect:function(jq,_64){
return jq.each(function(){
_1a(this,_64);
});
},scrollTo:function(jq,_65){
return jq.each(function(){
_5(this,_65);
});
}};
$.fn.combobox.parseOptions=function(_66){
var t=$(_66);
return $.extend({},$.fn.combo.parseOptions(_66),$.parser.parseOptions(_66,["valueField","textField","groupField","groupPosition","mode","method","url",{showItemIcon:"boolean",limitToList:"boolean"}]));
};
$.fn.combobox.parseData=function(_67){
var _68=[];
var _69=$(_67).combobox("options");
$(_67).children().each(function(){
if(this.tagName.toLowerCase()=="optgroup"){
var _6a=$(this).attr("label");
$(this).children().each(function(){
_6b(this,_6a);
});
}else{
_6b(this);
}
});
return _68;
function _6b(el,_6c){
var t=$(el);
var row={};
row[_69.valueField]=t.attr("value")!=undefined?t.attr("value"):t.text();
row[_69.textField]=t.text();
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_6c){
_69.groupField=_69.groupField||"group";
row[_69.groupField]=_6c;
}
_68.push(row);
};
};
var _6d=0;
var _6e={render:function(_6f,_70,_71){
var _72=$.data(_6f,"combobox");
var _73=_72.options;
_6d++;
_72.itemIdPrefix="_easyui_combobox_i"+_6d;
_72.groupIdPrefix="_easyui_combobox_g"+_6d;
_72.groups=[];
var dd=[];
var _74=undefined;
for(var i=0;i<_71.length;i++){
var row=_71[i];
var v=row[_73.valueField]+"";
var s=row[_73.textField];
var g=row[_73.groupField];
if(g){
if(_74!=g){
_74=g;
_72.groups.push({value:g,startIndex:i,count:1});
dd.push("<div id=\""+(_72.groupIdPrefix+"_"+(_72.groups.length-1))+"\" class=\"combobox-group\">");
dd.push(_73.groupFormatter?_73.groupFormatter.call(_6f,g):g);
dd.push("</div>");
}else{
_72.groups[_72.groups.length-1].count++;
}
}else{
_74=undefined;
}
var cls="combobox-item"+(row.disabled?" combobox-item-disabled":"")+(g?" combobox-gitem":"");
dd.push("<div id=\""+(_72.itemIdPrefix+"_"+i)+"\" class=\""+cls+"\">");
if(_73.showItemIcon&&row.iconCls){
dd.push("<span class=\"combobox-icon "+row.iconCls+"\"></span>");
}
dd.push(_73.formatter?_73.formatter.call(_6f,row):s);
dd.push("</div>");
}
$(_70).html(dd.join(""));
}};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",groupPosition:"static",groupField:null,groupFormatter:function(_75){
return _75;
},mode:"local",method:"post",url:null,data:null,queryParams:{},showItemIcon:false,limitToList:false,view:_6e,keyHandler:{up:function(e){
_b(this,"prev");
e.preventDefault();
},down:function(e){
_b(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_3c(this);
},query:function(q,e){
_32(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _76=e.data.target;
var _77=$(_76).combobox("options");
if(_77.limitToList){
_3c(_76);
}
}}),panelEvents:{mouseover:_47,mouseout:_49,click:_4a,scroll:_4f},filter:function(q,row){
var _78=$(this).combobox("options");
return row[_78.textField].toLowerCase().indexOf(q.toLowerCase())>=0;
},formatter:function(row){
var _79=$(this).combobox("options");
return row[_79.textField];
},loader:function(_7a,_7b,_7c){
var _7d=$(this).combobox("options");
if(!_7d.url){
return false;
}
$.ajax({type:_7d.method,url:_7d.url,data:_7a,dataType:"json",success:function(_7e){
_7b(_7e);
},error:function(){
_7c.apply(this,arguments);
}});
},loadFilter:function(_7f){
return _7f;
},finder:{getEl:function(_80,_81){
var _82=_1(_80,_81);
var id=$.data(_80,"combobox").itemIdPrefix+"_"+_82;
return $("#"+id);
},getGroupEl:function(_83,_84){
var _85=$.data(_83,"combobox");
var _86=$.easyui.indexOfArray(_85.groups,"value",_84);
var id=_85.groupIdPrefix+"_"+_86;
return $("#"+id);
},getGroup:function(_87,p){
var _88=$.data(_87,"combobox");
var _89=p.attr("id").substr(_88.groupIdPrefix.length+1);
return _88.groups[parseInt(_89)];
},getRow:function(_8a,p){
var _8b=$.data(_8a,"combobox");
var _8c=(p instanceof $)?p.attr("id").substr(_8b.itemIdPrefix.length+1):_1(_8a,p);
return _8b.data[parseInt(_8c)];
}},onBeforeLoad:function(_8d){
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_8e){
},onUnselect:function(_8f){
}});
})(jQuery);

