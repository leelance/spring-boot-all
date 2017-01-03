package com.lance.activiti.utils;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

public final class EncryptUtils {
	
	private EncryptUtils(){
		
	}
	
	/**
	 * Base64加密
	 * @author lance
	 * 2015年12月30日 下午11:54:21
	 */
	public synchronized static String encodeBase64(String password){
		if(StringUtils.isBlank(password)) {
			return "";
		}
        Base64 base64 = new Base64();
        return base64.encodeToString(password.getBytes());
    }
	
	/**
	 * Base64解密
	 * @author lance
	 * 2015年12月30日 下午11:54:21
	 */
	public synchronized static String decodeBase64(String password){
		if(StringUtils.isBlank(password)) {
			return "";
		}
        Base64 base64 = new Base64();
        byte[] b = base64.decode(password.getBytes());
        return new String(b);
    }
	
	/**
	 * 采用MD5加密
	 * @param password
	 * @author lance
	 * 2015年12月31日 上午12:24:12
	 */
	public synchronized static String MD5(String password){
		return MD5(password, null);
	}
	
	/**
	 * 采用MD5和手机号码部分加密
	 * @param password
	 * @author lance
	 * 2015年12月31日 上午12:24:12
	 */
	public synchronized static String MD5(String password, String salt){
		Charset utf8 = Charset.forName("UTF-8");
		if(StringUtils.isNotBlank(salt)) {
		    password = salt+password+salt;
		}
		
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			md5.update(password.getBytes(utf8));
			
			byte[] b = md5.digest();
			StringBuilder builder = new StringBuilder();
	    	for (int i=0; i<b.length; i++) {
	    		String hex = Integer.toHexString(0xff & b[i]);
	   	     	if(hex.length()==1) builder.append('0');
	   	     	builder.append(hex);
	    	}
			return builder.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
}