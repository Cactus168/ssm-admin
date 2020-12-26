package com.jo.sys.log.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.log.bean.Log;
import com.jo.sys.log.service.LogService;
@Controller
@RequestMapping({"sys/log"})
public class LogController extends BaseController<Log> {

	@Autowired
	private LogService logService;
	
	@Override
	protected BaseService<Log> service() {
		return this.logService;
	}

}
