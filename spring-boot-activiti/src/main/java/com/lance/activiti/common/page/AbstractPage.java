package com.lance.activiti.common.page;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractPage<T> implements Serializable{
    private static final long serialVersionUID = -8435554837758705265L;
    
    /**
     * 总记录数量
     */
    protected int records;
    /**
     * 数据集合
     */
    protected List<T>rows;
    
    public abstract void init(int records, int pageNumber, int pageSize);
    
    public int getRecords() {
        return records;
    }
    public void setRecords(int records) {
        this.records = records;
    }
    public List<T> getRows() {
        return rows;
    }
    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}