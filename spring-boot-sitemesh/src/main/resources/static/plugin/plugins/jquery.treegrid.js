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
var _3=$.data(_2,"treegrid");
var _4=_3.options;
$(_2).datagrid($.extend({},_4,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_5,_6){
_16(_2);
_4.onResizeColumn.call(_2,_5,_6);
},onBeforeSortColumn:function(_7,_8){
if(_4.onBeforeSortColumn.call(_2,_7,_8)==false){
return false;
}
},onSortColumn:function(_9,_a){
_4.sortName=_9;
_4.sortOrder=_a;
if(_4.remoteSort){
_15(_2);
}else{
var _b=$(_2).treegrid("getData");
_4f(_2,null,_b);
}
_4.onSortColumn.call(_2,_9,_a);
},onClickCell:function(_c,_d){
_4.onClickCell.call(_2,_d,_30(_2,_c));
},onDblClickCell:function(_e,_f){
_4.onDblClickCell.call(_2,_f,_30(_2,_e));
},onRowContextMenu:function(e,_10){
_4.onContextMenu.call(_2,e,_30(_2,_10));
}}));
var _11=$.data(_2,"datagrid").options;
_4.columns=_11.columns;
_4.frozenColumns=_11.frozenColumns;
_3.dc=$.data(_2,"datagrid").dc;
if(_4.pagination){
var _12=$(_2).datagrid("getPager");
_12.pagination({pageNumber:_4.pageNumber,pageSize:_4.pageSize,pageList:_4.pageList,onSelectPage:function(_13,_14){
_4.pageNumber=_13;
_4.pageSize=_14;
_15(_2);
}});
_4.pageSize=_12.pagination("options").pageSize;
}
};
function _16(_17,_18){
var _19=$.data(_17,"datagrid").options;
var dc=$.data(_17,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_19.nowrap||_19.autoRowHeight)){
if(_18!=undefined){
var _1a=_1b(_17,_18);
for(var i=0;i<_1a.length;i++){
_1c(_1a[i][_19.idField]);
}
}
}
$(_17).datagrid("fixRowHeight",_18);
function _1c(_1d){
var tr1=_19.finder.getTr(_17,_1d,"body",1);
var tr2=_19.finder.getTr(_17,_1d,"body",2);
tr1.css("height","");
tr2.css("height","");
var _1e=Math.max(tr1.height(),tr2.height());
tr1.css("height",_1e);
tr2.css("height",_1e);
};
};
function _1f(_20){
var dc=$.data(_20,"datagrid").dc;
var _21=$.data(_20,"treegrid").options;
if(!_21.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _22(_23){
return function(e){
$.fn.datagrid.defaults.rowEvents[_23?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_23?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
};
function _24(e){
var tt=$(e.target);
if(tt.hasClass("tree-hit")){
_25(_26);
}else{
if(tt.hasClass("tree-checkbox")){
_25(_27);
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
}
function _25(fn){
var tr=tt.closest("tr.datagrid-row");
var _28=tr.closest("div.datagrid-view").children(".datagrid-f")[0];
fn(_28,tr.attr("node-id"));
};
};
function _27(_29,_2a,_2b,_2c){
var _2d=$.data(_29,"treegrid");
var _2e=_2d.checkedRows;
var _2f=_2d.options;
if(!_2f.checkbox){
return;
}
var row=_30(_29,_2a);
if(!row.checkState){
return;
}
var tr=_2f.finder.getTr(_29,_2a);
var ck=tr.find(".tree-checkbox");
if(_2b==undefined){
if(ck.hasClass("tree-checkbox1")){
_2b=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_2b=true;
}else{
if(row._checked==undefined){
row._checked=ck.hasClass("tree-checkbox1");
}
_2b=!row._checked;
}
}
}
row._checked=_2b;
if(_2b){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_2c){
if(_2f.onBeforeCheckNode.call(_29,row,_2b)==false){
return;
}
}
if(_2f.cascadeCheck){
_31(_29,row,_2b);
_32(_29,row);
}else{
_33(_29,row,_2b?"1":"0");
}
if(!_2c){
_2f.onCheckNode.call(_29,row,_2b);
}
};
function _33(_34,row,_35){
var _36=$.data(_34,"treegrid");
var _37=_36.checkedRows;
var _38=_36.options;
if(!row.checkState||_35==undefined){
return;
}
var tr=_38.finder.getTr(_34,row[_38.idField]);
var ck=tr.find(".tree-checkbox");
if(!ck.length){
return;
}
row.checkState=["unchecked","checked","indeterminate"][_35];
row.checked=(row.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+_35);
if(_35==0){
$.easyui.removeArrayItem(_37,_38.idField,row[_38.idField]);
}else{
$.easyui.addArrayItem(_37,_38.idField,row);
}
};
function _31(_39,row,_3a){
var _3b=_3a?1:0;
_33(_39,row,_3b);
$.easyui.forEach(row.children||[],true,function(r){
_33(_39,r,_3b);
});
};
function _32(_3c,row){
var _3d=$.data(_3c,"treegrid").options;
var _3e=_3f(_3c,row[_3d.idField]);
if(_3e){
_33(_3c,_3e,_40(_3e));
_32(_3c,_3e);
}
};
function _40(row){
var len=0;
var c0=0;
var c1=0;
$.easyui.forEach(row.children||[],false,function(r){
if(r.checkState){
len++;
if(r.checkState=="checked"){
c1++;
}else{
if(r.checkState=="unchecked"){
c0++;
}
}
}
});
if(len==0){
return undefined;
}
var _41=0;
if(c0==len){
_41=0;
}else{
if(c1==len){
_41=1;
}else{
_41=2;
}
}
return _41;
};
function _42(_43,_44){
var _45=$.data(_43,"treegrid").options;
if(!_45.checkbox){
return;
}
var row=_30(_43,_44);
var tr=_45.finder.getTr(_43,_44);
var ck=tr.find(".tree-checkbox");
if(_45.view.hasCheckbox(_43,row)){
if(!ck.length){
row.checkState=row.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(tr.find(".tree-title"));
}
if(row.checkState=="checked"){
_27(_43,_44,true,true);
}else{
if(row.checkState=="unchecked"){
_27(_43,_44,false,true);
}else{
var _46=_40(row);
if(_46===0){
_27(_43,_44,false,true);
}else{
if(_46===1){
_27(_43,_44,true,true);
}
}
}
}
}else{
ck.remove();
row.checkState=undefined;
row.checked=undefined;
_32(_43,row);
}
};
function _47(_48,_49){
var _4a=$.data(_48,"treegrid").options;
var tr1=_4a.finder.getTr(_48,_49,"body",1);
var tr2=_4a.finder.getTr(_48,_49,"body",2);
var _4b=$(_48).datagrid("getColumnFields",true).length+(_4a.rownumbers?1:0);
var _4c=$(_48).datagrid("getColumnFields",false).length;
_4d(tr1,_4b);
_4d(tr2,_4c);
function _4d(tr,_4e){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_4e+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _4f(_50,_51,_52,_53,_54){
var _55=$.data(_50,"treegrid");
var _56=_55.options;
var dc=_55.dc;
_52=_56.loadFilter.call(_50,_52,_51);
var _57=_30(_50,_51);
if(_57){
var _58=_56.finder.getTr(_50,_51,"body",1);
var _59=_56.finder.getTr(_50,_51,"body",2);
var cc1=_58.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_59.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_53){
_57.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_53){
_55.data=[];
}
}
if(!_53){
cc1.empty();
cc2.empty();
}
if(_56.view.onBeforeRender){
_56.view.onBeforeRender.call(_56.view,_50,_51,_52);
}
_56.view.render.call(_56.view,_50,cc1,true);
_56.view.render.call(_56.view,_50,cc2,false);
if(_56.showFooter){
_56.view.renderFooter.call(_56.view,_50,dc.footer1,true);
_56.view.renderFooter.call(_56.view,_50,dc.footer2,false);
}
if(_56.view.onAfterRender){
_56.view.onAfterRender.call(_56.view,_50);
}
if(!_51&&_56.pagination){
var _5a=$.data(_50,"treegrid").total;
var _5b=$(_50).datagrid("getPager");
if(_5b.pagination("options").total!=_5a){
_5b.pagination({total:_5a});
}
}
_16(_50);
_1f(_50);
$(_50).treegrid("showLines");
$(_50).treegrid("setSelectionState");
$(_50).treegrid("autoSizeColumn");
if(!_54){
_56.onLoadSuccess.call(_50,_57,_52);
}
};
function _15(_5c,_5d,_5e,_5f,_60){
var _61=$.data(_5c,"treegrid").options;
var _62=$(_5c).datagrid("getPanel").find("div.datagrid-body");
if(_5d==undefined&&_61.queryParams){
_61.queryParams.id=undefined;
}
if(_5e){
_61.queryParams=_5e;
}
var _63=$.extend({},_61.queryParams);
if(_61.pagination){
$.extend(_63,{page:_61.pageNumber,rows:_61.pageSize});
}
if(_61.sortName){
$.extend(_63,{sort:_61.sortName,order:_61.sortOrder});
}
var row=_30(_5c,_5d);
if(_61.onBeforeLoad.call(_5c,row,_63)==false){
return;
}
var _64=_62.find("tr[node-id=\""+_5d+"\"] span.tree-folder");
_64.addClass("tree-loading");
$(_5c).treegrid("loading");
var _65=_61.loader.call(_5c,_63,function(_66){
_64.removeClass("tree-loading");
$(_5c).treegrid("loaded");
_4f(_5c,_5d,_66,_5f);
if(_60){
_60();
}
},function(){
_64.removeClass("tree-loading");
$(_5c).treegrid("loaded");
_61.onLoadError.apply(_5c,arguments);
if(_60){
_60();
}
});
if(_65==false){
_64.removeClass("tree-loading");
$(_5c).treegrid("loaded");
}
};
function _67(_68){
var _69=_6a(_68);
return _69.length?_69[0]:null;
};
function _6a(_6b){
return $.data(_6b,"treegrid").data;
};
function _3f(_6c,_6d){
var row=_30(_6c,_6d);
if(row._parentId){
return _30(_6c,row._parentId);
}else{
return null;
}
};
function _1b(_6e,_6f){
var _70=$.data(_6e,"treegrid").data;
if(_6f){
var _71=_30(_6e,_6f);
_70=_71?(_71.children||[]):[];
}
var _72=[];
$.easyui.forEach(_70,true,function(_73){
_72.push(_73);
});
return _72;
};
function _74(_75,_76){
var _77=$.data(_75,"treegrid").options;
var tr=_77.finder.getTr(_75,_76);
var _78=tr.children("td[field=\""+_77.treeField+"\"]");
return _78.find("span.tree-indent,span.tree-hit").length;
};
function _30(_79,_7a){
var _7b=$.data(_79,"treegrid");
var _7c=_7b.options;
var _7d=null;
$.easyui.forEach(_7b.data,true,function(_7e){
if(_7e[_7c.idField]==_7a){
_7d=_7e;
return false;
}
});
return _7d;
};
function _7f(_80,_81){
var _82=$.data(_80,"treegrid").options;
var row=_30(_80,_81);
var tr=_82.finder.getTr(_80,_81);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_82.onBeforeCollapse.call(_80,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_82.animate){
cc.slideUp("normal",function(){
$(_80).treegrid("autoSizeColumn");
_16(_80,_81);
_82.onCollapse.call(_80,row);
});
}else{
cc.hide();
$(_80).treegrid("autoSizeColumn");
_16(_80,_81);
_82.onCollapse.call(_80,row);
}
};
function _83(_84,_85){
var _86=$.data(_84,"treegrid").options;
var tr=_86.finder.getTr(_84,_85);
var hit=tr.find("span.tree-hit");
var row=_30(_84,_85);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_86.onBeforeExpand.call(_84,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _87=tr.next("tr.treegrid-tr-tree");
if(_87.length){
var cc=_87.children("td").children("div");
_88(cc);
}else{
_47(_84,row[_86.idField]);
var _87=tr.next("tr.treegrid-tr-tree");
var cc=_87.children("td").children("div");
cc.hide();
var _89=$.extend({},_86.queryParams||{});
_89.id=row[_86.idField];
_15(_84,row[_86.idField],_89,true,function(){
if(cc.is(":empty")){
_87.remove();
}else{
_88(cc);
}
});
}
function _88(cc){
row.state="open";
if(_86.animate){
cc.slideDown("normal",function(){
$(_84).treegrid("autoSizeColumn");
_16(_84,_85);
_86.onExpand.call(_84,row);
});
}else{
cc.show();
$(_84).treegrid("autoSizeColumn");
_16(_84,_85);
_86.onExpand.call(_84,row);
}
};
};
function _26(_8a,_8b){
var _8c=$.data(_8a,"treegrid").options;
var tr=_8c.finder.getTr(_8a,_8b);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_7f(_8a,_8b);
}else{
_83(_8a,_8b);
}
};
function _8d(_8e,_8f){
var _90=$.data(_8e,"treegrid").options;
var _91=_1b(_8e,_8f);
if(_8f){
_91.unshift(_30(_8e,_8f));
}
for(var i=0;i<_91.length;i++){
_7f(_8e,_91[i][_90.idField]);
}
};
function _92(_93,_94){
var _95=$.data(_93,"treegrid").options;
var _96=_1b(_93,_94);
if(_94){
_96.unshift(_30(_93,_94));
}
for(var i=0;i<_96.length;i++){
_83(_93,_96[i][_95.idField]);
}
};
function _97(_98,_99){
var _9a=$.data(_98,"treegrid").options;
var ids=[];
var p=_3f(_98,_99);
while(p){
var id=p[_9a.idField];
ids.unshift(id);
p=_3f(_98,id);
}
for(var i=0;i<ids.length;i++){
_83(_98,ids[i]);
}
};
function _9b(_9c,_9d){
var _9e=$.data(_9c,"treegrid");
var _9f=_9e.options;
if(_9d.parent){
var tr=_9f.finder.getTr(_9c,_9d.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_47(_9c,_9d.parent);
}
var _a0=tr.children("td[field=\""+_9f.treeField+"\"]").children("div.datagrid-cell");
var _a1=_a0.children("span.tree-icon");
if(_a1.hasClass("tree-file")){
_a1.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_a1);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_4f(_9c,_9d.parent,_9d.data,_9e.data.length>0,true);
};
function _a2(_a3,_a4){
var ref=_a4.before||_a4.after;
var _a5=$.data(_a3,"treegrid").options;
var _a6=_3f(_a3,ref);
_9b(_a3,{parent:(_a6?_a6[_a5.idField]:null),data:[_a4.data]});
var _a7=_a6?_a6.children:$(_a3).treegrid("getRoots");
for(var i=0;i<_a7.length;i++){
if(_a7[i][_a5.idField]==ref){
var _a8=_a7[_a7.length-1];
_a7.splice(_a4.before?i:(i+1),0,_a8);
_a7.splice(_a7.length-1,1);
break;
}
}
_a9(true);
_a9(false);
_1f(_a3);
$(_a3).treegrid("showLines");
function _a9(_aa){
var _ab=_aa?1:2;
var tr=_a5.finder.getTr(_a3,_a4.data[_a5.idField],"body",_ab);
var _ac=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var _ad=_a5.finder.getTr(_a3,ref,"body",_ab);
if(_a4.before){
tr.insertBefore(_ad);
}else{
var sub=_ad.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:_ad);
}
_ac.remove();
};
};
function _ae(_af,_b0){
var _b1=$.data(_af,"treegrid");
var _b2=_b1.options;
var _b3=_3f(_af,_b0);
$(_af).datagrid("deleteRow",_b0);
$.easyui.removeArrayItem(_b1.checkedRows,_b2.idField,_b0);
_1f(_af);
if(_b3){
_42(_af,_b3[_b2.idField]);
}
_b1.total-=1;
$(_af).datagrid("getPager").pagination("refresh",{total:_b1.total});
$(_af).treegrid("showLines");
};
function _b4(_b5){
var t=$(_b5);
var _b6=t.treegrid("options");
if(_b6.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _b7=t.treegrid("getRoots");
if(_b7.length>1){
_b8(_b7[0]).addClass("tree-root-first");
}else{
if(_b7.length==1){
_b8(_b7[0]).addClass("tree-root-one");
}
}
_b9(_b7);
_ba(_b7);
function _b9(_bb){
$.map(_bb,function(_bc){
if(_bc.children&&_bc.children.length){
_b9(_bc.children);
}else{
var _bd=_b8(_bc);
_bd.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_bb.length){
var _be=_b8(_bb[_bb.length-1]);
_be.addClass("tree-node-last");
_be.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
};
function _ba(_bf){
$.map(_bf,function(_c0){
if(_c0.children&&_c0.children.length){
_ba(_c0.children);
}
});
for(var i=0;i<_bf.length-1;i++){
var _c1=_bf[i];
var _c2=t.treegrid("getLevel",_c1[_b6.idField]);
var tr=_b6.finder.getTr(_b5,_c1[_b6.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+_b6.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_c2-1)+")").addClass("tree-line");
}
};
function _b8(_c3){
var tr=_b6.finder.getTr(_b5,_c3[_b6.idField]);
var _c4=tr.find("td[field=\""+_b6.treeField+"\"] div.datagrid-cell");
return _c4;
};
};
$.fn.treegrid=function(_c5,_c6){
if(typeof _c5=="string"){
var _c7=$.fn.treegrid.methods[_c5];
if(_c7){
return _c7(this,_c6);
}else{
return this.datagrid(_c5,_c6);
}
}
_c5=_c5||{};
return this.each(function(){
var _c8=$.data(this,"treegrid");
if(_c8){
$.extend(_c8.options,_c5);
}else{
_c8=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_c5),data:[],checkedRows:[],tmpIds:[]});
}
_1(this);
if(_c8.options.data){
$(this).treegrid("loadData",_c8.options.data);
}
_15(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_c9){
return jq.each(function(){
$(this).datagrid("resize",_c9);
});
},fixRowHeight:function(jq,_ca){
return jq.each(function(){
_16(this,_ca);
});
},loadData:function(jq,_cb){
return jq.each(function(){
_4f(this,_cb.parent,_cb);
});
},load:function(jq,_cc){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_cc);
});
},reload:function(jq,id){
return jq.each(function(){
var _cd=$(this).treegrid("options");
var _ce={};
if(typeof id=="object"){
_ce=id;
}else{
_ce=$.extend({},_cd.queryParams);
_ce.id=id;
}
if(_ce.id){
var _cf=$(this).treegrid("find",_ce.id);
if(_cf.children){
_cf.children.splice(0,_cf.children.length);
}
_cd.queryParams=_ce;
var tr=_cd.finder.getTr(this,_ce.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_83(this,_ce.id);
}else{
_15(this,null,_ce);
}
});
},reloadFooter:function(jq,_d0){
return jq.each(function(){
var _d1=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_d0){
$.data(this,"treegrid").footer=_d0;
}
if(_d1.showFooter){
_d1.view.renderFooter.call(_d1.view,this,dc.footer1,true);
_d1.view.renderFooter.call(_d1.view,this,dc.footer2,false);
if(_d1.view.onAfterRender){
_d1.view.onAfterRender.call(_d1.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _67(jq[0]);
},getRoots:function(jq){
return _6a(jq[0]);
},getParent:function(jq,id){
return _3f(jq[0],id);
},getChildren:function(jq,id){
return _1b(jq[0],id);
},getLevel:function(jq,id){
return _74(jq[0],id);
},find:function(jq,id){
return _30(jq[0],id);
},isLeaf:function(jq,id){
var _d2=$.data(jq[0],"treegrid").options;
var tr=_d2.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_7f(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_83(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_26(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_8d(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_92(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_97(this,id);
});
},append:function(jq,_d3){
return jq.each(function(){
_9b(this,_d3);
});
},insert:function(jq,_d4){
return jq.each(function(){
_a2(this,_d4);
});
},remove:function(jq,id){
return jq.each(function(){
_ae(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var _d5=$.data(this,"treegrid").options;
_d5.view.refreshRow.call(_d5.view,this,id);
});
},update:function(jq,_d6){
return jq.each(function(){
var _d7=$.data(this,"treegrid").options;
var row=_d6.row;
_d7.view.updateRow.call(_d7.view,this,_d6.id,row);
if(row.checked!=undefined){
row=_30(this,_d6.id);
$.extend(row,{checkState:row.checked?"checked":(row.checked===false?"unchecked":undefined)});
_42(this,_d6.id);
}
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_b4(this);
});
},setSelectionState:function(jq){
return jq.each(function(){
$(this).datagrid("setSelectionState");
var _d8=$(this).data("treegrid");
for(var i=0;i<_d8.tmpIds.length;i++){
_27(this,_d8.tmpIds[i],true,true);
}
_d8.tmpIds=[];
});
},getCheckedNodes:function(jq,_d9){
_d9=_d9||"checked";
var _da=[];
$.easyui.forEach(jq.data("treegrid").checkedRows,false,function(row){
if(row.checkState==_d9){
_da.push(row);
}
});
return _da;
},checkNode:function(jq,id){
return jq.each(function(){
_27(this,id,true);
});
},uncheckNode:function(jq,id){
return jq.each(function(){
_27(this,id,false);
});
},clearChecked:function(jq){
return jq.each(function(){
var _db=this;
var _dc=$(_db).treegrid("options");
$(_db).datagrid("clearChecked");
$.map($(_db).treegrid("getCheckedNodes"),function(row){
_27(_db,row[_dc.idField],false,true);
});
});
}};
$.fn.treegrid.parseOptions=function(_dd){
return $.extend({},$.fn.datagrid.parseOptions(_dd),$.parser.parseOptions(_dd,["treeField",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean"}]));
};
var _de=$.extend({},$.fn.datagrid.defaults.view,{render:function(_df,_e0,_e1){
var _e2=$.data(_df,"treegrid").options;
var _e3=$(_df).datagrid("getColumnFields",_e1);
var _e4=$.data(_df,"datagrid").rowIdPrefix;
if(_e1){
if(!(_e2.rownumbers||(_e2.frozenColumns&&_e2.frozenColumns.length))){
return;
}
}
var _e5=this;
if(this.treeNodes&&this.treeNodes.length){
var _e6=_e7.call(this,_e1,this.treeLevel,this.treeNodes);
$(_e0).append(_e6.join(""));
}
function _e7(_e8,_e9,_ea){
var _eb=$(_df).treegrid("getParent",_ea[0][_e2.idField]);
var _ec=(_eb?_eb.children.length:$(_df).treegrid("getRoots").length)-_ea.length;
var _ed=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_ea.length;i++){
var row=_ea[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=_e2.rowStyler?_e2.rowStyler.call(_df,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_ec++%2&&_e2.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _ee=cs.s?"style=\""+cs.s+"\"":"";
var _ef=_e4+"-"+(_e8?1:2)+"-"+row[_e2.idField];
_ed.push("<tr id=\""+_ef+"\" node-id=\""+row[_e2.idField]+"\" "+cls+" "+_ee+">");
_ed=_ed.concat(_e5.renderRow.call(_e5,_df,_e3,_e8,_e9,row));
_ed.push("</tr>");
if(row.children&&row.children.length){
var tt=_e7.call(this,_e8,_e9+1,row.children);
var v=row.state=="closed"?"none":"block";
_ed.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_e3.length+(_e2.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_ed=_ed.concat(tt);
_ed.push("</div></td></tr>");
}
}
_ed.push("</tbody></table>");
return _ed;
};
},renderFooter:function(_f0,_f1,_f2){
var _f3=$.data(_f0,"treegrid").options;
var _f4=$.data(_f0,"treegrid").footer||[];
var _f5=$(_f0).datagrid("getColumnFields",_f2);
var _f6=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_f4.length;i++){
var row=_f4[i];
row[_f3.idField]=row[_f3.idField]||("foot-row-id"+i);
_f6.push("<tr class=\"datagrid-row\" node-id=\""+row[_f3.idField]+"\">");
_f6.push(this.renderRow.call(this,_f0,_f5,_f2,0,row));
_f6.push("</tr>");
}
_f6.push("</tbody></table>");
$(_f1).html(_f6.join(""));
},renderRow:function(_f7,_f8,_f9,_fa,row){
var _fb=$.data(_f7,"treegrid");
var _fc=_fb.options;
var cc=[];
if(_f9&&_fc.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_f8.length;i++){
var _fd=_f8[i];
var col=$(_f7).datagrid("getColumnOption",_fd);
if(col){
var css=col.styler?(col.styler(row[_fd],row)||""):"";
var cs=this.getStyleValue(css);
var cls=cs.c?"class=\""+cs.c+"\"":"";
var _fe=col.hidden?"style=\"display:none;"+cs.s+"\"":(cs.s?"style=\""+cs.s+"\"":"");
cc.push("<td field=\""+_fd+"\" "+cls+" "+_fe+">");
var _fe="";
if(!col.checkbox){
if(col.align){
_fe+="text-align:"+col.align+";";
}
if(!_fc.nowrap){
_fe+="white-space:normal;height:auto;";
}else{
if(_fc.autoRowHeight){
_fe+="height:auto;";
}
}
}
cc.push("<div style=\""+_fe+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_fd+"\" value=\""+(row[_fd]!=undefined?row[_fd]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_fd],row);
}else{
val=row[_fd];
}
if(_fd==_fc.treeField){
for(var j=0;j<_fa;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
if(this.hasCheckbox(_f7,row)){
var _ff=0;
var crow=$.easyui.getArrayItem(_fb.checkedRows,_fc.idField,row[_fc.idField]);
if(crow){
_ff=crow.checkState=="checked"?1:2;
}else{
var prow=$.easyui.getArrayItem(_fb.checkedRows,_fc.idField,row._parentId);
if(prow&&prow.checkState=="checked"&&_fc.cascadeCheck){
_ff=1;
row.checked=true;
$.easyui.addArrayItem(_fb.checkedRows,_fc.idField,row);
}else{
if(row.checked){
$.easyui.addArrayItem(_fb.tmpIds,row[_fc.idField]);
}
}
row.checkState=_ff?"checked":"unchecked";
}
cc.push("<span class=\"tree-checkbox tree-checkbox"+_ff+"\"></span>");
}else{
row.checkState=undefined;
row.checked=undefined;
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},hasCheckbox:function(_100,row){
var opts=$.data(_100,"treegrid").options;
if(opts.checkbox){
if($.isFunction(opts.checkbox)){
if(opts.checkbox.call(_100,row)){
return true;
}else{
return false;
}
}else{
if(opts.onlyLeafCheck){
if(row.state=="open"&&!(row.children&&row.children.length)){
return true;
}
}else{
return true;
}
}
}
return false;
},refreshRow:function(_101,id){
this.updateRow.call(this,_101,id,{});
},updateRow:function(_102,id,row){
var opts=$.data(_102,"treegrid").options;
var _103=$(_102).treegrid("find",id);
$.extend(_103,row);
var _104=$(_102).treegrid("getLevel",id)-1;
var _105=opts.rowStyler?opts.rowStyler.call(_102,_103):"";
var _106=$.data(_102,"datagrid").rowIdPrefix;
var _107=_103[opts.idField];
function _108(_109){
var _10a=$(_102).treegrid("getColumnFields",_109);
var tr=opts.finder.getTr(_102,id,"body",(_109?1:2));
var _10b=tr.find("div.datagrid-cell-rownumber").html();
var _10c=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_102,_10a,_109,_104,_103));
tr.attr("style",_105||"");
tr.find("div.datagrid-cell-rownumber").html(_10b);
if(_10c){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_107!=id){
tr.attr("id",_106+"-"+(_109?1:2)+"-"+_107);
tr.attr("node-id",_107);
}
};
_108.call(this,true);
_108.call(this,false);
$(_102).treegrid("fixRowHeight",id);
},deleteRow:function(_10d,id){
var opts=$.data(_10d,"treegrid").options;
var tr=opts.finder.getTr(_10d,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _10e=del(id);
if(_10e){
if(_10e.children.length==0){
tr=opts.finder.getTr(_10d,_10e[opts.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
cell.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(cell);
}
}
this.setEmptyMsg(_10d);
function del(id){
var cc;
var _10f=$(_10d).treegrid("getParent",id);
if(_10f){
cc=_10f.children;
}else{
cc=$(_10d).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][opts.idField]==id){
cc.splice(i,1);
break;
}
}
return _10f;
};
},onBeforeRender:function(_110,_111,data){
if($.isArray(_111)){
data={total:_111.length,rows:_111};
_111=null;
}
if(!data){
return false;
}
var _112=$.data(_110,"treegrid");
var opts=_112.options;
if(data.length==undefined){
if(data.footer){
_112.footer=data.footer;
}
if(data.total){
_112.total=data.total;
}
data=this.transfer(_110,_111,data.rows);
}else{
function _113(_114,_115){
for(var i=0;i<_114.length;i++){
var row=_114[i];
row._parentId=_115;
if(row.children&&row.children.length){
_113(row.children,row[opts.idField]);
}
}
};
_113(data,_111);
}
var node=_30(_110,_111);
if(node){
if(node.children){
node.children=node.children.concat(data);
}else{
node.children=data;
}
}else{
_112.data=_112.data.concat(data);
}
this.sort(_110,data);
this.treeNodes=data;
this.treeLevel=$(_110).treegrid("getLevel",_111);
},sort:function(_116,data){
var opts=$.data(_116,"treegrid").options;
if(!opts.remoteSort&&opts.sortName){
var _117=opts.sortName.split(",");
var _118=opts.sortOrder.split(",");
_119(data);
}
function _119(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_117.length;i++){
var sn=_117[i];
var so=_118[i];
var col=$(_116).treegrid("getColumnOption",sn);
var _11a=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_11a(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _11b=rows[i].children;
if(_11b&&_11b.length){
_119(_11b);
}
}
};
},transfer:function(_11c,_11d,data){
var opts=$.data(_11c,"treegrid").options;
var rows=$.extend([],data);
var _11e=_11f(_11d,rows);
var toDo=$.extend([],_11e);
while(toDo.length){
var node=toDo.shift();
var _120=_11f(node[opts.idField],rows);
if(_120.length){
if(node.children){
node.children=node.children.concat(_120);
}else{
node.children=_120;
}
toDo=toDo.concat(_120);
}
}
return _11e;
function _11f(_121,rows){
var rr=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==_121){
rr.push(row);
rows.splice(i,1);
i--;
}
}
return rr;
};
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,animate:false,singleSelect:true,view:_de,rowEvents:$.extend({},$.fn.datagrid.defaults.rowEvents,{mouseover:_22(true),mouseout:_22(false),click:_24}),loader:function(_122,_123,_124){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_122,dataType:"json",success:function(data){
_123(data);
},error:function(){
_124.apply(this,arguments);
}});
},loadFilter:function(data,_125){
return data;
},finder:{getTr:function(_126,id,type,_127){
type=type||"body";
_127=_127||0;
var dc=$.data(_126,"datagrid").dc;
if(_127==0){
var opts=$.data(_126,"treegrid").options;
var tr1=opts.finder.getTr(_126,id,type,1);
var tr2=opts.finder.getTr(_126,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_126,"datagrid").rowIdPrefix+"-"+_127+"-"+id);
if(!tr.length){
tr=(_127==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_127==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_127==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_127==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_127==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_127==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_127==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_127==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_128,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_128).treegrid("find",id);
},getRows:function(_129){
return $(_129).treegrid("getChildren");
}},onBeforeLoad:function(row,_12a){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_12b,row){
},onDblClickCell:function(_12c,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_12d){
},onCancelEdit:function(row){
},onBeforeCheckNode:function(row,_12e){
},onCheckNode:function(row,_12f){
}});
})(jQuery);

