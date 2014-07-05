package com.lance.application;

import java.io.IOException;
import java.util.Date;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lance.entity.BlogEntity;
import com.lance.entity.UserEntity;
import com.lance.repository.BlogRepository;

@Component
public class Crawler {
	//private String url = "http://www.oschina.net/blog?type=0&p=";
	private String url = "http://****";
	private Logger logger = LoggerFactory.getLogger(getClass());
	private static int page = 1;
	
	@Autowired
	private BlogRepository blogRepository;
	/**
	 * 获取Elements
	 * @param page
	 */
	public void getBlogList(int page) {
		url = url+page+"#catalogs";
		String css = "#RecentBlogs .BlogList > li";
		Elements elements = getElements(url, css);
		
		parseElements(elements);
	}
	
	/**
	 * 循环解析数据
	 * @param elements
	 */
	private void parseElements(Elements elements) {
		if(elements == null || elements.size() == 0) {
			return;
		}
		
		for(Element element: elements){
			handlerElement(element);
			//return;
		}
		
		getBlogList(page++);
	}
	
	/**
	 * 处理博客列表页面
	 * @param element
	 */
	private void handlerElement(Element element) {
		Element link = element.select(".b a").first();
		Element p = element.select(".b p").first();
		
		String title = link.text();
		String url = link.attr("href");
		String description = p.text();
		
		BlogEntity blogEntity = new BlogEntity();
		blogEntity.setTitle(title);
		blogEntity.setDescription(description);
		
		getBlogDetail(url, blogEntity);
	}
	
	/**
	 * 处理博客详细内容
	 * @param url
	 * @return
	 */
	private void getBlogDetail(String href, BlogEntity blogEntity){
		String css = ".BlogEntity";
		Element element = getElements(href, css).first();
		
		//获取摘要
		String summary = element.select(".BlogTitle span").first().text();
		blogEntity.setSummary(summary);
		
		//获取标签
		Elements links = element.select(".BlogContent a");
		String tags = null;
		for(Element link: links){
			tags+=link.text();
			break;
		}
		blogEntity.setTags(tags);
		
		//获取内容
		String content = element.select(".BlogContent").first().text();
		blogEntity.setContent(content);
		blogEntity.setCreateDate(new Date());
		
		UserEntity user = new UserEntity();
		user.setId(1);
		blogEntity.setBlongUser(user);
		
		blogRepository.save(blogEntity);
	}
	
	/**
	 * 获取Elements对象
	 * @param page
	 * @return
	 */
	private Elements getElements(String url, String css){
		Document document = null;
		try {
			document = Jsoup.connect(url)
						.data("query", "Java")
						.userAgent("Mozilla")
						.cookie("auth", "token")
						.timeout(3000)
						.post();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		
		//document不存在
		if(document == null){
			return null;
		}
		
		//拉去BlogList下所有博客列表
		Elements elements = document.select(css);
		return elements;
	}
}
