package com.lance.activiti.model.process;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

import lombok.Data;

/**
 * 定义流程
 * @author Administrator
 */
@Data
public class ProcessDefineInfo implements Serializable{
	private static final long serialVersionUID = -6159834621213504983L;
	/**发布成功*/
	public static final int DEPLOY = 2;
	/**未发布*/
	public static final int UNDEPLOY = 1;
	
	/**ID*/
	private int id;
	
	/**流程名称*/
	private String processName;
	
	/**流程Key*/
	private String processKey;
	
	/**流程File, leave.bpmn20.xml*/
	private String processFile;
	
	/**流程状态*/
	private int processStatus;
	
	/**发布流程ID*/
	private String deploymentId;
	
	/**创建时间*/
	@JSONField(format="yyyy-MM-dd HH:mm:ss")
	private Date createTime;
}