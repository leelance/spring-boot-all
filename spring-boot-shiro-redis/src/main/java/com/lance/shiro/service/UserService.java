package com.lance.shiro.service;

import java.util.List;
import java.util.Set;

import com.lance.shiro.domain.UserInfo;

public interface UserService {
	
	/**
	 * 根据账号Account查询当前用户
	 * @param account
	 * @return
	 */
	UserInfo findByAccount(String account);
	
	/**	
	 * 获取资源集合
	 * @param account
	 * @return
	 */
	Set<String> findPermissions(String account);
	
	/**
	 * 获取URL权限
	 * @param account
	 * @return
	 */
	List<String> findPermissionUrl(String account);
}
