package com.lance.sharding.config;

import com.alibaba.fastjson.JSON;
import io.shardingsphere.api.algorithm.sharding.ListShardingValue;
import io.shardingsphere.api.algorithm.sharding.ShardingValue;
import io.shardingsphere.api.algorithm.sharding.complex.ComplexKeysShardingAlgorithm;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
public class OrderComplexShardingStrategy implements ComplexKeysShardingAlgorithm {
    private final String TIME = "create_time";
    private final String ORDER_ID = "order_id";

    @Override
    @SuppressWarnings("unchecked")
    public Collection<String> doSharding(Collection<String> availableTargetNames, Collection<ShardingValue> shardingValues) {
        log.info("Tables: {}, preciseValue: {}",  JSON.toJSONString(availableTargetNames), JSON.toJSONString(shardingValues));
        Collection<Timestamp> years = shardingValues.stream().filter(t->t.getColumnName().equalsIgnoreCase(TIME)).map(o-> ((ListShardingValue<Timestamp>)o).getValues()).findFirst().orElse(null);
        Collection<Long> orders = shardingValues.stream().filter(t->t.getColumnName().equalsIgnoreCase(ORDER_ID)).map(o-> ((ListShardingValue<Long>)o).getValues()).findFirst().orElse(null);

        if(availableTargetNames == null || availableTargetNames.isEmpty()
                ||years == null || years.isEmpty()
                || orders == null || orders.isEmpty()){
            return null;
        }

        Timestamp date = years.toArray(new Timestamp[]{})[0];
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        long order = orders.toArray(new Long[]{})[0];
        String tables = availableTargetNames.toArray(new String[]{})[0];

        if(log.isDebugEnabled()){
            log.debug("===>Table: {}", tables+"_"+calendar.get(Calendar.YEAR)+"_"+order % 4);
        }
        return Collections.singletonList(tables+"_"+calendar.get(Calendar.YEAR)+"_"+order % 4);
    }
}
