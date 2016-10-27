package com.lance.jpa.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.lance.jpa.domain.Teacher;
import com.lance.jpa.service.TeacherService;

@RestController
public class IndexController {
	@Autowired
	private TeacherService teacherService;
	
	@RequestMapping(value="list", method=RequestMethod.POST)
	public String list(){
		Map<String, Object> map = new HashMap<>();
		List<Teacher> infos = teacherService.findAll();
		map.put("rows", infos);
		map.put("total", infos.size());
		return JSON.toJSONString(map);
	}
	
	/**
	 * 保存定时任务
	 * @param info
	 * 2016年10月9日下午1:36:59
	 */
	@RequestMapping(value="save", method=RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String save(Teacher info){
		teacherService.saveAndFlush(info);
		Map<String, Object> map = new HashMap<>();
		map.put("errorCode", 0);
		map.put("errorText", null);
		return JSON.toJSONString(map);
	}
	
	/**
	 * 删除定时任务
	 * @param jobName
	 * @param jobGroup
	 * 2016年10月9日下午1:52:20
	 */
	@RequestMapping(value="delete/{id}", produces = "application/json; charset=UTF-8")
	public String delete(@PathVariable int id){
		teacherService.delete(id);
		Map<String, Object> map = new HashMap<>();
		map.put("errorCode", 0);
		map.put("errorText", null);
		return JSON.toJSONString(map);
	}
}
