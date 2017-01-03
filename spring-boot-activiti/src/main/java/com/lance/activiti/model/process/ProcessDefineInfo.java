package com.lance.activiti.model.process;

import java.io.Serializable;
import java.util.Date;

/**
 * 定义流程
 * @author Administrator
 */
public class ProcessDefineInfo implements Serializable{
	private static final long serialVersionUID = -6159834621213504983L;

	/**ID*/
	private int id;
	
	/**流程名称*/
	private String processName;
	
	/**流程Key*/
	private String processKey;
	
	/**流程File, leave.bpmn20.xml*/
	private String processFile;
	
	/**创建时间*/
	private Date createTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getProcessKey() {
		return processKey;
	}

	public void setProcessKey(String processKey) {
		this.processKey = processKey;
	}

	public String getProcessFile() {
		return processFile;
	}

	public void setProcessFile(String processFile) {
		this.processFile = processFile;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
