package com.lance.activiti.common.shiro;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.lance.activiti.model.system.UserInfo;
import com.lance.activiti.service.user.UserService;
import com.lance.activiti.utils.ShiroSessionUtils;

public class FormAuthenticationFilterExt extends FormAuthenticationFilter {
    @Autowired
    private UserService userService;
    /**adminValidCode*/
    public static final String DEFAULT_CAPTCHA_PARAM = "captcha";
    /**LoginMessage*/
    public static final String DEFAULT_MESSAGE_PARAM = "message";
    
    private String captchaParam = DEFAULT_CAPTCHA_PARAM;
    private String messageParam = DEFAULT_MESSAGE_PARAM;
    
    
    @Override
    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
        String username = getUsername(request);
        String password = getPassword(request);
        if (password==null){
            password = "";
        }
        boolean rememberMe = isRememberMe(request);
        String host = "";
        String captcha = getCaptcha(request);
        return new UsernamePasswordCaptchaToken(username, password.toCharArray(), rememberMe, host, captcha);
    }
    
    @Override
    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
        String className = e.getClass().getName(), message = "";
        if (IncorrectCredentialsException.class.getName().equals(className) 
                        || UnknownAccountException.class.getName().equals(className)){
            message = "用户或密码错误, 请重试.";
        }else {
            message = e.getMessage();
        }
        request.setAttribute(getFailureKeyAttribute(), className);
        request.setAttribute(getMessageParam(), message);
        return true;
    }

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        UserInfo user = userService.findByAccount(getUsername(request));
        ShiroSessionUtils.setAdminLogin(user);
        return super.onLoginSuccess(token, subject, request, response);
    }

    protected String getCaptcha(ServletRequest request) {
        return WebUtils.getCleanParam(request, getCaptchaParam());
    }

    public String getCaptchaParam() {
        return captchaParam;
    }

    public String getMessageParam() {
        return messageParam;
    }

    public void setCaptchaParam(String captchaParam) {
        this.captchaParam = captchaParam;
    }

    public void setMessageParam(String messageParam) {
        this.messageParam = messageParam;
    }
}
