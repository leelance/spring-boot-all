package com.lance.activiti.common.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * 后台用户登录
 * @author lance
 * @since 2016年11月5日下午2:24:32
 */
public class UsernamePasswordCaptchaToken extends UsernamePasswordToken {
    private static final long serialVersionUID = -2516621696792507680L;
    
    /**验证码*/
    private String captcha;
    
    public UsernamePasswordCaptchaToken() {
        super();
    }

    public UsernamePasswordCaptchaToken(String username, char[] password,
            boolean rememberMe, String host, String captcha) {
        super(username, password, rememberMe, host);
        this.captcha = captcha;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }
}