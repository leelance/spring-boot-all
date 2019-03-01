package com.lance.sharding.model;

import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;


/**
* 
* @author Lance
* @since 2019-03-01 23:05:40
*/
@Data
@Builder
public class UserInfo {
	/***/
	private BigInteger userId;

	/***/
	private BigInteger companyId;

	/***/
	private String userName;

	/***/
	private String account;

	/***/
	private String password;

}