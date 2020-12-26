package com.jo.shiro.cache;

import org.apache.shiro.cache.AbstractCacheManager;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;

/**
 * @author Dylan
 * @time 2014年1月6日
 */
@SuppressWarnings("rawtypes")
public class ShiroCacheManager extends AbstractCacheManager {

	@Override
	protected Cache createCache(String cacheName) throws CacheException {
		return new ShiroCache<Object, Object>(cacheName);
	}

}
