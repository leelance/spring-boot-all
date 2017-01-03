package com.lance.activiti.common.captcha;

/**
 * 验证码类型
 * @author lance
 * @since 2016年11月7日下午9:20:22
 */
public enum KaptchaType {
    SIMPLE(1,       "验证码基本类型"),
    NUMERIC(2,      "验证码数字类型"),
    ALPHABETIC(3,   "验证码字母类型");
    
    private Integer value;
    private String desc;
    
    KaptchaType(Integer value, String desc){
        this.value = value;
        this.desc = desc;
    }
    
    public static KaptchaType valueOf(Integer value) {
        for (KaptchaType type : KaptchaType.values()) {
            if (type.value().intValue() == value.intValue()) {
                return type;
            }
        }
        return null;
    }

    public Integer value() {
        return value;
    }

    public String desc() {
        return desc;
    }
}