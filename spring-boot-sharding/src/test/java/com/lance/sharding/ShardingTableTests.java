package com.lance.sharding;

import com.lance.sharding.mapper.UserInfoMapper;
import com.lance.sharding.model.UserInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * ShardingTableTests
 * @author lance
 * @since 2019.3.1 23:17
 */
@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class ShardingTableTests {
    ExecutorService service = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);
    @Autowired
    private UserInfoMapper userInfoMapper;

    @Test
    @Ignore
    public void save() {
        BigInteger companyId = BigInteger.valueOf(1000);
        userInfoMapper.save(createUser(companyId,0));
    }

    @Test
    public void batchSave() {
        BigInteger companyId = BigInteger.valueOf(2000);
        List<CompletableFuture<Void>> futures = IntStream.range(0, 100).mapToObj(j->CompletableFuture.runAsync(()->{
                List<UserInfo> list = IntStream.range(0, 500)
                        .mapToObj(i -> createUser(companyId, i))
                        .collect(Collectors.toList());
                userInfoMapper.batchSave(list);
            }, service)
        ).collect(Collectors.toList());

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[]{})).join();
    }

    private UserInfo createUser(BigInteger companyId, int index){
        return UserInfo.builder()
                .account("Account."+index)
                .companyId(companyId)
                .password(RandomStringUtils.randomAlphabetic(8))
                .userName("Name."+index)
                .build();
    }
}
