package com.jo.commons;
/**
 * 系统公共编码类
 * @author huixiaoke 
 * @date 2017-4-1
 *   
 */
public class CommonConstant {
	
	private CommonConstant(){}; 
	/** 状态码 */
	public final static String STATUS_CODE = "success";
	/** 返回信息 */
	public final static String MESSAGE = "message";
	/**成功状态码 */
	public final static String STATUS_CODE_SUCCESS = "true";
	/**错误状态码 */
	public final static String STATUS_CODE_ERROR = "false";
	/**session当前用户code */
	public final static String SESSION_USER_CODE = "currUser";
	/**session当前用户token Code */
	public final static String SESSION_TOKEN_CODE = "token";
	/**当前系统code*/
	public final static String SYSTEM_CODE = "sysName";
	/**当前系统名称 */
	public final static String SYSTEM_NAME = "1111";
	
	public final static String LOG_ADD = "添加数据";
	
	public final static String LOG_MODEIFY = "修改数据";
	
	public final static String LOG_REMOVE = "删除数据";
	
	public final static String LOG_LOGIN = "登录系统";
	
	public final static String LOG_LOGINOUT = "退出系统";
}
