package com.lance.querydsl.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.lance.querydsl.entity.CityEntity;
import com.lance.querydsl.entity.QCityEntity;
import com.lance.querydsl.repository.CityRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;

@Service
public class CityServiceImpl implements CityService {
	@PersistenceContext
    private EntityManager em;
	@Autowired
	private CityRepository cityRepository;

	/**
	 * findAll
	 * @return
	 */
	public List<CityEntity> findAll(String hotelName) {
		QCityEntity cityEntity = QCityEntity.cityEntity;
		JPAQuery<CityEntity>query = new JPAQuery<>(em);
		BooleanExpression express = cityEntity.state.eq("1");
		
		if(StringUtils.hasText(hotelName)) {
			express = express.and(cityEntity.hotels.any().name.likeIgnoreCase('%'+hotelName+'%'));
		}
		return query.select(cityEntity).from(cityEntity).where(express).fetch();
	}

	/**
	 * Save
	 * @param city
	 */
	@Transactional	
	public void save(CityEntity city) {
		cityRepository.save(city);
	}

	@Transactional
	public void delete(long id) {
		cityRepository.delete(id);
	}

	@Transactional
	public void delete(CityEntity city) {
		cityRepository.delete(city);
	}
}
