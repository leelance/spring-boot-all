package com.lance.activiti.service.process;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lance.activiti.common.exception.ServiceException;
import com.lance.activiti.mapper.process.ProcessDefineMapper;
import com.lance.activiti.model.process.ProcessDefineInfo;

@Service
public class ProcessDefineServiceImpl implements ProcessDefineService{
	private final String BPMN_XML = ".bpmn20.xml";
	@Autowired
	private ProcessDefineMapper processDefineMapper;
	
	/**
	 * 查询所有定义的流程
	 * @return
	 */
	@Override
	public List<ProcessDefineInfo> findAll(Map<String, Object> params) {
		return processDefineMapper.findAll(params);
	}

	/**
	 * 保存方法
	 * @param info
	 */
	@Override
	public void save(ProcessDefineInfo info) {
		if(StringUtils.isAnyBlank(info.getProcessName(), info.getProcessFile())) {
			throw new ServiceException("流程文件名称或流程文件不能为空");
		}
		
		if(!StringUtils.endsWith(info.getProcessFile(), BPMN_XML)) {
			throw new ServiceException("流程文件格式错误,以.bpmn20.xml结尾");
		}
		
		String processKey = StringUtils.substringBefore(info.getProcessFile(), BPMN_XML);
		info.setProcessKey(processKey);
		processDefineMapper.save(info);
	}

	/**
	 * 更新方法
	 * @param info
	 */
	@Override
	public void update(ProcessDefineInfo info) {
		String processKey = StringUtils.substringBefore(info.getProcessFile(), BPMN_XML);
		info.setProcessKey(processKey);
		processDefineMapper.update(info);
	}

	/**
	 * 删除流程定义
	 * @param id
	 */
	@Override
	public void delete(int id) {
		processDefineMapper.delete(id);
	}
}
