package com.lance.sharding;

import com.lance.sharding.mapper.CompanyMapper;
import com.lance.sharding.mapper.OrderMapper;
import com.lance.sharding.mapper.UserInfoMapper;
import com.lance.sharding.model.Company;
import com.lance.sharding.model.Order;
import com.lance.sharding.model.UserInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.assertj.core.util.Maps;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigInteger;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
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
    private ExecutorService service = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);
    @Autowired
    private UserInfoMapper userInfoMapper;
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private OrderMapper orderMapper;

    @Test
    @Ignore
    public void save() {
        BigInteger companyId = BigInteger.valueOf(2000);
        userInfoMapper.save(createUser(companyId,0));
    }

    @Test
    @Ignore
    public void saveOrder(){
        Order order = Order.builder().orderName("122").createTime(new Date()).build();
        orderMapper.save(order);
    }

    @Test
    public void batchSaveOrder() throws ParseException {
        Date now = new Date();
        Date nextDate = DateUtils.parseDate("2020", "YYYY");
        List<CompletableFuture<Void>> futures = IntStream.range(0, 10).mapToObj(j->CompletableFuture.runAsync(()->{
                    List<Order> list = IntStream.range(0, 500)
                            .mapToObj(i ->Order.builder().orderName("Order."+i).createTime(nextDate).build())
                            .collect(Collectors.toList());
                    orderMapper.batchSave(list);
                }, service)
        ).collect(Collectors.toList());

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[]{})).join();
    }

    @Test
    @Ignore
    public void list(){
        BigInteger companyId = BigInteger.valueOf(3000);
        Map<String, Object>map = Maps.newHashMap("companyId", companyId);

        userInfoMapper.findAll(map);
    }

    @Test
    @Ignore
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

    @Test
    @Ignore
    public void saveCompany(){
        Company company = Company.builder()
                .companyId(new BigInteger(RandomStringUtils.randomNumeric(4)))
                .companyName("33")
                .address("222")
                .createTime(new Date())
                .build();

        companyMapper.save(company);
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
