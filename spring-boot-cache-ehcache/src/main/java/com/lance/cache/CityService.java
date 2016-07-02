package com.lance.cache;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
@CacheConfig(cacheNames="CityService")
public class CityService {
	Logger logger = LogManager.getLogger(getClass());

	@Cacheable
	public CityInfo getCity(int id, String city) {
		logger.info("id: {}, city: {}", id, city);
		return new CityInfo(id, city);
	}
}
