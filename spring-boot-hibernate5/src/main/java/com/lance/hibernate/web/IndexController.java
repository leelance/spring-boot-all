package com.lance.hibernate.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.lance.hibernate.entity.CityEntity;
import com.lance.hibernate.json.ResultInfo;
import com.lance.hibernate.service.CityService;

@Controller
public class IndexController {
	@Autowired
	private CityService cityService;

	@RequestMapping(value={"","/","index"}, method=RequestMethod.GET)
	public String index() {
		return "index.jsp";
	}
	
	//List
	@ResponseBody
	@RequestMapping(value="list", method=RequestMethod.POST)
	public String list() {
		Map<String, Object> map = new HashMap<>();
		List<CityEntity> infos = cityService.findAll();
		map.put("rows", infos);
		map.put("total", infos.size());
		return JSON.toJSONString(map); 
	}
	
	//Save
	@ResponseBody
	@RequestMapping(value="save", method=RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String save(CityEntity city, HttpServletRequest request) {
		try {
			cityService.save(city);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
	
	/**
	 * Delete
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="delete/{id}", method=RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public String delete(@PathVariable int id) {
		try {
			cityService.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResultInfo.error(-1, e.getMessage());
		}
		return ResultInfo.success();
	}
}
