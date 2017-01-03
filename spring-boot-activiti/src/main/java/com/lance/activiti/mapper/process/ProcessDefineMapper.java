package com.lance.activiti.mapper.process;

import java.util.List;
import java.util.Map;

import com.lance.activiti.model.process.ProcessDefineInfo;

public interface ProcessDefineMapper {
	/**
	 * 查询所有流程
	 * @return
	 */
	List<ProcessDefineInfo> findAll(Map<String, Object> params);
	
	/**
	* 保存对象
	* @author Lance
	* @since 2016-08-26 16:31:12
	*/
	int save(ProcessDefineInfo info);

	/**
	* 修改对象
	* @author Lance
	* @since 2016-08-26 16:31:12
	*/
	int update(ProcessDefineInfo info);

	/**
	* 删除对象
	* @author Lance
	* @since 2016-08-26 16:31:12
	*/
	int delete(int id);

	/**
	* 根据ID查询对象
	* @author Lance
	* @since 2016-08-26 16:31:12
	*/
	ProcessDefineInfo findOne(int id);
}
