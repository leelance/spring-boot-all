package com.lance.activiti.web.process;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lance.activiti.common.exception.ServiceException;
import com.lance.activiti.common.page.PageInfo;
import com.lance.activiti.common.result.ResultInfo;
import com.lance.activiti.model.process.ProcessDefineInfo;
import com.lance.activiti.service.process.ProcessDefineService;
import com.lance.activiti.utils.FastJsonUtils;

/**
 * 流程管理
 * @author Administrator
 */
@Controller
@RequestMapping("/admin/process/manage/")
public class ProcessManageController {
	@Autowired
	private ProcessDefineService processDefineService;

	/**
	 * 跳转列表页面
	 * @return
	 */
	@RequestMapping(value="list", method=RequestMethod.GET)
	public String list(){
		return "admin/process/process-manage-list.jsp";
	}
	
	/**
	 * 查询列表Post
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="list", method=RequestMethod.POST)
	public String list(@RequestParam Map<String, Object> params){
		List<ProcessDefineInfo> list = processDefineService.findAll(params);
		String page = params.get("page")+"";
		
		PageInfo<ProcessDefineInfo> pageInfo = new PageInfo<>(list.size(), Integer.valueOf(page));
		pageInfo.setRows(list);
		return FastJsonUtils.toJson(pageInfo);
	}
	
	/**
	 * 保存方法
	 * @param info
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="save", method=RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String save(ProcessDefineInfo info){
		try {
			if(info.getId() == 0) {
				processDefineService.save(info);
			}else{
				processDefineService.update(info);
			}
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	/**
	 * 删除流程定义
	 * 2016年10月9日下午1:52:20
	 */
	@ResponseBody
	@RequestMapping(value="delete/{id}", produces = "application/json; charset=UTF-8")
	public String delete(@PathVariable int id){
		try {
			processDefineService.delete(id);
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	/**
	 * 流程发布
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="deploy/{id}", produces = "application/json; charset=UTF-8")
	public String deploy(@PathVariable int id) {
		try {
			processDefineService.deploy(id);
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	/**
	 * 关闭流程
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="closeDeploy/{id}", produces = "application/json; charset=UTF-8")
	public String closeDeploy(@PathVariable int id) {
		try {
			processDefineService.closeDeploy(id);
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	@RequestMapping(value="showDeployImg/{deploymentId}", produces = "application/json; charset=UTF-8")
	public void showDeployImg(@PathVariable String deploymentId, HttpServletResponse response) {
		InputStream is = null;
		try {
			ServletOutputStream output = response.getOutputStream();
			is = processDefineService.getProcessDefineIS(deploymentId);
			IOUtils.copy(is, output);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			IOUtils.closeQuietly(is);
		}
	}
}
