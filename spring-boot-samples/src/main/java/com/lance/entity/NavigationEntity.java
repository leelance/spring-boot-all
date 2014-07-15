package com.lance.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="navigation")
public class NavigationEntity extends BaseEntity {
	/** 首页左边导航栏配置数据 */
	public static final int TYPE_HOME_LEFT = 0;
	
	private String name;
	private String path;
	private int type;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
}
