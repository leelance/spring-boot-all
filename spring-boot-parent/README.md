# demo-springmvc-mybatis-dwz
dwz加入kindeditor部分插件, 如: 富文本编辑器, 上传文件插件, 由于dwz集成的是uploadify flash类型插件
当一个页面很多个上传附件插件时, 会出现页面渲染缓慢
## js
 ```
 //KindEditor.uploadbutton上传文件
    $("input.ke-input-text", $p).each(function() {
    	var $thiz = $(this), _id = $thiz.attr("id");
    	$.getScript(ctx+'/static/kindeditor/kindeditor-min.js', function() {
    		var uploadbutton = KindEditor.uploadbutton({
				button : KindEditor('#'+_id+"Btn"),
				fieldName : 'imgFile',
				url : ctx+'/upload?dir=file',
				afterUpload : function(data) {
					if (data.error === 0) {
						//var url = KindEditor.formatUrl(data.url, 'absolute');
						$thiz.val(data.url);
					} else {
						alert(data.message);
					}
				},
				afterError : function(str) {
					alert('自定义错误信息: ' + str);
				}
			});
			uploadbutton.fileBox.change(function(e) {
				uploadbutton.submit();
			});
            
            prettyPrint();
        });
    });
 ```
## html
```
<div class="unit">
	<label>上传身份证：</label>
	<input class="ke-input-text" type="text" id="card" value="" readonly="readonly" />
	<input type="button" id="cardBtn" value="上传身份证" />
</div>
```
## springmvc配置shiro+redis[redisTemplate], 详见demo-springmvc-shiro
```
<!-- RedisCache -->
<bean id="redisCacheManager" class="com.lance.shiro.realm.RedisCacheManager"/>

<!-- Shiro's main business-tier object for web-enabled applications -->
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
	<property name="realm" ref="userRealm"/>
	<property name="cacheManager" ref="redisCacheManager" />
	<property name="sessionManager" ref="sessionManager" />
</bean>
public class RedisCacheManager extends AbstractCacheManager {
	@Autowired
	private RedisTemplate<byte[], Object> redisTemplate;

	@Override
	protected Cache<byte[], Object> createCache(String name) throws CacheException {
		return new RedisCache<byte[], Object>(redisTemplate, name);
	}
}
```

## springmvc集成activemq[jmsTemplate], 详见demo-springmvc-activemq 生产者， 消费者demo-springmvc-activemq-consumer
```
<!-- ActiveMQConnectionFactory -->
<bean id="activeMQConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
	<constructor-arg index="0" value="tcp://127.0.0.1:61616"/>
	<property name="trustedPackages">
		<list>
			<value>com.lance.mq</value>
			<value>java.util</value>
		</list>
	</property>
</bean>

<!-- 创建ConnectionFactory连接池 -->
<bean id="pooledConnectionFactory" class="org.apache.activemq.pool.PooledConnectionFactory">
	<property name="connectionFactory" ref="activeMQConnectionFactory"/>
</bean>

<!-- CachingConnectionFactory -->
<bean id="connectionFactory" class="org.springframework.jms.connection.CachingConnectionFactory">
	<constructor-arg index="0" ref="pooledConnectionFactory"/>
</bean>

<!-- jmsTemplate -->
<bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
	 <property name="connectionFactory" ref="connectionFactory"/>
	 <property name="messageConverter">
	 	<bean class="org.springframework.jms.support.converter.SimpleMessageConverter"/>
	 </property>
</bean>

<!-- ActiveMQQueue -->
<bean id="activeMQQueue" class="org.apache.activemq.command.ActiveMQQueue">
	<constructor-arg index="0" value="queue"/>
</bean>

<!-- ActiveMQTopic -->
<bean id="activeMQTopic" class="org.apache.activemq.command.ActiveMQTopic">
	<constructor-arg index="0" value="topic"/>
</bean>
```
```
<!-- ActiveMQConnectionFactory -->
<bean id="activeMQConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
	<constructor-arg index="0" value="tcp://127.0.0.1:61616" />
</bean>

<!-- CachingConnectionFactory -->
<bean id="connectionFactory" class="org.springframework.jms.connection.CachingConnectionFactory">
	<constructor-arg index="0" ref="activeMQConnectionFactory" />
</bean>

<!-- ActiveMQQueue -->
<bean id="activeMQQueue" class="org.apache.activemq.command.ActiveMQQueue">
	<constructor-arg index="0" value="queue" />
</bean>

<!--  
<bean id="consumerListener" class="com.lance.mq.ConsumerListener"/>
<bean id="messageListenerAdapter" class="org.springframework.jms.listener.adapter.MessageListenerAdapter">
	<constructor-arg index="0" ref="consumerListener"/>
    <property name="messageConverter">
        <bean class="org.springframework.jms.support.converter.SimpleMessageConverter"/>
    </property>
</bean>
<bean id="queueListenerContainer" class="org.springframework.jms.listener.DefaultMessageListenerContainer">
	<property name="connectionFactory" ref="connectionFactory" />
	<property name="destination" ref="activeMQQueue" />
	<property name="messageListener" ref="messageListenerAdapter" />
</bean>
-->
<bean id="consumerReturnListener" class="com.lance.mq.ConsumerReturnListener"/>
<bean class="org.springframework.jms.listener.DefaultMessageListenerContainer">
	<property name="connectionFactory" ref="connectionFactory" />
	<property name="destination" ref="activeMQQueue" />
	<property name="messageListener" ref="consumerReturnListener" />
</bean>
```
## activemq针对未被消费者接受的数据 持久化到mysql数据配置, 需要在activemqlib下加入mysql包
```
<!-- MySQL DateBase -->
<bean id="mysql-ds" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
  <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
  <property name="url" value="jdbc:mysql://localhost:3306/demo-schema?relaxAutoCommit=true"/>
  <property name="username" value="root"/>
  <property name="password" value="123456"/>
  <property name="poolPreparedStatements" value="true"/>
</bean>
<persistenceAdapter>  
	<jdbcPersistenceAdapter dataSource="#mysql-ds"/>  
</persistenceAdapter>  
<!--
<persistenceAdapter>
   <kahaDB directory="${activemq.data}/kahadb"/>
</persistenceAdapter>
-->
```
###java反射获取参数名称,借助javaassist.jar包,详见demo-springmvc-activemq/src/test/java/com/lance/mq/GetMethodTest.java
```
ClassPool pool = ClassPool.getDefault();
CtMethod ctMethod = pool.getMethod(getClass().getName(), "getName");
MethodInfo methodInfo = ctMethod.getMethodInfo();
CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
LocalVariableAttribute attr = (LocalVariableAttribute)codeAttribute.getAttribute(LocalVariableAttribute.tag);

String[] paramNames = new String[ctMethod.getParameterTypes().length];  
int pos = Modifier.isStatic(ctMethod.getModifiers()) ? 0 : 1; 
for (int i = 0; i < paramNames.length; i++){
    paramNames[i] = attr.variableName(i + pos);
}
for (String paramName: paramNames) {  
    logger.info("paramName: {}", paramName); 
}

//或者借助spirng提供的方法 直接用, 比较简单
LocalVariableTableParameterNameDiscoverer parameterNameDiscoverer = new LocalVariableTableParameterNameDiscoverer();
String[]names = parameterNameDiscoverer.getParameterNames(method);
for (String name: names) {  
    logger.info("LocalVariableTableParameterNameDiscoverer ==> name: {}", name); 
}
```
