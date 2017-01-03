package com.lance.activiti.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.lance.activiti.common.SystemConstants;
import com.lance.activiti.common.captcha.KaptchaContext;
import com.lance.activiti.common.captcha.KaptchaType;
import com.lance.activiti.common.shiro.FormAuthenticationFilterExt;
import com.lance.activiti.utils.ShiroSessionUtils;

@Controller
public class LoginController {
	private Logger logger = LogManager.getLogger(getClass());

	/**
	 * Login
	 * @return
	 */
	@RequestMapping(value="login", method=RequestMethod.GET)
	public String login(){
		return "login.jsp";
	}
	
	 /**
     * 登录失败，真正登录的POST请求由Filter完成
     * @author lance
     * @since 2016年11月5日下午3:59:17
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String loginFail(HttpServletRequest request, HttpServletResponse response, RedirectAttributes redirect) {
        Object principal = ShiroSessionUtils.getSubject().getPrincipal();
        
        // 如果已经登录，则跳转到管理首页
        if(principal != null){
            return "redirect:/admin/welcome";
        }

        String username = WebUtils.getCleanParam(request, FormAuthenticationFilterExt.DEFAULT_USERNAME_PARAM);
        String message = (String)request.getAttribute(FormAuthenticationFilterExt.DEFAULT_MESSAGE_PARAM);
        
        if (StringUtils.isBlank(message) || StringUtils.equals(message, "null")){
            message = "用户或密码错误, 请重试.";
        }

        redirect.addFlashAttribute(FormAuthenticationFilterExt.DEFAULT_USERNAME_PARAM, username);
        redirect.addFlashAttribute(FormAuthenticationFilterExt.DEFAULT_MESSAGE_PARAM, message);
        
        if (logger.isDebugEnabled()){
            logger.debug("login fail, message: {}", message);
        }
        
        return "redirect:/login";
    }
    
    /**
     * 登录验证码
     * @param req
     * @param res
     * @throws ServletException
     * @throws IOException
     */
    @RequestMapping(value = "kaptcha/backloginCapt", method = RequestMethod.GET)
    public void backloginCapt(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        new KaptchaContext().generate(KaptchaType.SIMPLE.value(), req, res, SystemConstants.ADMIN_VALID_KEY);
    }
    
    /**
     * 后台管理首页
     * @author lance
     * @since 2016年11月25日下午2:49:04
     */
    @RequestMapping("admin/index")
    public String index() {
        return "admin/index.jsp"; 
    }
    
    @RequestMapping("admin/welcome")
    public String welcome() {
        return "admin/welcome.jsp"; 
    }
    
    /**
     * 用户退出登录
     * @author lance
     * @since 2016年11月25日下午2:43:47
     */
    @RequestMapping("admin/logout")
    public String logout() {
    	ShiroSessionUtils.getSubject().logout();
        return "redirect:/back/login"; 
    }
}
