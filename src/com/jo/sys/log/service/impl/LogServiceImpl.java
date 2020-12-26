package com.jo.sys.log.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.log.bean.Log;
import com.jo.sys.log.dao.LogDao;
import com.jo.sys.log.service.LogService;
@Service
public class LogServiceImpl extends BaseServiceImpl<Log> implements LogService {
	@Autowired
	private LogDao logDao;

	@Override
	public BaseDao<Log> dao() throws Exception {
		return this.logDao;
	}
	

}
