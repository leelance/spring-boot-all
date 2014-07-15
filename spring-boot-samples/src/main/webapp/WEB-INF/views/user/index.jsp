<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<!-- CSS件 -->
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/customer/index.css">
<body>
	<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand spring-logo" href="#"><span></span></a>
			</div>
			<div class="collapse navbar-collapse pull-right">
				<ul class="nav navbar-nav">
					<li><a href="#">Docs</a></li>
					<li><a href="#about">Guides</a></li>
					<li><a href="#contact">Projects</a></li>
					<li><a href="#contact">Blog</a></li>
					<li><a href="#contact">Forum</a></li>
				</ul>
			</div>
			<!-- /.nav-collapse -->
		</div>
		<!-- /.container -->
	</div>
	<!-- /.navbar -->
	
	<!-- billboard -->
	<div class="jumbotron billboard">
      <div class="container">
        <h2>Let's build a better Enterprise.</h2>
        <p>Spring helps development teams everywhere build simple, portable, </p> 
		<p>fast and flexible JVM-based systems and applications.</p>
      </div>
    </div>
	
	<!-- keyword -->
	<div class="jumbotron key-wrapper">
		<div class="container">
	      <div class="row">
	        <div class="col-md-4">
	          <h2>BUILD ANYTHING</h2>
	          <p>
				Write clean, testable code against the infrastructure components of your choice and accomplish any task – without re-inventing the wheel.
	          </p>
	        </div>
	        <div class="col-md-4">
	          <h2>RUN ANYWHERE</h2>
	          <p>
				Keep it portable – Spring-based apps run anywhere the JVM does. Deploy standalone, in an app server, on a PaaS or all of the above.
	          </p>
	       </div>
	        <div class="col-md-4">
	          <h2>REST ASSURED</h2>
	          <p>
				Code with confidence – Spring provides an open programming model that is comprehensive, cohesive, widely understood and well-supported.
	          </p>
	        </div>
	      </div>
	    </div>
    </div>
    
    <!-- footer -->
    <div id="footer">
      <div class="container">
        <p class="text-muted">© 2014 Pivotal Software, Inc. All Rights Reserved. Terms of Use and Privacy</p>
      </div>
    </div>
	<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
	<script src="/js/bootstrap.min.js"></script>
</body>
</html>