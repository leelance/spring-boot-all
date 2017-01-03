package com.lance.activiti.common.captcha;

import java.util.HashMap;
import java.util.Map;

/**
 * 验证码工厂
 * @author lance
 * @since 2016年11月7日下午9:27:40
 */
public class KaptchaFactory {
    private static Map<Integer, AbstractBaseKaptcha> map = new HashMap<>();

    static {
        map.put(KaptchaType.SIMPLE.value(), new SimpleKaptcha());
        map.put(KaptchaType.NUMERIC.value(), new NumericKaptcha());
        map.put(KaptchaType.ALPHABETIC.value(), new AlphabeticKaptcha());
    }
    
    private KaptchaFactory(){
        
    }
    
    private static class InstanceHolder {
        public static KaptchaFactory instance = new KaptchaFactory();
    }
    
    public static KaptchaFactory getInstance(){
        return InstanceHolder.instance;
    }
    
    public AbstractBaseKaptcha creator(Integer type) {
        return map.get(type);
    }
}
