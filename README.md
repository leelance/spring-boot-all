# spring-boot
依赖1.5.19版本，http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/

### spring-boot-parent
所有Module均依赖[spring-boot-parent](https://github.com/leelance/spring-boot-all/tree/master/spring-boot-parent)

## xml
 ```
<module>../spring-boot-hello</module>
<module>../spring-boot-devtools</module>
<module>../spring-boot-mybatis</module>
<module>../spring-boot-shiro</module>
<module>../spring-boot-shiro-redis</module>
<module>../spring-boot-cache-ehcache</module>
<module>../spring-boot-cache-redis</module>
<module>../spring-boot-activemq-producer</module>
<module>../spring-boot-activemq-consumer</module>
<module>../spring-boot-email</module>
<module>../spring-boot-freemarker</module>
<module>../spring-boot-websocket</module>
<module>../spring-boot-websocket-client</module>
<module>../spring-boot-sitemesh</module>
<module>../spring-boot-easyui-kindeditor</module>
<module>../spring-boot-quartz</module>
<module>../spring-boot-springfox</module>
<module>../spring-boot-crawler</module>
<module>../spring-boot-jpa</module>
<module>../spring-boot-activiti</module>
<module>../spring-boot-welcome-page</module>
<module>../spring-boot-sharding</module>
	    	
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>1.5.19.RELEASE</version>
</parent>
```
| Name          			| Description           								|
| ------------- 			|---------------------									|
| spring-boot-starter      		| The core Spring Boot starter, including auto-configuration support, logging and YAML	|
| spring-boot-starter-actuator      	| Production ready features to help you monitor and manage your application.      	|
| spring-boot-starter-amqp 		| are neat      									|
|spring-boot-starter-aop		|Support for aspect-oriented programming including spring-aop and AspectJ.		|
|spring-boot-starter-artemis		|Support for “Java Message Service API” via Apache Artemis.				|
|spring-boot-starter-batch		|Support for “Spring Batch” including HSQLDB database.					|
|spring-boot-starter-cache		|Support for Spring’s Cache abstraction.						|
|spring-boot-starter-cloud-connectors	|Support for “Spring Cloud Connectors” which simplifies connecting to services in cloud platforms like Cloud Foundry and Heroku.											|
|spring-boot-starter-data-elasticsearch	|Support for the Elasticsearch search and analytics engine including spring-data-elasticsearch.													|
|spring-boot-starter-data-gemfire	|Support for the GemFire distributed data store including spring-data-gemfire.		|
|spring-boot-starter-data-jpa		|Support for the “Java Persistence API” including spring-data-jpa, spring-orm and Hibernate.|
|spring-boot-starter-data-mongodb	|Support for the MongoDB NoSQL Database, including spring-data-mongodb.			|
|spring-boot-starter-data-rest		|Support for exposing Spring Data repositories over REST via spring-data-rest-webmvc.	|
|spring-boot-starter-data-solr		|Support for the Apache Solr search platform, including spring-data-solr.		|
|spring-boot-starter-freemarker		|Support for the FreeMarker templating engine.						|
|spring-boot-starter-groovy-templates	|Support for the Groovy templating engine.						|
|spring-boot-starter-hateoas		|Support for HATEOAS-based RESTful services via spring-hateoas.				|
|spring-boot-starter-hornetq		|Support for “Java Message Service API” via HornetQ.					|
|spring-boot-starter-integration	|Support for common spring-integration modules.						|
|spring-boot-starter-jdbc		|Support for JDBC databases.								|
|spring-boot-starter-jersey		|Support for the Jersey RESTful Web Services framework.					|
|spring-boot-starter-jta-atomikos	|Support for JTA distributed transactions via Atomikos.					|
|spring-boot-starter-jta-bitronix	|Support for JTA distributed transactions via Bitronix.					|
|spring-boot-starter-mail		|Support for javax.mail.								|
|spring-boot-starter-mobile		|Support for spring-mobile.								|
|spring-boot-starter-mustache		|Support for the Mustache templating engine.						|
|spring-boot-starter-redis		|Support for the REDIS key-value data store, including spring-redis.			|		
|spring-boot-starter-security		|Support for spring-security.								|
|spring-boot-starter-social-facebook	|Support for spring-social-facebook.							|
|spring-boot-starter-social-linkedin	|Support for spring-social-linkedin.							|
|spring-boot-starter-social-twitter	|Support for spring-social-twitter.							|
|spring-boot-starter-test		|Support for common test dependencies, including JUnit, Hamcrest and Mockito along with the spring-test module.														|
|spring-boot-starter-thymeleaf		|Support for the Thymeleaf templating engine, including integration with Spring.	|
|spring-boot-starter-velocity		|Support for the Velocity templating engine.						|
|spring-boot-starter-web		|Support for full-stack web development, including Tomcat and spring-webmvc.		|	
|spring-boot-starter-websocket		|Support for WebSocket development.							|
|spring-boot-starter-ws			|Support for Spring Web Services.							|		
