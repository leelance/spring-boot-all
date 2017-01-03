package com.lance.activiti.model.system;

import java.io.Serializable;
import java.util.Date;

public class UserInfo implements Serializable{
	private static final long serialVersionUID = 3218476189702605388L;
	/**主键ID*/
	private int id;
	/**登录账号*/
	private String account;
	/**密码*/
	private String password;
	/**姓名*/
	private String name;
	/**手机号码*/
	private String phone;
	/**Email*/
	private String email;
	/**创建时间*/
	private Date createTime;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}