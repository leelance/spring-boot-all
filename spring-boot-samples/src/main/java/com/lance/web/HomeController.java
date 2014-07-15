package com.lance.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/home/")
public class HomeController {
	
	@RequestMapping("holder")
	public String holder(){
		return "user/customer/img-hoder.jsp";
	}
}
