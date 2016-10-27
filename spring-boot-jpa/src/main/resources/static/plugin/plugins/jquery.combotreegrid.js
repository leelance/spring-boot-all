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
var _3=$.data(_2,"combotreegrid");
var _4=_3.options;
$(_2).addClass("combotreegrid-f").combo($.extend({},_4,{onShowPanel:function(){
var p=$(this).combotreegrid("panel");
var _5=p.outerHeight()-p.height();
var _6=p._size("minHeight");
var _7=p._size("maxHeight");
var dg=$(this).combotreegrid("grid");
dg.treegrid("resize",{width:"100%",height:(isNaN(parseInt(_4.panelHeight))?"auto":"100%"),minHeight:(_6?_6-_5:""),maxHeight:(_7?_7-_5:"")});
var _8=dg.treegrid("getSelected");
if(_8){
dg.treegrid("scrollTo",_8[_4.idField]);
}
_4.onShowPanel.call(this);
}}));
if(!_3.grid){
var _9=$(_2).combo("panel");
_3.grid=$("<table></table>").appendTo(_9);
}
_3.grid.treegrid($.extend({},_4,{border:false,checkbox:_4.multiple,onLoadSuccess:function(_a,_b){
var _c=$(_2).combotreegrid("getValues");
if(_4.multiple){
$.map($(this).treegrid("getCheckedNodes"),function(_d){
$.easyui.addArrayItem(_c,_d[_4.idField]);
});
}
_16(_2,_c);
_4.onLoadSuccess.call(this,_a,_b);
_3.remainText=false;
},onClickRow:function(_e){
if(_4.multiple){
$(this).treegrid(_e.checked?"uncheckNode":"checkNode",_e[_4.idField]);
$(this).treegrid("unselect",_e[_4.idField]);
}else{
$(_2).combo("hidePanel");
}
_11(_2);
_4.onClickRow.call(this,_e);
},onCheckNode:function(_f,_10){
_11(_2);
_4.onCheckNode.call(this,_f,_10);
}}));
};
function _11(_12){
var _13=$.data(_12,"combotreegrid");
var _14=_13.options;
var _15=_13.grid;
var vv=[];
if(_14.multiple){
vv=$.map(_15.treegrid("getCheckedNodes"),function(row){
return row[_14.idField];
});
}else{
var row=_15.treegrid("getSelected");
if(row){
vv.push(row[_14.idField]);
}
}
vv=vv.concat(_14.unselectedValues);
_16(_12,vv);
};
function _16(_17,_18){
var _19=$.data(_17,"combotreegrid");
var _1a=_19.options;
var _1b=_19.grid;
if(!$.isArray(_18)){
_18=_18.split(_1a.separator);
}
if(!_1a.multiple){
_18=_18.length?[_18[0]]:[""];
}
var vv=$.map(_18,function(_1c){
return String(_1c);
});
vv=$.grep(vv,function(v,_1d){
return _1d===$.inArray(v,vv);
});
var _1e=_1b.treegrid("getSelected");
if(_1e){
_1b.treegrid("unselect",_1e[_1a.idField]);
}
$.map(_1b.treegrid("getCheckedNodes"),function(row){
if($.inArray(String(row[_1a.idField]),vv)==-1){
_1b.treegrid("uncheckNode",row[_1a.idField]);
}
});
var ss=[];
_1a.unselectedValues=[];
$.map(vv,function(v){
var row=_1b.treegrid("find",v);
if(row){
if(_1a.multiple){
_1b.treegrid("checkNode",v);
}else{
_1b.treegrid("select",v);
}
ss.push(row[_1a.treeField]);
}else{
ss.push(_1f(v,_1a.mappingRows)||v);
_1a.unselectedValues.push(v);
}
});
if(_1a.multiple){
$.map(_1b.treegrid("getCheckedNodes"),function(row){
var id=String(row[_1a.idField]);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(row[_1a.treeField]);
}
});
}
if(!_19.remainText){
var s=ss.join(_1a.separator);
if($(_17).combo("getText")!=s){
$(_17).combo("setText",s);
}
}
$(_17).combo("setValues",vv);
function _1f(_20,a){
var _21=$.easyui.getArrayItem(a,_1a.idField,_20);
return _21?_21[_1a.treeField]:undefined;
};
};
function _22(_23,q){
var _24=$.data(_23,"combotreegrid");
var _25=_24.options;
var _26=_24.grid;
_24.remainText=true;
_26.treegrid("clearSelections").treegrid("clearChecked").treegrid("highlightRow",-1);
if(_25.mode=="remote"){
$(_23).combotreegrid("clear");
_26.treegrid("load",$.extend({},_25.queryParams,{q:q}));
}else{
if(q){
var _27=_26.treegrid("getData");
var vv=[];
var qq=_25.multiple?q.split(_25.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
var v=undefined;
$.easyui.forEach(_27,true,function(row){
if(q.toLowerCase()==String(row[_25.treeField]).toLowerCase()){
v=row[_25.idField];
return false;
}else{
if(_25.filter.call(_23,q,row)){
_26.treegrid("expandTo",row[_25.idField]);
_26.treegrid("highlightRow",row[_25.idField]);
return false;
}
}
});
if(v==undefined){
$.easyui.forEach(_25.mappingRows,false,function(row){
if(q.toLowerCase()==String(row[_25.treeField])){
v=row[_25.idField];
return false;
}
});
}
if(v!=undefined){
vv.push(v);
}
}
});
_16(_23,vv);
_24.remainText=false;
}
}
};
function _28(_29){
_11(_29);
};
$.fn.combotreegrid=function(_2a,_2b){
if(typeof _2a=="string"){
var _2c=$.fn.combotreegrid.methods[_2a];
if(_2c){
return _2c(this,_2b);
}else{
return this.combo(_2a,_2b);
}
}
_2a=_2a||{};
return this.each(function(){
var _2d=$.data(this,"combotreegrid");
if(_2d){
$.extend(_2d.options,_2a);
}else{
_2d=$.data(this,"combotreegrid",{options:$.extend({},$.fn.combotreegrid.defaults,$.fn.combotreegrid.parseOptions(this),_2a)});
}
_1(this);
});
};
$.fn.combotreegrid.methods={options:function(jq){
var _2e=jq.combo("options");
return $.extend($.data(jq[0],"combotreegrid").options,{width:_2e.width,height:_2e.height,originalValue:_2e.originalValue,disabled:_2e.disabled,readonly:_2e.readonly});
},grid:function(jq){
return $.data(jq[0],"combotreegrid").grid;
},setValues:function(jq,_2f){
return jq.each(function(){
var _30=$(this).combotreegrid("options");
if($.isArray(_2f)){
_2f=$.map(_2f,function(_31){
if(_31&&typeof _31=="object"){
$.easyui.addArrayItem(_30.mappingRows,_30.idField,_31);
return _31[_30.idField];
}else{
return _31;
}
});
}
_16(this,_2f);
});
},setValue:function(jq,_32){
return jq.each(function(){
$(this).combotreegrid("setValues",$.isArray(_32)?_32:[_32]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotreegrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var _33=$(this).combotreegrid("options");
if(_33.multiple){
$(this).combotreegrid("setValues",_33.originalValue);
}else{
$(this).combotreegrid("setValue",_33.originalValue);
}
});
}};
$.fn.combotreegrid.parseOptions=function(_34){
var t=$(_34);
return $.extend({},$.fn.combo.parseOptions(_34),$.fn.treegrid.parseOptions(_34),$.parser.parseOptions(_34,["mode",{limitToGrid:"boolean"}]));
};
$.fn.combotreegrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.treegrid.defaults,{editable:false,singleSelect:true,limitToGrid:false,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_28(this);
},query:function(q,e){
_22(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _35=e.data.target;
var _36=$(_35).combotreegrid("options");
if(_36.limitToGrid){
_28(_35);
}
}}),filter:function(q,row){
var _37=$(this).combotreegrid("options");
return (row[_37.treeField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);

