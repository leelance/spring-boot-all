# 分库分表
1.单库分表配置：
```properties
#------------------------------------------------------------------------
#                           单库分片                                     #
#------------------------------------------------------------------------
sharding.jdbc.datasource.names=ds_0

sharding.jdbc.datasource.ds_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_0?useSSL=false&serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_0.username=root
sharding.jdbc.datasource.ds_0.password=li123456
sharding.jdbc.datasource.ds_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_0.minimumIdle=10
sharding.jdbc.datasource.ds_0.connectionTestQuery=select 1

sharding.jdbc.config.sharding.tables.t_user_info.actual-data-nodes=ds_0.t_user_info_$->{0..4}
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.sharding-column=user_id
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.algorithm-expression=t_user_info_$->{user_id % 5}
sharding.jdbc.config.sharding.tables.t_user_info.key-generator-column-name=user_id

sharding.jdbc.config.sharding.binding-tables=t_user_info
sharding.jdbc.config.sharding.default-data-source-name=ds_0
sharding.jdbc.config.sharding.props.sql.show=true

```

2.分库分表配置如下：
```properties
#------------------------------------------------------------------------
#                           多库分片                                     #
#------------------------------------------------------------------------
sharding.jdbc.datasource.names=ds_0,ds_1,ds_2

sharding.jdbc.datasource.ds_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_0?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_0.username=root
sharding.jdbc.datasource.ds_0.password=li123456
sharding.jdbc.datasource.ds_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_0.minimumIdle=10
sharding.jdbc.datasource.ds_0.connectionTestQuery=select 1

sharding.jdbc.datasource.ds_1.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_1.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_1.jdbcUrl=jdbc:mysql://localhost:3306/ops_1?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_1.username=root
sharding.jdbc.datasource.ds_1.password=li123456
sharding.jdbc.datasource.ds_1.maximumPoolSize=50
sharding.jdbc.datasource.ds_1.minimumIdle=10
sharding.jdbc.datasource.ds_1.connectionTestQuery=select 1

sharding.jdbc.datasource.ds_2.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_2.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_2.jdbcUrl=jdbc:mysql://localhost:3306/ops_2?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_2.username=root
sharding.jdbc.datasource.ds_2.password=li123456
sharding.jdbc.datasource.ds_2.maximumPoolSize=50
sharding.jdbc.datasource.ds_2.minimumIdle=10
sharding.jdbc.datasource.ds_2.connectionTestQuery=select 1

sharding.jdbc.config.sharding.tables.t_user_info.database-strategy.inline.sharding-column=company_id
sharding.jdbc.config.sharding.tables.t_user_info.database-strategy.inline.algorithm-expression=ds_$->{company_id.longValue() % 3}
sharding.jdbc.config.sharding.tables.t_user_info.actual-data-nodes=ds_$->{0..2}.t_order_$->{0..4}
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.sharding-column=user_id
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.algorithm-expression=t_user_info_$->{user_id % 5}
sharding.jdbc.config.sharding.tables.t_user_info.key-generator-column-name=user_id

sharding.jdbc.config.sharding.binding-tables=t_user_info
sharding.jdbc.config.sharding.default-data-source-name=ds_0
sharding.jdbc.config.sharding.props.sql.show=true
```

3.分库分表+读写分离
```properties
#------------------------------------------------------------------------
#                        多库分片 + 读写                                  #
#------------------------------------------------------------------------
sharding.jdbc.datasource.names=ds_master_0,ds_master_0_slave_0,ds_master_1,ds_master_1_slave_0,ds_master_2,ds_master_2_slave_0

#master_0/slave_0/1/2
sharding.jdbc.datasource.ds_master_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_0?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_0.username=root
sharding.jdbc.datasource.ds_master_0.password=li123456
sharding.jdbc.datasource.ds_master_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_0.minimumIdle=10
sharding.jdbc.datasource.ds_master_0.connectionTestQuery=select 1

sharding.jdbc.datasource.ds_master_0_slave_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_0_slave_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_0_slave_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_0?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_0_slave_0.username=root
sharding.jdbc.datasource.ds_master_0_slave_0.password=li123456
sharding.jdbc.datasource.ds_master_0_slave_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_0_slave_0.minimumIdle=10
sharding.jdbc.datasource.ds_master_0_slave_0.connectionTestQuery=select 1

#master_1/slave_0/1/2
sharding.jdbc.datasource.ds_master_1.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_1.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_1.jdbcUrl=jdbc:mysql://localhost:3306/ops_1?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_1.username=root
sharding.jdbc.datasource.ds_master_1.password=li123456
sharding.jdbc.datasource.ds_master_1.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_1.minimumIdle=10
sharding.jdbc.datasource.ds_master_1.connectionTestQuery=select 1

sharding.jdbc.datasource.ds_master_1_slave_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_1_slave_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_1_slave_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_1?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_1_slave_0.username=root
sharding.jdbc.datasource.ds_master_1_slave_0.password=li123456
sharding.jdbc.datasource.ds_master_1_slave_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_1_slave_0.minimumIdle=10
sharding.jdbc.datasource.ds_master_1_slave_0.connectionTestQuery=select 1

#master_2/slave_0/1/2
sharding.jdbc.datasource.ds_master_2.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_2.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_2.jdbcUrl=jdbc:mysql://localhost:3306/ops_2?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_2.username=root
sharding.jdbc.datasource.ds_master_2.password=li123456
sharding.jdbc.datasource.ds_master_2.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_2.minimumIdle=10
sharding.jdbc.datasource.ds_master_2.connectionTestQuery=select 1

sharding.jdbc.datasource.ds_master_2_slave_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_master_2_slave_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_master_2_slave_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_2?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_master_2_slave_0.username=root
sharding.jdbc.datasource.ds_master_2_slave_0.password=li123456
sharding.jdbc.datasource.ds_master_2_slave_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_master_2_slave_0.minimumIdle=10
sharding.jdbc.datasource.ds_master_2_slave_0.connectionTestQuery=select 1

#sharding rule
sharding.jdbc.config.sharding.tables.t_user_info.database-strategy.inline.sharding-column=company_id
sharding.jdbc.config.sharding.tables.t_user_info.database-strategy.inline.algorithm-expression=ds_$->{company_id.longValue() % 3}
sharding.jdbc.config.sharding.tables.t_user_info.actual-data-nodes=ds_$->{0..2}.t_order_$->{0..4}
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.sharding-column=user_id
sharding.jdbc.config.sharding.tables.t_user_info.table-strategy.inline.algorithm-expression=t_user_info_$->{user_id % 5}
sharding.jdbc.config.sharding.tables.t_user_info.key-generator-column-name=user_id

sharding.jdbc.config.sharding.binding-tables=t_user_info
sharding.jdbc.config.sharding.default-data-source-name=ds_0
sharding.jdbc.config.sharding.props.sql.show=true

#master/slave
sharding.jdbc.config.sharding.master-slave-rules.ds_0.master-data-source-name=ds_master_0
sharding.jdbc.config.sharding.master-slave-rules.ds_0.slave-data-source-names=ds_master_0_slave_0
sharding.jdbc.config.sharding.master-slave-rules.ds_1.master-data-source-name=ds_master_1
sharding.jdbc.config.sharding.master-slave-rules.ds_1.slave-data-source-names=ds_master_1_slave_0
sharding.jdbc.config.sharding.master-slave-rules.ds_2.master-data-source-name=ds_master_2
sharding.jdbc.config.sharding.master-slave-rules.ds_2.slave-data-source-names=ds_master_2_slave_0
```

4.单库多列分表(订单根据年份+orderId%4生成表)
```properties
#------------------------------------------------------------------------
#                           单库多列分片                                  #
#------------------------------------------------------------------------
sharding.jdbc.datasource.names=ds_0

sharding.jdbc.datasource.ds_0.type=com.zaxxer.hikari.HikariDataSource
sharding.jdbc.datasource.ds_0.driver-class-name=com.mysql.jdbc.Driver
sharding.jdbc.datasource.ds_0.jdbcUrl=jdbc:mysql://localhost:3306/ops_0?useSSL=false&useUnicode=true&characterEncoding=utf-8
sharding.jdbc.datasource.ds_0.username=root
sharding.jdbc.datasource.ds_0.password=li123456
sharding.jdbc.datasource.ds_0.maximumPoolSize=50
sharding.jdbc.datasource.ds_0.minimumIdle=10
sharding.jdbc.datasource.ds_0.connectionTestQuery=select 1

sharding.jdbc.config.sharding.tables.t_order.key-generator-column-name=order_id
sharding.jdbc.config.sharding.tables.t_order.table-strategy.complex.sharding-columns=create_time,order_id
sharding.jdbc.config.sharding.tables.t_order.table-strategy.complex.algorithm-class-name=com.lance.sharding.config.OrderComplexShardingStrategy

sharding.jdbc.config.sharding.binding-tables=t_order
sharding.jdbc.config.sharding.default-data-source-name=ds_0
sharding.jdbc.config.sharding.props.sql.show=true

```