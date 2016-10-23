package com.lance.crawler;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;

public class CrawlerTest {
	Logger logger = LogManager.getLogger(getClass());

	@Test
	public void run() throws InterruptedException, ExecutionException{
		String[] urls = {"https://www.baidu.com/"};
		List<Future<String>> results = Crawler.getInstance().initUrl(urls).parallelDrainQueue(3);
		for(Future<String> future: results) {
			logger.info("result: {}", future.get());
		}
	}
}
