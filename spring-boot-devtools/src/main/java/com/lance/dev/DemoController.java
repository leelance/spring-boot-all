package com.lance.dev;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DemoController {

	@ResponseBody
	@RequestMapping("demo")
	public void demo() {
		System.out.println("demo");
		System.out.println("xxxxxxx");
		System.out.println("-----------");
		System.out.println("-------point 1-----------");
		System.out.println("-------point 2-----------");
		System.out.println("-------point 3-----------");
		System.out.println("demo end.");
	}
}
