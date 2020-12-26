package com.jo.sys.code.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.code.bean.Code;
import com.jo.sys.code.dao.CodeDao;
import com.jo.sys.code.service.CodeService;
@Service
public class CodeServiceImpl extends BaseServiceImpl<Code> implements CodeService {
	@Autowired
	private CodeDao codeDao;

	@Override
	public BaseDao<Code> dao() throws Exception {
		return this.codeDao;
	}
	

}
