package com.lance.cache.redis;

import java.io.Serializable;

public class CityInfo implements Serializable{
	private static final long serialVersionUID = 2845294956907027149L;
	
	private int id;
	private String city;
	
	public CityInfo() {
		
	}
	
	public CityInfo(int id, String city) {
		this.id = id;
		this.city = city;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
}
