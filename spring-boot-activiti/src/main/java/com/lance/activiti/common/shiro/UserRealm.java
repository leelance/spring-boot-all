package com.lance.activiti.common.shiro;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lance.activiti.common.SystemConstants;
import com.lance.activiti.model.system.UserInfo;
import com.lance.activiti.service.user.UserService;
import com.lance.activiti.utils.ShiroSessionUtils;

@Component
public class UserRealm extends AuthorizingRealm {
    private Logger logger = LogManager.getLogger(getClass());
    @Autowired
    private UserService userService;
    
    public UserRealm() {
        setName("userRealm");
        setCredentialsMatcher(new HashedCredentialsMatcher("md5"));
        setAuthenticationTokenClass(UsernamePasswordCaptchaToken.class);
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //String account = (String)principals.getPrimaryPrincipal();
        //UserInfo user = userService.findByAccount(account);
        //授予角色, 目前不处理资源Permission TODO
        info.addRole("admin");
        return info;
    }

    /**
     * 验证码登录信息
     * @author lance
     * @since 2016年11月5日下午11:48:56
     * @param authToken
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authToken) throws AuthenticationException {
        UsernamePasswordCaptchaToken token = (UsernamePasswordCaptchaToken)authToken;
        String validCode = ShiroSessionUtils.getValue(SystemConstants.ADMIN_VALID_KEY)+"";
        
        if (logger.isDebugEnabled()){
            logger.debug("Login===> username: {}, Captcha: {}", token.getUsername(), token.getCaptcha());
        }
        
        //验证码是否正确
        if(!StringUtils.equalsIgnoreCase(validCode, token.getCaptcha())) {
            throw new AuthenticationException("验证码错误, 请重试");
        }
        
        //验证码用户是否
        UserInfo user = userService.findByAccount(token.getUsername());
        if(user != null) {
            SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(user.getAccount(), user.getPassword().toCharArray(), getName());
            return authenticationInfo;
        }
        return null;
    }
}