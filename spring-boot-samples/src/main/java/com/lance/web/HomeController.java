package com.lance.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/home/")
public class HomeController {
	
	/**
	 * 处理图片生成
	 * @return
	 */
	@RequestMapping("holder")
	public String holder(){
		return "user/customer/img-hoder.jsp";
	}
	
	/**
	 * 处理模板方法
	 * @return
	 */
	@RequestMapping("tmpl")
	public String tmpl(){
		return "user/customer/template.jsp";
	}
	
	@RequestMapping("adduser")
	public String addUser(){
		return "user/customer/user-add.jsp";
	}
}
