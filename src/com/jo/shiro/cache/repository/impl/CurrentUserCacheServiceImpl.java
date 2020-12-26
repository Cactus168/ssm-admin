package com.jo.shiro.cache.repository.impl;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.jo.shiro.cache.repository.CurrentUserCacheService;
import com.jo.sys.user.bean.User;

/**
 * @author Dylan
 * @time 2013-12-2
 */
public class CurrentUserCacheServiceImpl implements CurrentUserCacheService{
	
	private final static Logger log = LoggerFactory.getLogger(CurrentUserCacheServiceImpl.class);
	
	private Cache<String, User> cache = CacheBuilder.newBuilder().maximumSize(100000).build();
	
	@Override
	public void save(User user) {
		cache.put(user.getUserName(), user);
	}

	@Override
	public User get(final String username) {
		try {
			return cache.get(username, new Callable<User>() {

				@Override
				public User call() throws Exception {
					User user = new User();
					return user;
				}
				
			});
		} catch (ExecutionException e) {
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public void remove(String username) {
		cache.invalidate(username);
	}

}
