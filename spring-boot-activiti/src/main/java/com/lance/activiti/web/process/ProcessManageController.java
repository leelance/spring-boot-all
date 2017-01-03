package com.lance.activiti.web.process;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lance.activiti.common.page.PageInfo;
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
		List<ProcessDefineInfo> list = processDefineService.findAll();
		String page = params.get("page")+"";
		
		PageInfo<ProcessDefineInfo> pageInfo = new PageInfo<>(list.size(), Integer.valueOf(page));
		pageInfo.setRows(list);
		return FastJsonUtils.toJson(pageInfo);
	}
}
