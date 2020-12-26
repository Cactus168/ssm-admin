package com.jo.commons;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.jxpath.JXPathContext;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.crypto.hash.SimpleHash;

import org.springframework.cglib.beans.BeanCopier;
public class CommonDataUtils {
	/**
	* 获取访问系统用户IP
	* @param request
	* @return
	*/
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
	    }
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
	    }
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	/**
	 * 获取登录用户的IP
	 * @throws Exception 
	 */
	public static String getRemortIP(HttpServletRequest request) throws Exception {  
		String ip = "";
		if (request.getHeader("x-forwarded-for") == null) {  
			ip = request.getRemoteAddr();  
	    }else{
	    	ip = request.getHeader("x-forwarded-for");  
	    }
		return ip;
	}
	/**
	 * 生成一个记号
	 * @author huixiaoke
	 * @date 2016-4-11
	 */
	public static String createToken(Integer userId) throws Exception{
		String loginDate = CommonDateUtils.getDate(new Date(), "yyyyMMddHHmmss");
		return new SimpleHash("SHA-1", userId.toString(), loginDate).toString();
	}
	
	/**  
    * @Title: copyProperties  
    * @Description: TODO(bean属性转换)  
    * @param source 资源类 
    * @param target  目标类  
    * @author yushaojian 
    * @date 2015年11月25日下午4:56:44 
    */  
    public static void copyProperties(Object source,Object target){  
        BeanCopier copier = BeanCopier.create(source.getClass(), target.getClass(), false);   
        copier.copy(source, target, null);  
    } 
	
	/**
	 * 跟据条件从任意类型的list集合中获取获取对于的list的数据
	 * 变量名首字母必须小写
	 */
	@SuppressWarnings("unchecked")
	public static <T> T subList(T list,String cond){
		JXPathContext context = JXPathContext.newContext(list);
		List<T> subList = new ArrayList<T>();
		cond = ".[" + cond + "]";
		Iterator<T> iter = context.iterate(cond);
		while (iter.hasNext()) {
			subList.add(iter.next());
		}
		return (T)subList;
	}
	
	/**
	 * 判断集合容器是否为空
	 * 
	 * @param obj 判断对象
	 * 
	 * @return boolean 
	 */
	public static boolean isCollectionNotEmpty(Object obj){
		if(null == obj) return false;
		if (!(obj instanceof Collection)) return false;
		if(((Collection<?>)obj).isEmpty()) return false;
		return true;
	}
	
	/**
	 * 判断map是否为空
	 * 
	 * @param obj 判断对象
	 * 
	 * @return boolean 
	 */
	public static boolean isMapNotEmpty(Object obj){
		if(null == obj) return false;
		if (!(obj instanceof  Map)) return false;
		if(((Map<?,?>)obj).isEmpty()) return false;
		return true;
	}
	
	/**
	 * 首字母大写
	 * @author huixiaoke
	 * @date 2017-2-14
	 */
    public static String initialsUpper(String name) {
        name = name.substring(0, 1).toUpperCase() + name.substring(1);
       return  name;
      
    }
    /**
     * 将Java类型转换位jdbc类型
     * @author huixiaoke
     * @date 2017-2-14
     */
    public static String javaTypeToJdbcType(String javaType){
    	String jdbcType = null;
    	if(StringUtils.equals("String", javaType)){
    		jdbcType = "VARCHAR";
    	}
    	if(StringUtils.equals("Integer", javaType)){
    		jdbcType = "INTEGER";
    	}
    	if(StringUtils.equals("Double", javaType)){
    		jdbcType = "DOUBLE";
    	}
    	return jdbcType;
    }
    /**
	 * 首字母小写
	 * @author huixiaoke
	 * @date 2017-2-14
	 */
    public static String initialsLower(String name) {
        name = name.substring(0, 1).toLowerCase()+ name.substring(1);
       return  name;
      
    }
    //首字母大写 将字符串name 转化为首字母大写。但是这种效率并不高，
    public static String captureNamex(String name) {
        char[] cs=name.toCharArray();
        cs[0]-=32;
        return String.valueOf(cs);
    }
}
