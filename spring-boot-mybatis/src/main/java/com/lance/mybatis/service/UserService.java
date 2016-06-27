package com.lance.mybatis.service;

import java.util.List;

import com.lance.mybatis.domain.UserInfo;

public interface UserService {

	/**
	 * findAll
	 * @return
	 */
	List<UserInfo> findAll();
	
	UserInfo findOne(int id);
}
