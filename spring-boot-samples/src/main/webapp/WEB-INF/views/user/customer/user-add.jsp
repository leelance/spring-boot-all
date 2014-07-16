<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project Management</title>

<!-- CSS件 -->
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/customer/home.css">
<link rel="stylesheet" href="/css/customer/user.css">

</head>
<body>
	<!-- header -->
	<jsp:include page="../common/header.jsp"></jsp:include>
	<!-- content -->
	<div class="container-fluid">
		<div class="row">
			<!-- left -->
			<div class="col-sm-3 col-md-2 sidebar">
				<jsp:include page="../common/home-left.jsp"></jsp:include>
			</div>

			<!-- center content -->
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="row">
					 <!-- <h3>用户管理</h3>  -->
					 <div class="text-right">
					 	<div class="pull-left user-title">用户管理</div>
					 	<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".user-modal-lg">Add</button>
					 	<button type="button" class="btn btn-primary">Edit</button>
					 	<button type="button" class="btn btn-primary">Del</button>
					 </div>			
					 <table class="table table-bordered table-striped" id="query-user">
					 	<thead>
					 		<tr>
					 			<td width="35"><input type="checkbox"></td>
					 			<td>姓名</td>
					 			<td>邮箱</td>
					 			<td>性别</td>
					 			<td>电话</td>
					 			<td width="70">操作</td>
					 		</tr>
				 		</thead>
					 </table>
				</div>
			</div>
		</div>
	</div>
	
	<!-- =====Model===== -->
	<div class="modal fade user-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-lg">
	    <div class="modal-content">
	    	<div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal">
	          	<span aria-hidden="true">&times;</span>
	          	<span class="sr-only">Close</span>
	          </button>
	          <h4 class="modal-title" id="myLargeModalLabel">Add User</h4>
	        </div>
	        <div class="modal-body">
	           <form class="form-horizontal" role="form" action="/user/post" method="post" id="user-form">
	           	<div class="form-group">
	           		<span class="col-sm-1"></span>
				    <label for="inputName3" class="col-sm-2 control-label">Name</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="inputName3" placeholder="Name" name="name">
				    </div>
				  </div>	
				  <div class="form-group">
				  	<span class="col-sm-1"></span>
				    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
				    <div class="col-sm-6">
				      <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email">
				    </div>
				  </div>
				  <div class="form-group">
				  	<span class="col-sm-1"></span>
				    <label class="col-sm-2 control-label">Sex</label>
				    <div class="col-sm-6">
				      <label class="radio-inline">
						  <input type="radio" name="sex" id="inlineRadio1" value="1" checked="checked"> 男
					  </label>
					  <label class="radio-inline">
						  <input type="radio" name="sex" id="inlineRadio2" value="0"> 女
					  </label>
				    </div>
				  </div>
				  <div class="form-group">
				  	<span class="col-sm-1"></span>
				    <label for="inputPhone3" class="col-sm-2 control-label">Phone</label>
				    <div class="col-sm-6">
				      <input type="tel" class="form-control" id="inputPhone3" placeholder="Phone" name="tel">
				    </div>
				  </div>
				  <!-- Address -->
				  <div class="form-group addr-group-border">
				  	<div class="row user-addr-row">
				  		<span class="col-sm-1"></span>
					    <label class="col-sm-2 control-label">City</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" placeholder="City" name="addresses[0].city">
					    </div>
					    <div class="col-sm-1 address-btn">
					    	<a href="#" class="btn btn-primary" id="add-address">add</a>
					    </div>
				  	</div>
				  	<div class="row user-addr-row">
				  		<span class="col-sm-1"></span>
					    <label class="col-sm-2 control-label">Province</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" placeholder="Province" name="addresses[0].province">
					    </div>
				  	</div>
				  	<div class="row user-addr-row">
				  		<span class="col-sm-1"></span>
					    <label class="col-sm-2 control-label">Address</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" placeholder="Address" name="addresses[0].address">
					    </div>
				  	</div>
				  </div>			
				</form>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="button" class="btn btn-primary" id="saveBtn">Save changes</button>
	        </div>
	    </div>
	  </div>
	</div>
	
	<!-- ======Template===== -->
	<script id="user-tmpl" type="text/x-jquery-tmpl">
    	<tr>
			<td><input type="checkbox"></td>
			<td>
				<a href="#" class="user-name-hide">\${name}</a>
				<div style="display: none;">
					<table class="table table-bordered table-striped">
						{{each addresses}}
							<tr>
								<td>\${city}</td>
								<td>\${province}</td>
								<td>\${address}</td>
							</tr>
						{{/each}}
					</table>
				</div>
			</td>
			<td>\${email}</td>
			<td>
				{{if sex == 1}}
					男
				{{else sex == 0}}
					女
				{{/if}}
			</td>
			<td>\${tel}</td>
			<td><a href="/user/del/\${id}" class="user-del">Del</a></td>
		</tr>
	</script>
	<!-- 地址模板 -->
	<script id="user-addr-tmpl" type="text/x-jquery-tmpl">
	 <div class="form-group addr-group-border">
	  	<div class="row user-addr-row">
	  		<span class="col-sm-1"></span>
		    <label class="col-sm-2 control-label">City</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" placeholder="City" name="\${cityName}">
		    </div>
			<div class="col-sm-1 address-del-btn">
				<a href="#" class="btn btn-primary">del</a>
			</div>
	  	</div>
	  	<div class="row user-addr-row">
	  		<span class="col-sm-1"></span>
		    <label class="col-sm-2 control-label">Province</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" placeholder="Province" name="\${proName}">
		    </div>
	  	</div>
	  	<div class="row user-addr-row">
	  		<span class="col-sm-1"></span>
		    <label class="col-sm-2 control-label">Address</label>
		    <div class="col-sm-6">
		      <input type="text" class="form-control" placeholder="Address" name="\${addName}">
		    </div>
	  	</div>
	  </div>	
	</script>
	
	<!-- JS file -->
	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="/js/bootstrap.min.js"></script>
	<script src="/js/plugins/jquery.tmpl.min.js"></script>
	<script src="/js/customer/AddUser.js"></script>
</body>
</html>