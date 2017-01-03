package com.lance.activiti.service.process;

import java.util.List;
import java.util.Map;

import com.lance.activiti.model.process.ProcessDefineInfo;

public interface ProcessDefineService {

	/**
	 * 查询所有定义的流程
	 * @return
	 */
	List<ProcessDefineInfo>findAll(Map<String, Object> params);
	
	/**
	 * 保存方法
	 * @param info
	 */
	void save(ProcessDefineInfo info);
	
	/**
	 * 更新方法
	 * @param info
	 */
	void update(ProcessDefineInfo info);
	
	/**
	 * 删除流程定义
	 * @param id
	 */
	void delete(int id);
}
