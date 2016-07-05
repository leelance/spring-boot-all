package com.lance.freemaker.web.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SystemIndexController {

	@RequestMapping("system/admin/index")
	public String index() {
		return "system/index.jsp";
	}
}
