package com.jo.sys.code.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.code.bean.CodeAttr;
import com.jo.sys.code.dao.CodeAttrDao;
import com.jo.sys.code.service.CodeAttrService;

@Service
public class CodeAttrServiceImpl extends BaseServiceImpl<CodeAttr> implements CodeAttrService {
	@Autowired
	private CodeAttrDao codeAttrDao;

	@Override
	public BaseDao<CodeAttr> dao() throws Exception {
		return this.codeAttrDao;
	}
	

}
