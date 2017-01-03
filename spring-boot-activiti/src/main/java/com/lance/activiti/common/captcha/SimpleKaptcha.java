package com.lance.activiti.common.captcha;

import java.util.Properties;

public class SimpleKaptcha extends AbstractBaseKaptcha {

    /**
     * 创建验证码属性配置
     * @author lance
     * @since 2016年11月5日下午11:00:55
     * @see com.google.code.kaptcha.Constants
     * @return
     */
    @Override
    public Properties getProperties() {
        Properties props = new Properties();
        props.put("kaptcha.border", "no");
        props.put("kaptcha.textproducer.font.color", "black");
        props.put("kaptcha.textproducer.char.space", "5");
        props.put("kaptcha.textproducer.char.length", "4");
        props.put("kaptcha.textproducer.char.string", "03456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ");
        return props;
    }
}
