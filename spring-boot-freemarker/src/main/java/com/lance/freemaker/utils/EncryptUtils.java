package com.lance.freemaker.utils;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final class EncryptUtils {
	
	private EncryptUtils(){
		
	}
	
	/**
	 * MD5加密
	 * @param password
	 * @return
	 */
	public synchronized static String encryptMD5(String password){
		Charset utf8 = Charset.forName("UTF-8");
		StringBuilder builder = new StringBuilder();
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			md5.update(password.getBytes(utf8));
			byte[] b = md5.digest();
			for (int i=0; i<b.length; i++) {
				String hex = Integer.toHexString(0xff & b[i]);
			 	if(hex.length()==1) builder.append('0');
			 	builder.append(hex);
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return builder.toString();
	}
}