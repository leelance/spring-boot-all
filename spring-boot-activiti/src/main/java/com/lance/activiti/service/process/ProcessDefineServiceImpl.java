package com.lance.activiti.service.process;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.activiti.mapper.process.ProcessDefineMapper;
import com.lance.activiti.model.process.ProcessDefineInfo;

@Service
public class ProcessDefineServiceImpl implements ProcessDefineService{
	@Autowired
	private ProcessDefineMapper processDefineMapper;
	
	/**
	 * 查询所有定义的流程
	 * @return
	 */
	@Override
	public List<ProcessDefineInfo> findAll() {
		return processDefineMapper.findAll();
	}
}
