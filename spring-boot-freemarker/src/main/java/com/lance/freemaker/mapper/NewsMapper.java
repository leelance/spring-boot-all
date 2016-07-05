package com.lance.freemaker.mapper;

import java.util.List;

import com.lance.freemaker.domain.NewsInfo;

public interface NewsMapper {

	/**
	 * findAll
	 * @param pageNo
	 */
	List<NewsInfo> findAll(int pageNo);
	
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
	
	/**
	 * findCount
	 */
	int findCount();
}
