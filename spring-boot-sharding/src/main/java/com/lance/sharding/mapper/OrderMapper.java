package com.lance.sharding.mapper;

import com.lance.sharding.model.Order;

import java.util.List;

public interface OrderMapper {
    int save(Order info);

    /**
     * 批量保存
     * @param list
     * @return
     */
    int batchSave(List<Order> list);
}
