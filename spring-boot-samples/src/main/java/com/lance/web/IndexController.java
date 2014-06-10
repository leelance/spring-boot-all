package com.lance.web;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lance.entity.UserEntity;

/**
 * 
 * @author lance
 * 2014-6-8下午6:47:18
 */
@Controller
public class IndexController {
	@Autowired
	private HttpSession session;
	
	/**
	 * 跳转登录页面
	 * @author lance
	 * 2014-6-8下午6:49:40
	 * @return
	 */
	@RequestMapping(value={"login","/"},method=RequestMethod.GET)
	public String login(){
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
	public String login(UserEntity user){
		session.setAttribute("cur_user", user);
		return "redirect:user/home";
	}
	
	/**
	 * 测试拦截器
	 * @param name
	 * @param password
	 * @return
	 */
	@RequestMapping("user/home")
	public String home(){
		return "user/index.jsp";
	}
}
