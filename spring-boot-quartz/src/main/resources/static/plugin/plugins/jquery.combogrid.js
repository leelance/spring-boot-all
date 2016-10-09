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
function _1(_2){
var _3=$.data(_2,"combogrid");
var _4=_3.options;
var _5=_3.grid;
$(_2).addClass("combogrid-f").combo($.extend({},_4,{onShowPanel:function(){
_20(this,$(this).combogrid("getValues"),true);
var p=$(this).combogrid("panel");
var _6=p.outerHeight()-p.height();
var _7=p._size("minHeight");
var _8=p._size("maxHeight");
var dg=$(this).combogrid("grid");
dg.datagrid("resize",{width:"100%",height:(isNaN(parseInt(_4.panelHeight))?"auto":"100%"),minHeight:(_7?_7-_6:""),maxHeight:(_8?_8-_6:"")});
var _9=dg.datagrid("getSelected");
if(_9){
dg.datagrid("scrollTo",dg.datagrid("getRowIndex",_9));
}
_4.onShowPanel.call(this);
}}));
var _a=$(_2).combo("panel");
if(!_5){
_5=$("<table></table>").appendTo(_a);
_3.grid=_5;
}
_5.datagrid($.extend({},_4,{border:false,singleSelect:(!_4.multiple),onLoadSuccess:_b,onClickRow:_c,onSelect:_d("onSelect"),onUnselect:_d("onUnselect"),onSelectAll:_d("onSelectAll"),onUnselectAll:_d("onUnselectAll")}));
function _e(dg){
return $(dg).closest(".combo-panel").panel("options").comboTarget||_2;
};
function _b(_f){
var _10=_e(this);
var _11=$(_10).data("combogrid");
var _12=_11.options;
var _13=$(_10).combo("getValues");
_20(_10,_13,_11.remainText);
_12.onLoadSuccess.call(this,_f);
};
function _c(_14,row){
var _15=_e(this);
var _16=$(_15).data("combogrid");
var _17=_16.options;
_16.remainText=false;
_18.call(this);
if(!_17.multiple){
$(_15).combo("hidePanel");
}
_17.onClickRow.call(this,_14,row);
};
function _d(_19){
return function(_1a,row){
var _1b=_e(this);
var _1c=$(_1b).combogrid("options");
if(_19=="onUnselectAll"){
if(_1c.multiple){
_18.call(this);
}
}else{
_18.call(this);
}
_1c[_19].call(this,_1a,row);
};
};
function _18(){
var dg=$(this);
var _1d=_e(dg);
var _1e=$(_1d).data("combogrid");
var _1f=_1e.options;
var vv=$.map(dg.datagrid("getSelections"),function(row){
return row[_1f.idField];
});
vv=vv.concat(_1f.unselectedValues);
_20(_1d,vv,_1e.remainText);
};
};
function nav(_21,dir){
var _22=$.data(_21,"combogrid");
var _23=_22.options;
var _24=_22.grid;
var _25=_24.datagrid("getRows").length;
if(!_25){
return;
}
var tr=_23.finder.getTr(_24[0],null,"highlight");
if(!tr.length){
tr=_23.finder.getTr(_24[0],null,"selected");
}
var _26;
if(!tr.length){
_26=(dir=="next"?0:_25-1);
}else{
var _26=parseInt(tr.attr("datagrid-row-index"));
_26+=(dir=="next"?1:-1);
if(_26<0){
_26=_25-1;
}
if(_26>=_25){
_26=0;
}
}
_24.datagrid("highlightRow",_26);
if(_23.selectOnNavigation){
_22.remainText=false;
_24.datagrid("selectRow",_26);
}
};
function _20(_27,_28,_29){
var _2a=$.data(_27,"combogrid");
var _2b=_2a.options;
var _2c=_2a.grid;
var _2d=$(_27).combo("getValues");
var _2e=$(_27).combo("options");
var _2f=_2e.onChange;
_2e.onChange=function(){
};
var _30=_2c.datagrid("options");
var _31=_30.onSelect;
var _32=_30.onUnselectAll;
_30.onSelect=_30.onUnselectAll=function(){
};
if(!$.isArray(_28)){
_28=_28.split(_2b.separator);
}
if(!_2b.multiple){
_28=_28.length?[_28[0]]:[""];
}
var vv=$.map(_28,function(_33){
return String(_33);
});
vv=$.grep(vv,function(v,_34){
return _34===$.inArray(v,vv);
});
var _35=$.grep(_2c.datagrid("getSelections"),function(row,_36){
return $.inArray(String(row[_2b.idField]),vv)>=0;
});
_2c.datagrid("clearSelections");
_2c.data("datagrid").selectedRows=_35;
var ss=[];
_2b.unselectedValues=[];
$.map(vv,function(v){
var _37=_2c.datagrid("getRowIndex",v);
if(_37>=0){
_2c.datagrid("selectRow",_37);
}else{
_2b.unselectedValues.push(v);
}
ss.push(_38(v,_2c.datagrid("getRows"))||_38(v,_35)||_38(v,_2b.mappingRows)||v);
});
$(_27).combo("setValues",_2d);
_2e.onChange=_2f;
_30.onSelect=_31;
_30.onUnselectAll=_32;
if(!_29){
var s=ss.join(_2b.separator);
if($(_27).combo("getText")!=s){
$(_27).combo("setText",s);
}
}
$(_27).combo("setValues",_28);
function _38(_39,a){
var _3a=$.easyui.getArrayItem(a,_2b.idField,_39);
return _3a?_3a[_2b.textField]:undefined;
};
};
function _3b(_3c,q){
var _3d=$.data(_3c,"combogrid");
var _3e=_3d.options;
var _3f=_3d.grid;
_3d.remainText=true;
if(_3e.multiple&&!q){
_20(_3c,[],true);
}else{
_20(_3c,[q],true);
}
if(_3e.mode=="remote"){
_3f.datagrid("clearSelections");
_3f.datagrid("load",$.extend({},_3e.queryParams,{q:q}));
}else{
if(!q){
return;
}
_3f.datagrid("clearSelections").datagrid("highlightRow",-1);
var _40=_3f.datagrid("getRows");
var qq=_3e.multiple?q.split(_3e.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
$.map(_40,function(row,i){
if(q==row[_3e.textField]){
_3f.datagrid("selectRow",i);
}else{
if(_3e.filter.call(_3c,q,row)){
_3f.datagrid("highlightRow",i);
}
}
});
}
});
}
};
function _41(_42){
var _43=$.data(_42,"combogrid");
var _44=_43.options;
var _45=_43.grid;
var tr=_44.finder.getTr(_45[0],null,"highlight");
_43.remainText=false;
if(tr.length){
var _46=parseInt(tr.attr("datagrid-row-index"));
if(_44.multiple){
if(tr.hasClass("datagrid-row-selected")){
_45.datagrid("unselectRow",_46);
}else{
_45.datagrid("selectRow",_46);
}
}else{
_45.datagrid("selectRow",_46);
}
}
var vv=[];
$.map(_45.datagrid("getSelections"),function(row){
vv.push(row[_44.idField]);
});
$(_42).combogrid("setValues",vv);
if(!_44.multiple){
$(_42).combogrid("hidePanel");
}
};
$.fn.combogrid=function(_47,_48){
if(typeof _47=="string"){
var _49=$.fn.combogrid.methods[_47];
if(_49){
return _49(this,_48);
}else{
return this.combo(_47,_48);
}
}
_47=_47||{};
return this.each(function(){
var _4a=$.data(this,"combogrid");
if(_4a){
$.extend(_4a.options,_47);
}else{
_4a=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_47)});
}
_1(this);
});
};
$.fn.combogrid.methods={options:function(jq){
var _4b=jq.combo("options");
return $.extend($.data(jq[0],"combogrid").options,{width:_4b.width,height:_4b.height,originalValue:_4b.originalValue,disabled:_4b.disabled,readonly:_4b.readonly});
},cloneFrom:function(jq,_4c){
return jq.each(function(){
$(this).combo("cloneFrom",_4c);
$.data(this,"combogrid",{options:$.extend(true,{cloned:true},$(_4c).combogrid("options")),combo:$(this).next(),panel:$(_4c).combo("panel"),grid:$(_4c).combogrid("grid")});
});
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_4d){
return jq.each(function(){
var _4e=$(this).combogrid("options");
if($.isArray(_4d)){
_4d=$.map(_4d,function(_4f){
if(_4f&&typeof _4f=="object"){
$.easyui.addArrayItem(_4e.mappingRows,_4e.idField,_4f);
return _4f[_4e.idField];
}else{
return _4f;
}
});
}
_20(this,_4d);
});
},setValue:function(jq,_50){
return jq.each(function(){
$(this).combogrid("setValues",$.isArray(_50)?_50:[_50]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combogrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var _51=$(this).combogrid("options");
if(_51.multiple){
$(this).combogrid("setValues",_51.originalValue);
}else{
$(this).combogrid("setValue",_51.originalValue);
}
});
}};
$.fn.combogrid.parseOptions=function(_52){
var t=$(_52);
return $.extend({},$.fn.combo.parseOptions(_52),$.fn.datagrid.parseOptions(_52),$.parser.parseOptions(_52,["idField","textField","mode"]));
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{loadMsg:null,idField:null,textField:null,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_41(this);
},query:function(q,e){
_3b(this,q);
}},filter:function(q,row){
var _53=$(this).combogrid("options");
return (row[_53.textField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);

