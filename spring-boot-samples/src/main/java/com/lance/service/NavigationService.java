package com.lance.service;

import java.util.List;

import com.lance.entity.NavigationEntity;

public interface NavigationService {
	/**
	 * 根据type查询菜单
	 * @param type
	 * @return
	 */
	List<NavigationEntity> findByType(int type);
}
