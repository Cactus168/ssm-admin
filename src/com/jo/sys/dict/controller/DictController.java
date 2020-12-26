package com.jo.sys.dict.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.dict.bean.Dict;
import com.jo.sys.dict.service.DictService;
@Controller
@RequestMapping({"sys/dict"})
public class DictController extends BaseController<Dict> {

	@Autowired
	private DictService dictService;
	
	@Override
	protected BaseService<Dict> service() {
		return this.dictService;
	}

}
