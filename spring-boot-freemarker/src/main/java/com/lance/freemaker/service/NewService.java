package com.lance.freemaker.service;

import java.util.List;

import com.lance.freemaker.domain.NewsInfo;

public interface NewService {
	
	/**
	 * findAll
	 * @param pageNo
	 */
	List<NewsInfo> findAll(int pageNo);
	
	/**
	 * findCount
	 */
	int findCount();
	
	/**
	 * 查询一条记录
	 * @param id
	 * @return
	 */
	NewsInfo findOne(int id);
	
	/**
	 * save
	 * @param info
	 */
	void save(NewsInfo info);
}
