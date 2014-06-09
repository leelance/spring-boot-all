package com.lance.entity;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity {	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	protected long id;
	//0:无效 1:有效
	protected int status;
	//创建信息
	protected String createById;
	protected Date createDate;
	protected String updateById;
	protected Date updateDate;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCreateById() {
		return createById;
	}
	public void setCreateById(String createById) {
		this.createById = createById;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getUpdateById() {
		return updateById;
	}
	public void setUpdateById(String updateById) {
		this.updateById = updateById;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}	
}
