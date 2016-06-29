package com.lance.shiro.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

	/**
	 * Go Index
	 * @return
	 */
	@RequestMapping(value={"", "/", "index"})
	public String index() {
		return "index.jsp";
	}
	
	/**
	 * Unauthorized
	 * @return
	 */
	@RequestMapping("unauthorized")
	public String unauthorized() {
		return "unauthorized.jsp";
	}
	
	/**
	 * reports
	 * @return
	 */
	@RequestMapping("reports")
	public String reports() {
		return "reports.jsp";
	}
}
