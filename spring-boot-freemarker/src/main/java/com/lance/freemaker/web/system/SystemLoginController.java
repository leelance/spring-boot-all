package com.lance.freemaker.web.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.lance.freemaker.domain.UserInfo;
import com.lance.freemaker.service.UserService;
import com.lance.freemaker.utils.EncryptUtils;

@Controller
public class SystemLoginController {
	@Autowired
	private UserService userService;
	
	/**
	 * Login GetMethod
	 * @return
	 */
	@RequestMapping(value="system/login", method=RequestMethod.GET)
	public String login() {
		return "system/login.jsp";
	}
	
	/**
	 * Login PostMethod
	 * @return
	 */
	@RequestMapping(value="system/login", method=RequestMethod.POST)
	public String login(HttpServletRequest request, RedirectAttributes rediect) {
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		
		UserInfo info = userService.findByAccount(account);
		if(info == null) {
			rediect.addFlashAttribute("errorText", "该用户不存在");
			return "redirect:/system/login";
		}
		
		if(!StringUtils.equals(EncryptUtils.encryptMD5(password), info.getPassword())) {
			rediect.addFlashAttribute("errorText", "密码错误");
			return "redirect:/system/login";
		}
		
		request.getSession().setAttribute("sys_user_key", info);
		return "redirect:/system/admin/index";
	}
	
	/**
	 * Exit
	 * @return
	 */
	@RequestMapping("system/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/system/login";
	}
}