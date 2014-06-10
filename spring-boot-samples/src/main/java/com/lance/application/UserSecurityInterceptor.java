package com.lance.application;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.lance.entity.UserEntity;

public class UserSecurityInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		System.out.println("------------UserSecurityInterceptor----------------");
		 //验证用户是否登陆
        Object obj = request.getSession().getAttribute("cur_user");
        if (obj == null || !(obj instanceof UserEntity)) {
            response.sendRedirect(request.getContextPath() + "/login");
            return false;
        }
        return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}
