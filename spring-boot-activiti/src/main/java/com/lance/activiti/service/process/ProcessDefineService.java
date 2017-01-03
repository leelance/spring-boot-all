package com.lance.activiti.service.process;

import java.util.List;

import com.lance.activiti.model.process.ProcessDefineInfo;

public interface ProcessDefineService {

	/**
	 * 查询所有定义的流程
	 * @return
	 */
	List<ProcessDefineInfo>findAll();
}
