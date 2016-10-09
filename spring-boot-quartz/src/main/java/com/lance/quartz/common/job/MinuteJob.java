package com.lance.quartz.common.job;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * 该方法仅仅用来测试每分钟执行
 * @author lance
 */
public class MinuteJob implements Job{
	Logger logger = LogManager.getLogger(getClass());

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		logger.info("JobName: {}", context.getJobDetail().getKey().getName());
	}
}