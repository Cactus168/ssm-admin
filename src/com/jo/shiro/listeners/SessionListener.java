package com.jo.shiro.listeners;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**监听session的销毁
 * @author Dylan
 * @time 2013-8-15
 */
public class SessionListener extends SessionListenerAdapter {

	/**
	 * session创建
	 */
	@Override
	public void onStart(Session session) {
		//do noting...
		System.out.println("session 创建");
	}

	/**
	 * session销毁
	 */
	@Override
	public void onStop(Session session) {
		System.out.println("session 销毁");
		//do noting...
		/*String username = ShiroSecurityHelper.getCurrentUsername();
		if(StringUtils.isNotBlank(username)){
			shiroOperations.clearCachedAuthorizationInfo(username);
			LOG.debug("session 销毁，清理用户【"+username+"】权限缓存信息");
		}*/
		
	}

	
}
