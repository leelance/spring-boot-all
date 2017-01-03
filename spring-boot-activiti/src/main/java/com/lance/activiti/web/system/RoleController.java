package com.lance.activiti.web.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 角色管理
 * @author Administrator
 */
@Controller
@RequestMapping("admin/system/role")
public class RoleController {

	/**
	 * 角色首页
	 * @return
	 */
	@RequestMapping(value={"","/","index"}, method=RequestMethod.GET)
	public String index() {
		return "admin/system/index.jsp";
	}
}
