package com.lance.quartz.common.exception;

/**
 * 自定义针对service异常
 * @author lance
 * 2015年5月27日 下午5:09:01
 */
public class ServiceException extends RuntimeException {
	private static final long serialVersionUID = 8624944628363400977L;

	public ServiceException() {
		super();
	}

	public ServiceException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}
}