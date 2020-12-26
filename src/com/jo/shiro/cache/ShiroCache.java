package com.jo.shiro.cache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import com.jo.shiro.cache.repository.CacheRepository;
import com.jo.shiro.cache.repository.impl.LocalCacheOperations;

/**
 * @author Dylan
 * @time 2014年1月6日
 * @param <K>
 * @param <V>
 */
@SuppressWarnings("unchecked")
public class ShiroCache<K,V> implements Cache<K, V>  {
	
	private CacheRepository cache;
	
	private String CACHE_PREFIX;
	
	public ShiroCache(String cacheName){
		CACHE_PREFIX = cacheName+"-";
	}
	
	@Override
	public V get(K key) throws CacheException {
		V value = ((V)getCache().get(keyToString(key)));
		return value;
	}

	@Override
	public V put(K key, V value) throws CacheException {
		getCache().save(keyToString(key), value);
		return value;
	}

	@Override
	public V remove(K key) throws CacheException {
		V value = get(key);
		getCache().remove(keyToString(key));
		return value;
	}

	@Override
	public void clear() throws CacheException {
		for(Iterator<K> keys =keys().iterator();keys.hasNext();){
			K key = keys.next();
			remove(key);
		}
	}

	@Override
	public int size() {
		return keys().size();
	}

	@Override
	public Set<K> keys() {
		Set<String> keys = new HashSet<String>();
		for(String key : getCache().keys()){
			if(StringUtils.startsWith(key, CACHE_PREFIX)){
				keys.add(key);
			}
		}
		return (Set<K>)keys ;
	}

	@Override
	public Collection<V> values() {
		List<V> values = new ArrayList<V>();
		for(Iterator<K> keys =keys().iterator();keys.hasNext();){
			K key = keys.next();
			V value = getValue(key);
			values.add(value);
		}
		return values;
	}
	
	private V getValue(K key) throws CacheException {
		V value = ((V)getCache().get(String.valueOf(key)));
		return value;
	}
	
	private String keyToString(K key){
		String k = String.valueOf(key);
		if(StringUtils.startsWith(k, CACHE_PREFIX)){
			return k;
		}
		return CACHE_PREFIX+k;
	}

	public CacheRepository getCache() {
		if(null == cache){
			cache = new LocalCacheOperations();
		}
		return cache;
	}

	public void setCache(CacheRepository cache) {
		this.cache = cache;
	}

}
