package com.lance.websocket.client.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

	/**
	 * Index
	 * @return
	 */
	@RequestMapping(value={"", "/", "index"})
	public String index() {
		return "index.jsp";
	}
	
	@RequestMapping("chat")
	public String chat() {
		return "chat.jsp";
	}
	
	@RequestMapping("game")
	public String game() {
		return "index.jsp";
	}
}
