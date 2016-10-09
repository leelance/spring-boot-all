package com.lance.web.system.setting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lance.common.exception.ServiceException;
import com.lance.common.json.ResultInfo;
import com.lance.domain.setting.TaskInfo;
import com.lance.service.setting.TaskServiceImpl;
import com.lance.utils.FastJsonUtils;

/**
 * 任务管理
 * @author lance
 */
@Controller
@RequestMapping("admin/task/")
public class TaskManageController {
	@Autowired
	private TaskServiceImpl taskServiceImpl;

	/**
	 * 任务页面
	 * 2016年10月8日下午6:39:15
	 */
	@RequestMapping(value="info")
	public String info(){
		return "admin/setting/task-info.jsp";
	}
	
	/**
	 * 任务列表
	 * @return
	 * 2016年10月9日上午11:36:03
	 */
	@ResponseBody
	@RequestMapping(value="list", method=RequestMethod.POST)
	public String list(){
		Map<String, Object> map = new HashMap<>();
		List<TaskInfo> infos = taskServiceImpl.list();
		map.put("rows", infos);
		map.put("total", infos.size());
		return FastJsonUtils.toJson(map);
	}
	
	/**
	 * 保存定时任务
	 * @param info
	 * 2016年10月9日下午1:36:59
	 */
	@ResponseBody
	@RequestMapping(value="save", method=RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String save(TaskInfo info){
		try {
			if(info.getId() == 0) {
				taskServiceImpl.addJob(info);
			}else{
				taskServiceImpl.edit(info);
			}
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	/**
	 * 删除定时任务
	 * @param jobName
	 * @param jobGroup
	 * 2016年10月9日下午1:52:20
	 */
	@ResponseBody
	@RequestMapping(value="delete/{jobName}/{jobGroup}", produces = "application/json; charset=UTF-8")
	public String delete(@PathVariable String jobName, @PathVariable String jobGroup){
		try {
			taskServiceImpl.delete(jobName, jobGroup);
		} catch (ServiceException e) {
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
}
