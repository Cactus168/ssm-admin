package com.jo.shiro.cache.repository;

import org.springframework.stereotype.Service;

import com.jo.sys.user.bean.User;

/**
 * @author Dylan
 * @time 2013-12-2
 */
@Service
public interface CurrentUserCacheService {

	/**
	 * @param user
	 */
	void save(User user);
	
	
	/**
	 * @param username
	 * @return
	 */
	User get(String username);
	
	/**
	 * 
	 */
	void remove(String username);
}
