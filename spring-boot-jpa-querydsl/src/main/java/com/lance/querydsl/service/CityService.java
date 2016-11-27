package com.lance.querydsl.service;

import java.util.List;

import com.lance.querydsl.entity.CityEntity;

public interface CityService {

	/**
	 * findAll
	 * @return
	 */
	List<CityEntity> findAll(String hotelName);
	
	/**
	 * Save
	 * @param city
	 */
	void save(CityEntity city);
	
	void delete(long id);
	
	void delete(CityEntity city);
}
