<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<h2>Nested Layout</h2>
<p>The layout region panel contains another layout or other components.</p>
<div style="margin:20px 0;"></div>
<div class="easyui-layout" style="width:100%;height:450px;">
	<div data-options="region:'north'" style="height:50px"></div>
	<div data-options="region:'south',split:true" style="height:50px;"></div>
	<div data-options="region:'east',split:true" title="East" style="width:180px;"></div>
	<div data-options="region:'west',split:true" title="West" style="width:100px;"></div>
	<div data-options="region:'center',iconCls:'icon-ok'" title="Center" style="padding:5px">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north',split:true" style="height:50px"></div>
			<div data-options="region:'west',split:true" style="width:100px"></div>
			<div data-options="region:'center'"></div>
		</div>
	</div>
</div>