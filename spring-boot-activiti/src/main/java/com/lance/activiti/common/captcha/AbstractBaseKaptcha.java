package com.lance.activiti.common.captcha;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.code.kaptcha.Producer;
import com.google.code.kaptcha.util.Config;

/**
 * 基本验证码
 * @author lance
 * @since 2016年11月5日下午11:01:25
 */
public abstract class AbstractBaseKaptcha {
    private Producer kaptchaProducer = null;
    private String sessionKeyDateValue = null;
    
    /**
     * 创建验证码属性配置
     * @author lance
     * @since 2016年11月5日下午11:00:55
     * @see com.google.code.kaptcha.Constants
     * @return
     */
    public abstract Properties getProperties();

    /**
     * 初始化对象
     * @author lance
     * @since 2016年11月5日下午11:41:31
     */
    private void init() {
        ImageIO.setUseCache(false);
        Config config = new Config(getProperties());
        this.kaptchaProducer = config.getProducerImpl();
        this.sessionKeyDateValue = config.getSessionDate();
    }

    /**
     * map it to the /url/captcha.jpg
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    public void captcha(HttpServletRequest req, HttpServletResponse resp, String key) throws ServletException, IOException {
        init();
        // Set standard HTTP/1.1 no-cache headers.
        resp.setHeader("Cache-Control", "no-store, no-cache");

        // return a jpeg
        resp.setContentType("image/jpeg");

        // create the text for the image
        String capText = this.kaptchaProducer.createText();

        // store the date in the session so that it can be compared
        // against to make sure someone hasn't taken too long to enter
        // their kaptcha
        req.getSession().setAttribute(this.sessionKeyDateValue, new Date());

        // create the image with the text
        BufferedImage bi = this.kaptchaProducer.createImage(capText);

        ServletOutputStream out = resp.getOutputStream();
        
        // write the data out
        ImageIO.write(bi, "jpg", out);

        // fixes issue #69: set the attributes after we write the image in case
        // the image writing fails.

        // store the text in the session
        req.getSession().setAttribute(key, capText);
    }
}
