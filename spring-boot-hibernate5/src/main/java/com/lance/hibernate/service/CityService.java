package com.lance.hibernate.service;

import java.util.List;

import com.lance.hibernate.entity.CityEntity;

public interface CityService {

	/**
	 * findAll
	 * @return
	 */
	List<CityEntity> findAll();
	
	/**
	 * Save
	 * @param city
	 */
	void save(CityEntity city);
	
	void delete(long id);
	
	void delete(CityEntity city);
}
