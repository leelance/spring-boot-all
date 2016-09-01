package com.lance.sitemesh.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/")
public class IndexController {

	@RequestMapping("index")
	public String index(){
		return "index.jsp";
	}
	
	@RequestMapping("tab")
	public String tab(){
		return "tab.jsp";
	}
	
	@RequestMapping("nestedlayout")
	public String nestedlayout(){
		return "nestedlayout.jsp";
	}
	
	@RequestMapping("datagrid")
	public String datagrid(){
		return "datagrid.jsp";
	}
}
