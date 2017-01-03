package com.lance.activiti.utils;

import java.security.Principal;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.UnavailableSecurityManagerException;
import org.apache.shiro.session.InvalidSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.lance.activiti.common.SystemConstants;
import com.lance.activiti.model.system.UserInfo;

public final class ShiroSessionUtils {
	 /**
     * 获取授权主要对象
     * @author lance
     * @since 2016年11月5日下午10:10:59
     */
    public static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    /**
     * 获取当前登录者对象
     * @author lance
     * @since 2016年11月5日下午10:10:40
     */
    public static Principal getPrincipal() {
        try {
            Subject subject = SecurityUtils.getSubject();
            Principal principal = (Principal) subject.getPrincipal();
            if (principal != null) {
                return principal;
            }
        } catch (UnavailableSecurityManagerException e) {

        } catch (InvalidSessionException e) {

        }
        return null;
    }
    
    /**
     * 把对象丢个session管理
     * @author lance
     * @since 2016年11月5日下午11:45:25

     */
    public static void setValue(Object obj, String key) {
        getSession().setAttribute(key, obj);
    }
    
    /**
     * 设置后台登录用户
     * @author lance
     * @since 2016年11月21日下午6:27:02
     * @param user
     */
    public static void setAdminLogin(UserInfo user) {
        getSession().setAttribute(SystemConstants.ADMIN_LOGIN_KEY, user);
    }
    
    /**
     * 获取后台登录用户
     * @author lance
     * @since 2016年11月21日下午6:27:56
     */
    public static UserInfo getAdmin() {
        return (UserInfo)getSession().getAttribute(SystemConstants.ADMIN_LOGIN_KEY);
    }
    
    /**
     * 根据Key从session里面获取对象
     * @author lance
     * @since 2016年11月5日下午11:45:18
     * @param key
     */
    public static Object getValue(String key) {
        return getSession().getAttribute(key);
    }
    
    /**
     * 获取Session, 该session被Shiro封装
     * @author lance
     * @since 2016年11月5日下午10:08:35
     */
    public static Session getSession() {
        try {
            Subject subject = SecurityUtils.getSubject();
            Session session = subject.getSession(false);
            if (session == null) {
                session = subject.getSession();
            }
            if (session != null) {
                return session;
            }
        } catch (InvalidSessionException e) {

        }
        return null;
    }
}
