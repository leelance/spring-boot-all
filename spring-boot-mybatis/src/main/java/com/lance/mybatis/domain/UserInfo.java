package com.lance.mybatis.domain;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class UserInfo implements Serializable {
	private static final long serialVersionUID = 6519997700281088880L;
	
	private int id;
	
	private String name;
	
	private String tel;
	
	@JSONField(format="yyyy-MM-dd")
	private Date createTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}