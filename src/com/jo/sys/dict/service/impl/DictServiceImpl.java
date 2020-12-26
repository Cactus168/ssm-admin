package com.jo.sys.dict.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.dict.bean.Dict;
import com.jo.sys.dict.dao.DictDao;
import com.jo.sys.dict.service.DictService;
@Service
public class DictServiceImpl extends BaseServiceImpl<Dict> implements DictService {
	@Autowired
	private DictDao dictDao;

	@Override
	public BaseDao<Dict> dao() throws Exception {
		return this.dictDao;
	}

}
