package com.lance.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 * @author lance
 * 2014-6-8下午6:47:18
 */
@Controller
public class IndexController {
	
	/**
	 * 跳转首页
	 * @author lance
	 * 2014-6-8下午6:49:23
	 * @return
	 */
	@RequestMapping(value={"/index"})
	public String index(){
		return "index.jsp";
	}
	
	/**
	 * 跳转登录页面
	 * @author lance
	 * 2014-6-8下午6:49:40
	 * @return
	 */
	@RequestMapping(value="login",method=RequestMethod.GET)
	public String login(){
		System.out.println("----login get method-----");
		return "login.jsp";
	}
	
	/**
	 * 登录成功后跳转页面
	 * @author lance
	 * 2014-6-8下午6:50:47
	 * @param name
	 * @param password
	 * @return
	 */
	@RequestMapping(value="login",method=RequestMethod.POST)
	public String login(@RequestParam String name, @RequestParam String password){
		return "login.jsp";
	}
	
	/**
	 * 测试拦截器
	 * @param name
	 * @param password
	 * @return
	 */
	@RequestMapping("user/home")
	public String home(@RequestParam String name, @RequestParam String password){
		return "user/home.jsp";
	}
}
