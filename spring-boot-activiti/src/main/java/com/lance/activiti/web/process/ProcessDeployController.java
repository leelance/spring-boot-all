package com.lance.activiti.web.process;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/admin/process/deploy/")
public class ProcessDeployController {

	/**
	 * 跳转列表页面
	 * @return
	 */
	@RequestMapping(value="list", method=RequestMethod.GET)
	public String list(){
		return "admin/process/process-deploy-list.jsp";
	}
}
