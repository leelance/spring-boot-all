package com.lance.sharding.config;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.google.common.collect.Range;
import io.shardingsphere.api.algorithm.sharding.RangeShardingValue;
import io.shardingsphere.api.algorithm.sharding.standard.RangeShardingAlgorithm;
import lombok.extern.slf4j.Slf4j;

import java.math.BigInteger;
import java.util.Collection;

/**
 * 按照企业范围分片
 * @author lance
 * @since 2019.3.2 15:12
 */
@Slf4j
public class CompanyRangeDBShardingAlgorithm implements RangeShardingAlgorithm<BigInteger> {
    @Override
    public Collection<String> doSharding(Collection<String> availableTargetNames, RangeShardingValue<BigInteger> shardingValue) {
        log.info("ShardingTables: {}, preciseShardingValue: {}",  JSON.toJSONString(availableTargetNames), JSON.toJSONString(shardingValue));
        Collection<String> tables = Lists.newArrayList();

        Range<Long> first = Range.closedOpen(0L, 1000L);
        Range<Long> second = Range.closedOpen(1000L, 2000L);
        Range<Long> third = Range.closedOpen(2000L, 4000L);
        Range<Long> fourth = Range.greaterThan(4000L);

        tables.add(shardingValue.getLogicTableName()+"_0");
        return tables;
    }
}
