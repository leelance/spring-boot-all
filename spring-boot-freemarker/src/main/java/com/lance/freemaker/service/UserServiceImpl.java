package com.lance.freemaker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.freemaker.domain.UserInfo;
import com.lance.freemaker.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	/**
	 * 根据账号Account查询当前用户
	 * @param account
	 * @return
	 */
	public UserInfo findByAccount(String account) {
		return userMapper.findByAccount(account);
	}	
}