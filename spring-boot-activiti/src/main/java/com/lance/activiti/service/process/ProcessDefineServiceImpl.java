package com.lance.activiti.service.process;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lance.activiti.common.exception.ServiceException;
import com.lance.activiti.mapper.process.ProcessDefineMapper;
import com.lance.activiti.model.process.ProcessDefineInfo;

@Service
public class ProcessDefineServiceImpl implements ProcessDefineService{
	private final String BPMN_XML = ".bpmn20.xml";
	@Autowired
	private ProcessDefineMapper processDefineMapper;
	@Autowired
	private RepositoryService repositoryService;
	
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
		info.setProcessStatus(ProcessDefineInfo.UNDEPLOY);
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
		ProcessDefineInfo info = processDefineMapper.findOne(id);
		if(info.getProcessStatus() == ProcessDefineInfo.DEPLOY) {
			repositoryService.deleteDeployment(info.getDeploymentId(), true);
		}
		
		processDefineMapper.delete(id);
	}

	/**
	 * 流程发布
	 * @param id
	 */
	@Override
	public void deploy(int id) {
		ProcessDefineInfo info = processDefineMapper.findOne(id);
		Deployment deployment = repositoryService.createDeployment()
								.addClasspathResource("processes/"+info.getProcessFile())
								.name(info.getProcessKey())
								.deploy();
		info.setDeploymentId(deployment.getId());
		info.setProcessStatus(ProcessDefineInfo.DEPLOY);
		processDefineMapper.update(info);		
	}

	/**
	 * 关闭发布流程
	 * @param id
	 */
	@Transactional
	public void closeDeploy(int id) {
		ProcessDefineInfo info = processDefineMapper.findOne(id);
		if(info.getProcessStatus() == ProcessDefineInfo.UNDEPLOY) {
			throw new ServiceException("流程尚未发布, 无须关闭流程");
		}
		
		repositoryService.deleteDeployment(info.getDeploymentId(), true);
		info.setDeploymentId("0");
		info.setProcessStatus(ProcessDefineInfo.UNDEPLOY);
		processDefineMapper.update(info);	
	}
	
	/**
	 * 根据流程发布id获取流程图
	 * @param deploymentId
	 * @return
	 */
	public InputStream getProcessDefineIS(String deploymentId) {
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().deploymentId(deploymentId).singleResult();
		BpmnModel bpmnModel = repositoryService.getBpmnModel(processDefinition.getId());
		return new DefaultProcessDiagramGenerator().generatePngDiagram(bpmnModel);
	}
}
