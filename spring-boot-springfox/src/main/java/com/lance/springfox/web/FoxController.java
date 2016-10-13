package com.lance.springfox.web;

import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1.0/home/")
public class FoxController {

	/**
	 * 查询所有记录
	 * @param params Map参数
	 * @param model	 Model
	 * @return
	 */
	@RequestMapping(value="findAll", method=RequestMethod.GET)
	public String findAll(Map<String, Object> params, Model model){
		return "findAll";
	}
	
	/**
	 * 查询所有记录
	 * @param id 	 id参数
	 * @param model	 Model
	 * @return
	 */
	@RequestMapping(value="delete/{id}", method=RequestMethod.DELETE)
	public String remove(@PathVariable int id, Model model){
		return "remove";
	}
	
	/**
	 * View
	 * @param name
	 * @param address
	 * @return
	 */
	@RequestMapping(value="view", method=RequestMethod.GET)
	public String view(@RequestParam String name, @RequestParam List<String> address){
		return "view";
	}
}
