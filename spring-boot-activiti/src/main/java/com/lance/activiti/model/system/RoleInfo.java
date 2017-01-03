package com.lance.activiti.model.system;

import java.io.Serializable;
import java.util.Date;

public class RoleInfo implements Serializable{
	private static final long serialVersionUID = -7980149051661283417L;

	/**ID*/
	private int id;
	
	/**角色名称*/
	private String roleName;
	
	/**描述*/
	private String description;
	
	/*创建时间*/
	private Date createTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}