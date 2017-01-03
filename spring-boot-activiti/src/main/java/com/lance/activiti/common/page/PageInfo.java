package com.lance.activiti.common.page;
/**
 * 分页对象
 * @author lance 2016下午3:01:36
 * @param <T>
 */
public class PageInfo<T> extends AbstractPage<T> {
    private static final long serialVersionUID = 2107567559442583734L;
    /**
     * 每页显示记录数
     */
    private int pageSize = 20;
    /**
     * 总页数
     */
    private int total = 1;
    /**
     * 当前页
     */
    private int pageNumber = 1;
    
    /**分页索引*/
    private int pageIndex = 0;
    
    public PageInfo(int records, int pageNumber) {
        init(records, pageNumber, pageSize);
    }

    public PageInfo(int records, int pageNumber, int pageSize) {
        init(records, pageNumber, pageSize);
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    @Override
    public void init(int records, int pageNumber, int pageSize) {
        // 设置基本参数
        this.pageSize = pageSize;
        this.total = records;
        int totalPage = (this.records - 1) / this.pageSize + 1;
        this.pageIndex = (pageNumber-1) * pageSize;

        // 根据输入可能错误的当前号码进行自动纠正
        if (pageNumber < 1) {
            this.pageNumber = 1;
        } else if (pageNumber > totalPage) {
            this.pageNumber = totalPage;
        } else {
            this.pageNumber = pageNumber;
        }
    }

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
}
