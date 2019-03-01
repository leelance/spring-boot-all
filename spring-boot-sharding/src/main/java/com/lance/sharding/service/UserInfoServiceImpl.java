package com.lance.sharding.service;

import com.lance.sharding.mapper.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
* 
* @author Lance
* @since 2019-03-01 23:05:40
*/
@Service
public class UserInfoServiceImpl implements UserInfoService {
	@Autowired
	private UserInfoMapper userInfo0Mapper;

}