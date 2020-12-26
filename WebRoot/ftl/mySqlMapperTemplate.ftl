<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.jo.${packageName}.${objectNameLower}.dao.${objectName}Dao" >
 <insert id="add" parameterType="com.jo.${packageName}.${objectNameLower}.bean.${objectName}" >
     INSERT INTO ${tableTop}${objectNameLower}
       <trim prefix="(" suffix=")" suffixOverrides="," >
	   <#list fieldList as field>
      	 <if test="${field.attrName} != null" >${field.attrName},</if>
	   </#list>
		 <if test="creator != null" >creator,</if>
      	 createDate,
	   </trim>
	   <trim prefix="values (" suffix=")" suffixOverrides="," >
	   <#list fieldList as field>
	     <if test="${field.attrName} != null" >${r"#{"}${field.attrName},jdbcType=${field.jdbcType}${r"}"},</if>
	  </#list>
	     <if test="creator != null" >${r"#{"}creator,jdbcType=INTEGER${r"}"},</if>
	     NOW(),
	  </trim>
 </insert>
 <delete id="remove" parameterType="java.util.Map">
     DELETE FROM ${tableTop}${objectNameLower} WHERE ${objectNameLower}Id IN (${r"${"}ids${r"}"});
 </delete>
 <update id="modify" parameterType="com.jo.${packageName}.${objectNameLower}.bean.${objectName}" >
    UPDATE ${tableTop}${objectNameLower}
       <set>
	   <#list fieldList as field>
	   <#if field.attrEdit == 1>
       	   <if test="${field.attrName} != null" >
	         ${field.attrName} = ${r"#{"}${field.attrName},jdbcType=${field.jdbcType}${r"}"},
	       </if>
	   </#if>
	   </#list>
		   <if test="modify != null" >
	         modify = ${r"#{"}modify,jdbcType=INTEGER${r"}"},
	       </if>
	       modifyDate = NOW(),
      </set>
   WHERE ${objectNameLower}Id = ${r"#{"}${objectNameLower}Id,jdbcType=INTEGER${r"}"}
  </update>
  <select id="queryById" resultType="com.jo.${packageName}.${objectNameLower}.bean.${objectName}" parameterType="java.util.Map" >
    SELECT * FROM ${tableTop}${objectNameLower} WHERE ${objectNameLower}Id = ${r"#{"}${objectNameLower}Id${r"}"}
  </select>
  <select id="queryByList" resultType="com.jo.${packageName}.${objectNameLower}.bean.${objectName}" parameterType="java.util.Map" >
    SELECT 
		*,
	<#if dataView == "treeGrid">  
		parentId AS _parentId,
	</#if>
	f_sys_getUserName(creator) AS creatorName,
	f_sys_getUserName(modify) AS modifyName
	FROM ${tableTop}${objectNameLower} 
    <where>
	<#list fieldList as field>
	<#if field.attrSearch == 1>
       <if test="${field.attrName} != null and ${field.attrName} != '' ">   
	       AND ${field.attrName} like CONCAT('%',${r"#{"}${field.attrName}${r"}"},'%') 
	   </if>
	</#if>  
	</#list> 
    </where>
   ORDER BY ${r"${"}sort${r"}"} ${r"${"}order${r"}"}
   LIMIT ${r"${"}beginRow${r"}"},${r"${"}pageSize${r"}"}
  </select>
  <select id="count" resultType="java.lang.Integer" parameterType="java.util.Map" >
    SELECT COUNT(${objectNameLower}Id) FROM ${tableTop}${objectNameLower} 
    <where>
    <#list fieldList as field>
	<#if field.attrSearch == 1>
       <if test="${field.attrName} != null and ${field.attrName} != '' ">   
	       AND ${field.attrName} like CONCAT('%',${r"#{"}${field.attrName}${r"}"},'%') 
	   </if>
	</#if>  
	</#list> 
   </where>
  </select>
</mapper>