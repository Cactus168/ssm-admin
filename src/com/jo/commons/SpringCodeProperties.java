package com.jo.commons;
import java.util.Enumeration;
import java.util.Properties;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

public class SpringCodeProperties extends PropertyPlaceholderConfigurer{
   protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props) throws BeansException{
	   Enumeration<Object> en = props.keys();
	   while(en.hasMoreElements()){
		   String key = en.nextElement().toString();
		   String value = props.getProperty(key);
	       try{
	    	   String decodeValue = CommonCodeUtils.decode(props.getProperty(key));
	    	   props.setProperty(key, decodeValue);
	       }catch (Exception ex){
	         props.setProperty(key, value);
	       }
	   }
	   super.processProperties(beanFactory, props);
   }
 }