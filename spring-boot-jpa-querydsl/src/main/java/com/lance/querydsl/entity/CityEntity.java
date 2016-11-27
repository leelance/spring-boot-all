package com.lance.querydsl.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="t_city")
public class CityEntity implements Serializable {
	private static final long serialVersionUID = -2451005683000059023L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String name;

	private String state;

	private String country;

	private String map;
	
	@OneToMany(mappedBy="city", cascade=CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval=true)
	private Set<HotelEntity>hotels = new HashSet<>();

	public CityEntity() {
	}

	public CityEntity(String name, String country) {
		super();
		this.name = name;
		this.country = country;
	}

	public String getName() {
		return this.name;
	}

	public String getState() {
		return this.state;
	}

	public String getCountry() {
		return this.country;
	}

	public String getMap() {
		return this.map;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setMap(String map) {
		this.map = map;
	}

	public Set<HotelEntity> getHotels() {
		return hotels;
	}

	public void setHotels(Set<HotelEntity> hotels) {
		this.hotels = hotels;
	}

	@Override
	public String toString() {
		return getName() + "," + getState() + "," + getCountry();
	}
}