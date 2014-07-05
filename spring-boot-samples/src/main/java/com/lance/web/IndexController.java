package com.lance.web;


import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.lance.entity.UserEntity;
import com.lance.service.LoginService;
import com.lance.utils.CurrentUserUtils;
import com.lance.utils.ServiceException;

/**
 * 
 * @author lance
 * 2014-6-8下午6:47:18
 */
@Controller
public class IndexController {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private HttpSession session;
	@Autowired
	private LoginService loginService;
	
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
	public String login(UserEntity user, RedirectAttributes redirect){
		try {
			user = loginService.login(user);
		} catch (ServiceException e) {
			logger.debug(e.getMessage());
			redirect.addFlashAttribute("err_code", e.getMessage());
			redirect.addFlashAttribute("user", user);
			return "redirect:/login";
		}
		
		CurrentUserUtils.getInstance().serUser(user);
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
		return "user/home.jsp";
	}
}
