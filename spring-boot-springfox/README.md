# spring-boot-quartz, 依赖spring-boot-parent
* [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Easyui](http://www.jeasyui.net/)
* [Quartz](http://www.quartz-scheduler.org/)

![image](https://github.com/leelance/spring-boot-all/blob/master/spring-boot-quartz/spring-boot-quartz.jpg)

> * 项目启动后输入：http://localhost/
> * 数据库文件: https://github.com/leelance/spring-boot-all/blob/master/spring-boot-quartz/src/main/resources/demo-schema.sql

application.properties
```
# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index=WebQuartz.v1.1
spring.application.name=WebQuartz

#Server
server.port=80
server.jsp-servlet.class-name=org.apache.jasper.servlet.JspServlet

security.basic.enabled=false
management.security.enabled=false

#MVC
spring.mvc.view.prefix=/WEB-INF/views/
spring.resources.static-locations=classpath:/static/

security.basic.enabled=false
management.security.enabled=false

#LOG
logging.config=classpath:log4j2.xml
```
configuration
```java
@Configuration
public class QuartzConfig {

	@Bean
	public Scheduler scheduler() throws IOException, SchedulerException {
		SchedulerFactory schedulerFactory = new StdSchedulerFactory(quartzProperties());
		Scheduler scheduler = schedulerFactory.getScheduler();
		scheduler.start();
		return scheduler;
	}
	
	/**
	 * 设置quartz属性
	 * @throws IOException
	 * 2016年10月8日下午2:39:05
	 */
	public Properties quartzProperties() throws IOException {
		Properties prop = new Properties();
		prop.put("quartz.scheduler.instanceName", "ServerScheduler");
		prop.put("org.quartz.scheduler.instanceId", "AUTO");
		prop.put("org.quartz.scheduler.skipUpdateCheck", "true");
		prop.put("org.quartz.scheduler.instanceId", "NON_CLUSTERED");
		prop.put("org.quartz.scheduler.jobFactory.class", "org.quartz.simpl.SimpleJobFactory");
		prop.put("org.quartz.jobStore.class", "org.quartz.impl.jdbcjobstore.JobStoreTX");
		prop.put("org.quartz.jobStore.driverDelegateClass", "org.quartz.impl.jdbcjobstore.StdJDBCDelegate");
		prop.put("org.quartz.jobStore.dataSource", "quartzDataSource");
		prop.put("org.quartz.jobStore.tablePrefix", "QRTZ_");
		prop.put("org.quartz.jobStore.isClustered", "true");
		prop.put("org.quartz.threadPool.class", "org.quartz.simpl.SimpleThreadPool");
        prop.put("org.quartz.threadPool.threadCount", "5");

		prop.put("org.quartz.dataSource.quartzDataSource.driver", "com.mysql.jdbc.Driver");
		prop.put("org.quartz.dataSource.quartzDataSource.URL", "jdbc:mysql://localhost:3306/demo-schema");
		prop.put("org.quartz.dataSource.quartzDataSource.user", "root");
		prop.put("org.quartz.dataSource.quartzDataSource.password", "123456");
		prop.put("org.quartz.dataSource.quartzDataSource.maxConnections", "10");
		return prop;
	}
}
```
JS
```java
@Service
public class TaskServiceImpl {
	private Logger logger = LogManager.getLogger(getClass());
	@Autowired
	private Scheduler scheduler;
	
	/**
	 * 所有任务列表
	 * 2016年10月9日上午11:16:59
	 */
	public List<TaskInfo> list(){
		List<TaskInfo> list = new ArrayList<>();
		
		try {
			for(String groupJob: scheduler.getJobGroupNames()){
				for(JobKey jobKey: scheduler.getJobKeys(GroupMatcher.<JobKey>groupEquals(groupJob))){
					List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);
					for (Trigger trigger: triggers) {
						Trigger.TriggerState triggerState = scheduler.getTriggerState(trigger.getKey());
						JobDetail jobDetail = scheduler.getJobDetail(jobKey);
						
						String cronExpression = "", createTime = "";
						
						if (trigger instanceof CronTrigger) {
				            CronTrigger cronTrigger = (CronTrigger) trigger;
				            cronExpression = cronTrigger.getCronExpression();
				            createTime = cronTrigger.getDescription();
				        }
						TaskInfo info = new TaskInfo();
						info.setJobName(jobKey.getName());
						info.setJobGroup(jobKey.getGroup());
						info.setJobDescription(jobDetail.getDescription());
						info.setJobStatus(triggerState.name());
						info.setCronExpression(cronExpression);
						info.setCreateTime(createTime);
						list.add(info);
					}					
				}
			}			
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	/**
	 * 保存定时任务
	 * @param info
	 * 2016年10月9日上午11:30:40
	 */
	@SuppressWarnings("unchecked")
	public void addJob(TaskInfo info) {
		String jobName = info.getJobName(), 
			   jobGroup = info.getJobGroup(), 
			   cronExpression = info.getCronExpression(),
			   jobDescription = info.getJobDescription(),
			   createTime = DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		try {
			if (checkExists(jobName, jobGroup)) {
		        logger.info("===> AddJob fail, job already exist, jobGroup:{}, jobName:{}", jobGroup, jobName);
		        throw new ServiceException(String.format("Job已经存在, jobName:{%s},jobGroup:{%s}", jobName, jobGroup));
		    }
			
			TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
			JobKey jobKey = JobKey.jobKey(jobName, jobGroup);
			
			CronScheduleBuilder schedBuilder = CronScheduleBuilder.cronSchedule(cronExpression).withMisfireHandlingInstructionDoNothing();
			CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withDescription(createTime).withSchedule(schedBuilder).build();
		
		
			Class<? extends Job> clazz = (Class<? extends Job>)Class.forName(jobName);
			JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobKey).withDescription(jobDescription).build();
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException | ClassNotFoundException e) {
			throw new ServiceException("类名不存在或执行表达式错误");
		}
	}
	
	/**
	 * 修改定时任务
	 * @param info
	 * 2016年10月9日下午2:20:07
	 */
	public void edit(TaskInfo info) {
		String jobName = info.getJobName(), 
			   jobGroup = info.getJobGroup(), 
			   cronExpression = info.getCronExpression(),
			   jobDescription = info.getJobDescription(),
			   createTime = DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		try {
			if (!checkExists(jobName, jobGroup)) {
				throw new ServiceException(String.format("Job不存在, jobName:{%s},jobGroup:{%s}", jobName, jobGroup));
			}
			TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
	        JobKey jobKey = new JobKey(jobName, jobGroup);
	        CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cronExpression).withMisfireHandlingInstructionDoNothing();
	        CronTrigger cronTrigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withDescription(createTime).withSchedule(cronScheduleBuilder).build();
	        
	        JobDetail jobDetail = scheduler.getJobDetail(jobKey);
	        jobDetail.getJobBuilder().withDescription(jobDescription);
	        HashSet<Trigger> triggerSet = new HashSet<>();
	    	triggerSet.add(cronTrigger);
	        
	    	scheduler.scheduleJob(jobDetail, triggerSet, true);
		} catch (SchedulerException e) {
			throw new ServiceException("类名不存在或执行表达式错误");
		}
	}
	
	/**
	 * 删除定时任务
	 * @param jobName
	 * @param jobGroup
	 * 2016年10月9日下午1:51:12
	 */
	public void delete(String jobName, String jobGroup){
		TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
        try {
			if (checkExists(jobName, jobGroup)) {
				scheduler.pauseTrigger(triggerKey);
			    scheduler.unscheduleJob(triggerKey);
			    logger.info("===> delete, triggerKey:{}", triggerKey);
			}
		} catch (SchedulerException e) {
			throw new ServiceException(e.getMessage());
		}
	}
	
	/**
	 * 验证是否存在
	 * @param jobName
	 * @param jobGroup
	 * @throws SchedulerException
	 * 2016年10月8日下午5:30:43
	 */
	private boolean checkExists(String jobName, String jobGroup) throws SchedulerException{
		TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
		return scheduler.checkExists(triggerKey);
	}
}
```
