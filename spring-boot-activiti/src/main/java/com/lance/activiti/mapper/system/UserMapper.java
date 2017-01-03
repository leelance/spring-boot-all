package com.lance.activiti.mapper.system;

import java.util.List;

import com.lance.activiti.model.system.UserInfo;

public interface UserMapper {

	/**
	 * 查询所有用户信息
	 * @return
	 */
	List<UserInfo> findAll();
	
	/**
	 * 根据登录账号查询用户信息
	 * @param account
	 * @return
	 */
	UserInfo findByAccount(String account);
	
	/**
	 * 根据ID查询用户信息
	 * @param id
	 * @return
	 */
	UserInfo findOne(int id);
	
	/**
	 * 保存用户信息
	 * @param user
	 */
	void save(UserInfo user);
	
	/**
	 * 更新用户对象
	 * @param user
	 */
	int update(UserInfo user);
	
	/**
	 * 删除对象
	 * @param id
	 */
	int delete(int id);
}
