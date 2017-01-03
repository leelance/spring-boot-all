package com.lance.activiti.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.activiti.mapper.system.UserMapper;
import com.lance.activiti.model.system.UserInfo;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	/**
	 * 查询所有用户信息
	 * @return
	 */
	public List<UserInfo> findAll() {
		return userMapper.findAll();
	}

	/**
	 * 根据登录账号查询用户信息
	 * @param account
	 * @return
	 */
	public UserInfo findByAccount(String account) {
		return userMapper.findByAccount(account);
	}

	/**
	 * 根据ID查询用户信息
	 * @param id
	 * @return
	 */
	public UserInfo findOne(int id) {
		return userMapper.findOne(id);
	}

	/**
	 * 保存用户信息
	 * @param user
	 */
	public void save(UserInfo user) {
		userMapper.save(user);
	}

	/**
	 * 更新用户对象
	 * @param user
	 */
	public int update(UserInfo user) {
		return userMapper.update(user);
	}

	/**
	 * 删除对象
	 * @param id
	 */
	public int delete(int id) {
		return userMapper.delete(id);
	}
}