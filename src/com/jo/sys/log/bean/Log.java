package com.jo.sys.log.bean;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.jo.commons.CommonDataUtils;
import com.jo.commons.CommonDateUtils;
import com.jo.sys.user.bean.User;

public class Log {
	
	public Log(){};
	
	public Log(User user, Integer menuId, String logContent, HttpServletRequest request){
		this.menuId = menuId;
		this.logContent = logContent;
		this.userId = user.getUserId();
		this.logIp = CommonDataUtils.getIpAddr(request);
		this.logDate = CommonDateUtils.getDate(new Date(), "yyyy-MM-dd HH:mm:ss");
	}
	
	private Integer logId;
	
	private Integer userId;
	
	private String userName;
	
	private String realName;
	
	private String logIp;
	
	private Integer menuId;
	
	private String menuName;
	
	private String logContent;
	
	private String logDate;

	/**  
	 * 获取logId  
	 * @return logId logId  
	 */
	public Integer getLogId() {
		return logId;
	}

	/**  
	 * 设置logId  
	 * @param logId logId  
	 */
	public void setLogId(Integer logId) {
		this.logId = logId;
	}

	/**  
	 * 获取userId  
	 * @return userId userId  
	 */
	public Integer getUserId() {
		return userId;
	}

	/**  
	 * 设置userId  
	 * @param userId userId  
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**  
	 * 获取realName  
	 * @return realName realName  
	 */
	public String getRealName() {
		return realName;
	}

	/**  
	 * 设置realName  
	 * @param realName realName  
	 */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**  
	 * 获取userName  
	 * @return userName userName  
	 */
	public String getUserName() {
		return userName;
	}

	/**  
	 * 设置userName  
	 * @param userName userName  
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**  
	 * 获取logIp  
	 * @return logIp logIp  
	 */
	public String getLogIp() {
		return logIp;
	}

	/**  
	 * 设置logIp  
	 * @param logIp logIp  
	 */
	public void setLogIp(String logIp) {
		this.logIp = logIp;
	}

	/**  
	 * 获取menuId  
	 * @return menuId menuId  
	 */
	public Integer getMenuId() {
		return menuId;
	}

	/**  
	 * 设置menuId  
	 * @param menuId menuId  
	 */
	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

	/**  
	 * 获取menuName  
	 * @return menuName menuName  
	 */
	public String getMenuName() {
		return menuName;
	}

	/**  
	 * 设置menuName  
	 * @param menuName menuName  
	 */
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	/**  
	 * 获取logContent  
	 * @return logContent logContent  
	 */
	public String getLogContent() {
		return logContent;
	}

	/**  
	 * 设置logContent  
	 * @param logContent logContent  
	 */
	public void setLogContent(String logContent) {
		this.logContent = logContent;
	}

	/**  
	 * 获取logDate  
	 * @return logDate logDate  
	 */
	public String getLogDate() {
		return logDate;
	}

	/**  
	 * 设置logDate  
	 * @param logDate logDate  
	 */
	public void setLogDate(String logDate) {
		this.logDate = logDate;
	}
	
}
