package com.lance.entity;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class UserEntity extends BaseEntity {
	//用户名
	private String userName;
	
	//性别 0: 女 1: 男 2:其他
	private int sex;
	
	//电话
	private String tel;
	
	//密码
	private String password;
	
	//地址信息
	@OneToMany(mappedBy="user")
	private List<AddressEntity> addresses = new LinkedList<AddressEntity>();

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<AddressEntity> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<AddressEntity> addresses) {
		this.addresses = addresses;
	}	
}
