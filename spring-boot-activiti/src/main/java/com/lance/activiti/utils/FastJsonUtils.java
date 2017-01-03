package com.lance.activiti.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializeFilter;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class FastJsonUtils {

	 /**
     * 将实体类对象转换为json格式字符串.
     * 考虑到延迟加载的问题，这里对没有延迟加载的属性不做转换，直接跳过。
     * 对循环引用，这里采用fastjson缺省的方式，即一个对象只出现一次，避免死循环。
     * @param obj entity实体对象
     * @return JSON格式字符串
     */
    public synchronized static String entityToJson(Object obj) {
    	FastjsonFilter filter = new FastjsonFilter();
        return JSON.toJSONString(obj,
                filter,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteSlashAsSpecial);

    }

    /**
     * 完整的输出json对象，所有对象只要引用到了都将重复出现。为了避免死循环导致的栈溢
     * 出，需要将循环引用的属性作过滤。
     * @param obj 需要转换的对象
     * @param filterPropertyNames 需要过滤的属性名
     * @return JSON格式字符串
     */
    public synchronized static String entityToJsonFull(Object obj, String filterPropertyNames) {
    	FastjsonFilter filter = new FastjsonFilter(filterPropertyNames);
        return JSON.toJSONString(obj,
                filter,
                SerializerFeature.DisableCircularReferenceDetect,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteSlashAsSpecial);
    }

    /**
     * 将实体类对象转换为json格式字符串
     * 考虑到延迟加载的问题，这里对没有延迟加载的属性不做转换，直接跳过。
     * 对循环引用，这里采用fastjson缺省的方式，即一个对象只出现一次，避免死循环。
     * @param obj entity实体对象
     * @return JSON格式字符串
     */
    public synchronized static String entityToJsonSimple(Object obj) {
    	FastjsonFilter filter = new FastjsonFilter();
        return JSON.toJSONString(obj,
                filter,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteSlashAsSpecial);

    }

    /**
     * 完整的输出json对象，所有对象只要引用到了都将重复出现。为了避免死循环导致的栈溢
     * 出，需要将循环引用的属性作过滤
     * @return JSON格式字符串
     */
    public synchronized static String entityToJsonFullSimple(Object obj, String filterPropertyNames) {
    	FastjsonFilter filter = new FastjsonFilter(filterPropertyNames);
        return JSON.toJSONString(obj,
                filter,
                SerializerFeature.DisableCircularReferenceDetect,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteSlashAsSpecial);
    }
    
    public static String toJson(Object obj) {
        return toJson(obj, false, null);
    }
    
    public static String toJson(Object obj, String[] filterPropNames) {
        return toJson(obj, false, filterPropNames);
    }
    
    public static String toJson(Object obj,boolean isRefDetect, String[] filterPropNames) {
        SerializeFilter filter = new FastjsonFilter(filterPropNames);

        if (isRefDetect) {
            return JSON.toJSONString(obj,
                    filter,
                    SerializerFeature.WriteMapNullValue,
                    SerializerFeature.WriteNullStringAsEmpty,
                    SerializerFeature.WriteSlashAsSpecial);
        }else {
            return JSON.toJSONString(obj,
                    filter,
                    SerializerFeature.DisableCircularReferenceDetect,
                    SerializerFeature.QuoteFieldNames,
                    SerializerFeature.PrettyFormat,
                    SerializerFeature.WriteMapNullValue,
                    SerializerFeature.WriteNullStringAsEmpty,
                    SerializerFeature.WriteSlashAsSpecial);
        }
    }
}
