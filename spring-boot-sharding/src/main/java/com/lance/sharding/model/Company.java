package com.lance.sharding.model;

import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

/**
* 
* @author Lance
* @since 2019-03-01 23:05:40
*/
@Data
public class Company {
	/***/
	private BigInteger companyId;

	/***/
	private String companyName;

	/***/
	private String address;

	/***/
	private Date createTime;

}