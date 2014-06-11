package com.lance.utils;

/**
 * 处理service抛出运行时异常处理
 * @author lance
 */
public class ServiceException extends RuntimeException {
	private static final long serialVersionUID = 1389958090308317369L;

	public ServiceException() {
		super();
	}

	public ServiceException(String msg, Throwable clause) {
		super(msg, clause);
	}

	public ServiceException(String msg) {
		super(msg);
	}

	public ServiceException(Throwable clause) {
		super(clause);
	}
	
}
