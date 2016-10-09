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
var _3=$.data(_2,"combotree");
var _4=_3.options;
var _5=_3.tree;
$(_2).addClass("combotree-f");
$(_2).combo($.extend({},_4,{onShowPanel:function(){
if(_4.editable){
_5.tree("doFilter","");
}
_4.onShowPanel.call(this);
}}));
var _6=$(_2).combo("panel");
if(!_5){
_5=$("<ul></ul>").appendTo(_6);
_3.tree=_5;
}
_5.tree($.extend({},_4,{checkbox:_4.multiple,onLoadSuccess:function(_7,_8){
var _9=$(_2).combotree("getValues");
if(_4.multiple){
$.map(_5.tree("getChecked"),function(_a){
$.easyui.addArrayItem(_9,_a.id);
});
}
_15(_2,_9,_3.remainText);
_4.onLoadSuccess.call(this,_7,_8);
},onClick:function(_b){
if(_4.multiple){
$(this).tree(_b.checked?"uncheck":"check",_b.target);
}else{
$(_2).combo("hidePanel");
}
_3.remainText=false;
_e(_2);
_4.onClick.call(this,_b);
},onCheck:function(_c,_d){
_3.remainText=false;
_e(_2);
_4.onCheck.call(this,_c,_d);
}}));
};
function _e(_f){
var _10=$.data(_f,"combotree");
var _11=_10.options;
var _12=_10.tree;
var vv=[];
if(_11.multiple){
vv=$.map(_12.tree("getChecked"),function(_13){
return _13.id;
});
}else{
var _14=_12.tree("getSelected");
if(_14){
vv.push(_14.id);
}
}
vv=vv.concat(_11.unselectedValues);
_15(_f,vv,_10.remainText);
};
function _15(_16,_17,_18){
var _19=$.data(_16,"combotree");
var _1a=_19.options;
var _1b=_19.tree;
var _1c=_1b.tree("options");
var _1d=_1c.onBeforeCheck;
var _1e=_1c.onCheck;
var _1f=_1c.onSelect;
_1c.onBeforeCheck=_1c.onCheck=_1c.onSelect=function(){
};
if(!$.isArray(_17)){
_17=_17.split(_1a.separator);
}
if(!_1a.multiple){
_17=_17.length?[_17[0]]:[""];
}
var vv=$.map(_17,function(_20){
return String(_20);
});
_1b.find("div.tree-node-selected").removeClass("tree-node-selected");
$.map(_1b.tree("getChecked"),function(_21){
if($.inArray(String(_21.id),vv)==-1){
_1b.tree("uncheck",_21.target);
}
});
var ss=[];
_1a.unselectedValues=[];
$.map(vv,function(v){
var _22=_1b.tree("find",v);
if(_22){
_1b.tree("check",_22.target).tree("select",_22.target);
ss.push(_22.text);
}else{
ss.push(_23(v,_1a.mappingRows)||v);
_1a.unselectedValues.push(v);
}
});
if(_1a.multiple){
$.map(_1b.tree("getChecked"),function(_24){
var id=String(_24.id);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_24.text);
}
});
}
_1c.onBeforeCheck=_1d;
_1c.onCheck=_1e;
_1c.onSelect=_1f;
if(!_18){
var s=ss.join(_1a.separator);
if($(_16).combo("getText")!=s){
$(_16).combo("setText",s);
}
}
$(_16).combo("setValues",vv);
function _23(_25,a){
var _26=$.easyui.getArrayItem(a,"id",_25);
return _26?_26.text:undefined;
};
};
function _27(_28,q){
var _29=$.data(_28,"combotree");
var _2a=_29.options;
var _2b=_29.tree;
_29.remainText=true;
_2b.tree("doFilter",_2a.multiple?q.split(_2a.separator):q);
};
function _2c(_2d){
var _2e=$.data(_2d,"combotree");
_2e.remainText=false;
$(_2d).combotree("setValues",$(_2d).combotree("getValues"));
$(_2d).combotree("hidePanel");
};
$.fn.combotree=function(_2f,_30){
if(typeof _2f=="string"){
var _31=$.fn.combotree.methods[_2f];
if(_31){
return _31(this,_30);
}else{
return this.combo(_2f,_30);
}
}
_2f=_2f||{};
return this.each(function(){
var _32=$.data(this,"combotree");
if(_32){
$.extend(_32.options,_2f);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_2f)});
}
_1(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _33=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{width:_33.width,height:_33.height,originalValue:_33.originalValue,disabled:_33.disabled,readonly:_33.readonly});
},clone:function(jq,_34){
var t=jq.combo("clone",_34);
t.data("combotree",{options:$.extend(true,{},jq.combotree("options")),tree:jq.combotree("tree")});
return t;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,_35){
return jq.each(function(){
var _36=$.data(this,"combotree").options;
_36.data=_35;
var _37=$.data(this,"combotree").tree;
_37.tree("loadData",_35);
});
},reload:function(jq,url){
return jq.each(function(){
var _38=$.data(this,"combotree").options;
var _39=$.data(this,"combotree").tree;
if(url){
_38.url=url;
}
_39.tree({url:_38.url});
});
},setValues:function(jq,_3a){
return jq.each(function(){
var _3b=$(this).combotree("options");
if($.isArray(_3a)){
_3a=$.map(_3a,function(_3c){
if(_3c&&typeof _3c=="object"){
$.easyui.addArrayItem(_3b.mappingRows,"id",_3c);
return _3c.id;
}else{
return _3c;
}
});
}
_15(this,_3a);
});
},setValue:function(jq,_3d){
return jq.each(function(){
$(this).combotree("setValues",$.isArray(_3d)?_3d:[_3d]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotree("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var _3e=$(this).combotree("options");
if(_3e.multiple){
$(this).combotree("setValues",_3e.originalValue);
}else{
$(this).combotree("setValue",_3e.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_3f){
return $.extend({},$.fn.combo.parseOptions(_3f),$.fn.tree.parseOptions(_3f));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false,unselectedValues:[],mappingRows:[],keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_2c(this);
},query:function(q,e){
_27(this,q);
}}});
})(jQuery);

