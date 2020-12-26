package com.jo.sys.organ.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.organ.bean.Organ;
import com.jo.sys.organ.dao.OrganDao;
import com.jo.sys.organ.service.OrganService;
@Service
public class OrganServiceImpl extends BaseServiceImpl<Organ> implements OrganService {
	@Autowired
	private OrganDao organDao;

	@Override
	public BaseDao<Organ> dao() throws Exception {
		return this.organDao;
	}
	
}
