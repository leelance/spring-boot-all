package com.lance.activiti.mapper.system;

import java.util.List;

import com.lance.activiti.model.system.RoleInfo;

public interface RoleMapper {
	/**
	 * 查询所有角色
	 * @return
	 */
	List<RoleInfo> findAll();
	
	/**
	 * 根据ID查询角色
	 * @param id
	 * @return
	 */
	RoleInfo findOne(int id);
	
	/**
	 * 保存角色
	 * @param user
	 */
	void save(RoleInfo user);
	
	/**
	 * 更新角色
	 * @param user
	 */
	int update(RoleInfo user);
	
	/**
	 * 删除角色
	 * @param id
	 */
	int delete(int id);
}
