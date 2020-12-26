package com.jo.${packageName}.${objectNameLower}.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.${packageName}.${objectNameLower}.bean.${objectName};
import com.jo.${packageName}.${objectNameLower}.dao.${objectName}Dao;
import com.jo.${packageName}.${objectNameLower}.service.${objectName}Service;
 /**
 * ${objectName}ServiceImpl
 * @author hxk
 * @date ${nowDate?string("yyyy-MM-dd")}
 */
@Service
public class ${objectName}ServiceImpl extends BaseServiceImpl<${objectName}> implements ${objectName}Service {
	@Autowired
	private ${objectName}Dao ${objectNameLower}Dao;

	@Override
	public BaseDao<${objectName}> dao() throws Exception {
		return this.${objectNameLower}Dao;
	}

}
