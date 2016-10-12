package com.lance.springfox.web;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lance.springfox.domain.TreeInfo;

@RestController
@RequestMapping("api/v1.0/")
public class IndexController {

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
	
	@RequestMapping(value="detail/id_{id}", method=RequestMethod.GET)
	public String detail(@PathVariable int id){
		return "detail";
	}
}
