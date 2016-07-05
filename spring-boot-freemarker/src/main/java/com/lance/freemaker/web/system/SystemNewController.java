package com.lance.freemaker.web.system;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lance.freemaker.domain.NewsInfo;
import com.lance.freemaker.domain.PageInfo;
import com.lance.freemaker.service.NewService;

@Controller
@RequestMapping("system/admin/news/")
public class SystemNewController {
	@Autowired
	private NewService newService;

	/**
	 * List Table
	 * @param request
	 * @return
	 */
	@RequestMapping("list")
	public String list(HttpServletRequest request) {
		String page = request.getParameter("page");
		page = StringUtils.defaultIfBlank(page, "1");
		int pageNumber = Integer.valueOf(page);
		
		int total = newService.findCount();
		PageInfo<NewsInfo> pageInfo = new PageInfo<>(total, pageNumber);
		pageInfo.setList(newService.findAll(pageInfo.getPageStart()));
		
		request.setAttribute("page", pageInfo);
		return "system/list.jsp";
	}
	
	/**
	 * GO Add
	 * @return
	 */
	@RequestMapping("add")
	public String add() {
		return "system/add.jsp"; 
	}
	
	/**
	 * Save
	 * @return
	 */
	@RequestMapping("save")
	public String save(NewsInfo info) {
		newService.save(info);
		return "redirect:/system/admin/news/list"; 
	}
	
	/**
	 * Detail
	 * @param id
	 * @return
	 */
	@RequestMapping("detail/{id}")
	public String detail(@PathVariable int id, HttpServletRequest request) {
		request.setAttribute("info", newService.findOne(id));
		return "system/detail.jsp"; 
	}
}
