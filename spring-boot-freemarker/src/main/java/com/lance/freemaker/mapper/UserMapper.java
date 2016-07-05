package com.lance.freemaker.mapper;

import org.apache.ibatis.annotations.Select;

import com.lance.freemaker.domain.UserInfo;

public interface UserMapper {

	@Select("select *from t_user where account=#{account}")
	UserInfo findByAccount(String account);
}
