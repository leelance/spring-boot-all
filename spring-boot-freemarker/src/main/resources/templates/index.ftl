
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>FreeMarker Index</title>

    <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/index">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <div class="jumbotron">
      <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
      </div>
    </div>

    <div class="container">
      <div class="row">
       	 <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Summary</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>CreateTime</th>
                </tr>
              </thead>
       	 	  <tbody>
       	 	  	  <#list page.list as info>
       	 	  	  	<tr>
	                  <td>${info.id}</td>
	                  <td>
	                  	<a href="/detail/${info.id}" title="${info.title}">
							<#if info.summary?length &gt; 20>
						  		${info.title?substring(0,20)} ...
						    <#else>
								${info.title}
						    </#if>
			            </a>
	                  </td>
	                  <td title="${info.summary}">
	                  	  <#if info.summary?length &gt; 35>
						  		${info.summary?substring(0,35)} ...
						  <#else>
								${info.summary}
						  </#if>
	                  </td>
	                  <td>${info.author}</td>
	                  <td>
	                  	  <#switch info.status>
	                  		  <#case "1">
	                  		 		 发布
     						        <#break>
     						  <#default>
     						  	    草稿
	                  	  </#switch>
	                  </td>
	                  <td>
						 ${info.createTime?date}
	                  </td>
	                </tr>
       	 	  	  </#list>
       	 	  </tbody>
       	 	  <tfoot>
	       	 	  <tr>
	   	 	  		<td colspan="6" class="text-center">
	   	 	  			  <ul class="pagination" style="margin:0px;">
	   	 	  			  	<!-- First Page -->
	   	 	  			  	<#if page.isFirstPage()>
	   	 	  			  		<li><span aria-hidden="true">&laquo;</span></li>
						    <#else>
								<li>
							      <a href="/index?page=${page.pageNumber-1}" aria-label="Previous">
							        <span aria-hidden="true">&laquo;</span>
							      </a>
							    </li>
						    </#if>
						    
						    <#list page.navigatePageNumbers as index>
						    	<li><a href="/index?page=${index}">${index}</a></li>
						    </#list>

							<!-- Last Page -->
							<#if page.isLastPage()>
	   	 	  			  		<li><span aria-hidden="true">&raquo;</span></li>
						    <#else>
								<li>
							      <a href="/index?page=${page.pageNumber+1}" aria-label="Previous">
							        <span aria-hidden="true">&raquo;</span>
							      </a>
							    </li>
						    </#if>
						  </ul>
	   	 	  		</td>
	       	 	  </tr>
       	 	  </tfoot>
       	 </table>	
      </div>
	
	  <#include "/footer.ftl">
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </body>
</html>