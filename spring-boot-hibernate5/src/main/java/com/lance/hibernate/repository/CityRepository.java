package com.lance.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lance.hibernate.entity.CityEntity;

public interface CityRepository extends JpaRepository<CityEntity, Long>{

}
