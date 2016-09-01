package com.lance.sitemesh.common;

import org.sitemesh.builder.SiteMeshFilterBuilder;
import org.sitemesh.config.ConfigurableSiteMeshFilter;

/**
 * 配置装饰器
 * @author lance
 */
public class WebSiteMeshFilter extends ConfigurableSiteMeshFilter{

	@Override
	protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {
		builder.addDecoratorPath("/admin/*", "/admin/index")
			   .addExcludedPath("/admin/index")
			   .addExcludedPath("/plugin/*");
	}
}
