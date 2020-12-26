package com.jo.sys.code.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.code.bean.CodeAttr;
import com.jo.sys.code.service.CodeAttrService;

@Controller
@RequestMapping({"sys/codeAttr"})
public class CodeAttrController extends BaseController<CodeAttr> {

	@Autowired
	private CodeAttrService codeAttrService;
	
	@Override
	protected BaseService<CodeAttr> service() {
		return this.codeAttrService;
	}

}
