package com.lance.freemaker.domain;

import java.io.Serializable;
import java.util.List;
/**
 * 分页辅助类
 * @author lance
 * @param <T>
 */
public class PageInfo<T> implements Serializable {
	private static final long serialVersionUID = 2254473661569318782L;

	// 对象记录结果集
	private List<T> list; 
	// 总记录数
	private int total = 0; 
	// 每页显示记录数
	private int pageSize = 5; 
	//针对查询开始记录数量, 如select *from table limit pageStart,pageSize
	@SuppressWarnings("unused")
	private int pageStart = 0;
	// 总页数
	private int pages = 1; 
	// 当前页
	private int pageNumber = 1; 

	// 是否为第一页
	private boolean isFirstPage = false;
	// 是否为最后一页
	private boolean isLastPage = false; 
	// 是否有前一页
	private boolean hasPreviousPage = false;
	// 是否有下一页
	private boolean hasNextPage = false;
	//导航页码数
	private int navigatePages = 8; 
	//所有导航页号
	private int[] navigatePageNumbers; 

	public PageInfo(int total, int pageNumber) {
		init(total, pageNumber, pageSize);
	}

	public PageInfo(int total, int pageNumber, int pageSize) {
		init(total, pageNumber, pageSize);
	}

	private void init(int total, int pageNumber, int pageSize) {
		// 设置基本参数
		this.total = total;
		this.pageSize = pageSize;
		this.pages = (this.total - 1) / this.pageSize + 1;

		// 根据输入可能错误的当前号码进行自动纠正
		if (pageNumber < 1) {
			this.pageNumber = 1;
		} else if (pageNumber > this.pages) {
			this.pageNumber = this.pages;
		} else {
			this.pageNumber = pageNumber;
		}

		// 基本参数设定之后进行导航页面的计算
		calcNavigatePageNumbers();

		// 以及页面边界的判定
		judgePageBoudary();
	}

	/**
	 * 计算导航页
	 */
	private void calcNavigatePageNumbers() {
		// 当总页数小于或等于导航页码数时
		if (pages <= navigatePages) {
			navigatePageNumbers = new int[pages];
			for (int i = 0; i < pages; i++) {
				navigatePageNumbers[i] = i + 1;
			}
		} else { // 当总页数大于导航页码数时
			navigatePageNumbers = new int[navigatePages];
			int startNum = pageNumber - navigatePages / 2;
			int endNum = pageNumber + navigatePages / 2;

			if (startNum < 1) {
				startNum = 1;
				// (最前navigatePages页
				for (int i = 0; i < navigatePages; i++) {
					navigatePageNumbers[i] = startNum++;
				}
			} else if (endNum > pages) {
				endNum = pages;
				// 最后navigatePages页
				for (int i = navigatePages - 1; i >= 0; i--) {
					navigatePageNumbers[i] = endNum--;
				}
			} else {
				// 所有中间页
				for (int i = 0; i < navigatePages; i++) {
					navigatePageNumbers[i] = startNum++;
				}
			}
		}
	}

	/**
	 * 判定页面边界
	 */
	private void judgePageBoudary() {
		isFirstPage = pageNumber == 1;
		isLastPage = pageNumber == pages && pageNumber != 1;
		hasPreviousPage = pageNumber > 1;
		hasNextPage = pageNumber < pages;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	/**
	 * 得到当前页的内容
	 */
	public List<T> getList() {
		return list;
	}

	/**
	 * 得到记录总数
	 */
	public int getTotal() {
		return total;
	}

	/**
	 * 得到每页显示多少条记录
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * 得到页面总数
	 */
	public int getPages() {
		return pages;
	}

	/**
	 * 得到当前页号
	 */
	public int getPageNumber() {
		return pageNumber;
	}

	/**
	 * 得到所有导航页号
	 */
	public int[] getNavigatePageNumbers() {
		return navigatePageNumbers;
	}

	public void setNavigatePageNumbers(int[] navigatePageNumbers) {
		this.navigatePageNumbers = navigatePageNumbers;
	}

	public boolean isFirstPage() {
		return isFirstPage;
	}

	public boolean isLastPage() {
		return isLastPage;
	}

	public boolean hasPreviousPage() {
		return hasPreviousPage;
	}

	public boolean hasNextPage() {
		return hasNextPage;
	}

	public int getPageStart() {
		return (pageNumber - 1) * pageSize;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("[").append("total=").append(total).append(",pages=")
				.append(pages).append(",pageNumber=").append(pageNumber)
				.append(",pageSize=").append(pageSize).append(",isFirstPage=")
				.append(isFirstPage).append(",isLastPage=").append(isLastPage)
				.append(",hasPreviousPage=").append(hasPreviousPage)
				.append(",hasNextPage=").append(hasNextPage)
				.append(",navigatePageNumbers=");
		int len = navigatePageNumbers.length;
		if (len > 0)
			sb.append(navigatePageNumbers[0]);
		for (int i = 1; i < len; i++) {
			sb.append(" " + navigatePageNumbers[i]);
		}
		sb.append(",list.size=" + list.size());
		sb.append("]");
		return sb.toString();
	}
}
