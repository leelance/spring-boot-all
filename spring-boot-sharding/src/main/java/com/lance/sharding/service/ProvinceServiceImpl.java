package com.lance.sharding.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.sharding.mapper.ProvinceMapper;

/**
* 
* @author Lance
* @since 2019-03-01 23:05:40
*/
@Service
public class ProvinceServiceImpl implements ProvinceService{
	@Autowired
	private ProvinceMapper provinceMapper;

}