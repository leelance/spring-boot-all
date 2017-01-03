package com.lance.activiti.common.captcha;

import java.util.Properties;

public class AlphabeticKaptcha extends AbstractBaseKaptcha {

    @Override
    public Properties getProperties() {
        Properties props = new Properties();
        props.put("kaptcha.border", "no");
        props.put("kaptcha.textproducer.font.color", "black");
        props.put("kaptcha.textproducer.char.space", "5");
        props.put("kaptcha.textproducer.char.length", "4");
        props.put("kaptcha.textproducer.char.string", "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ");
        return props;
    }

}
