package com.lance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.entity.UserEntity;
import com.lance.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	
	/**
	 * 查询所有的User对象
	 * @return
	 */
	public List<UserEntity> findAll(){
		return userRepository.findAll();
	}
}
