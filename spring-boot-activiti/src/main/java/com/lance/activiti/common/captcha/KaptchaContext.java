package com.lance.activiti.common.captcha;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class KaptchaContext {
    
    public void generate(Integer type, HttpServletRequest req, HttpServletResponse res, String key) {
        AbstractBaseKaptcha kaptcha = KaptchaFactory.getInstance().creator(type);
        try {
            kaptcha.captcha(req, res, key);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
