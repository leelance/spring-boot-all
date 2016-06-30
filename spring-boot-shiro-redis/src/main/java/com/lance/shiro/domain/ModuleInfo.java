package com.lance.shiro.domain;

import java.io.Serializable;
import java.util.Date;

public class ModuleInfo implements Serializable{
	private static final long serialVersionUID = -4297656027873404254L;
	/**路径*/
	public static final int URL_TYPE=1;
	/**功能点*/
	public static final int FUNCTION_TYPE=2;

	private int id;
	private String moduleName;
	private String modulePath;
	private int moduleType;
	private String moduleKey;
	private Date createTime;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getModulePath() {
		return modulePath;
	}
	public void setModulePath(String modulePath) {
		this.modulePath = modulePath;
	}
	public int getModuleType() {
		return moduleType;
	}
	public void setModuleType(int moduleType) {
		this.moduleType = moduleType;
	}
	public String getModuleKey() {
		return moduleKey;
	}
	public void setModuleKey(String moduleKey) {
		this.moduleKey = moduleKey;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}