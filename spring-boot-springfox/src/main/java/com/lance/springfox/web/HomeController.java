package com.lance.springfox.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lance.springfox.domain.TreeInfo;

@Controller
@RequestMapping("api/v1.0/home/")
public class HomeController {

	@RequestMapping(value="list", method=RequestMethod.GET)
	public String list(){
		return "list";
	}
	
	/**
	 * 根据ID删除数据
	 * @param id 根据ID删除数据
	 * @return
	 */
	@RequestMapping(value="delete/{id}", method=RequestMethod.GET)
	public String delete(@PathVariable int id){
		return "delete";
	}
	
	@RequestMapping(value="save", method=RequestMethod.POST)
	public String save(TreeInfo info){
		return "save";
	}
}
