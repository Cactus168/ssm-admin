package com.jo.commons;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;

import com.google.gson.JsonParseException;

/**
 * @author loudyn
 */
public class CommonJsonUtils {
	private final static ObjectMapper MAPPER = new ObjectMapper();

	static {
		MAPPER.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		MAPPER.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		MAPPER.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		MAPPER.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
	}

	/**
	 * @param bean
	 * @return
	 */
	public static String toJsonString(Object bean) {
		try {
			return MAPPER.writeValueAsString(bean);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	/**
	 * 从一个JSON 对象字符格式中得到一个java对象  
	 * @param <T>
	 * @param jsonString
	 * @param clazz
	 * @return
	 */
	public static <T> T fromJsonString(String jsonString, Class<T> clazz) {
		try {
			return MAPPER.readValue(jsonString, clazz);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	/**
	 * 从一个对象得到一个java对象  
	 * @param <T>
	 * @param jsonString
	 * @param clazz
	 * @return
	 */
	public static <T> T fromJsonObj(Object obj, Class<T> clazz) {
		try {
			return MAPPER.readValue(toJsonString(obj), clazz);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	
	/**
	 * 
	 * @param bean
	 * @param clazz
	 * @return
	 */
	public static <T> T newfor(Object bean, Class<T> clazz) {
		try {

			return MAPPER.convertValue(bean, clazz);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	/**
	 * 判断是否为json
	 * @Description:TODO
	 * @param json
	 * @return
	 * boolean
	 * @exception:
	 * @author: hxk
	 * @time:2017-12-26 上午11:20:53
	 */
	public static boolean isJson(Object json){
		if(json == null){
			return false;
		}else{
			if (StringUtils.isBlank(json.toString())) {  
	            return false;  
	        }  
	        try {  
	        	new com.google.gson.JsonParser().parse(json.toString());  
	            return true;   
	        } catch (JsonParseException e) {  
	            return false;  
	        } 
		}
	}
	
	public static <T> List<T> toList(String json, Class<T> clazz) {
		try {
			return MAPPER.readValue(json, MAPPER.getTypeFactory().constructCollectionType(List.class, clazz));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	private CommonJsonUtils() {}
}