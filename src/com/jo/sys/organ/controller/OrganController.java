package com.jo.sys.organ.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.organ.bean.Organ;
import com.jo.sys.organ.service.OrganService;
@Controller
@RequestMapping({"sys/organ"})
public class OrganController extends BaseController<Organ> {

	@Autowired
	private OrganService organService;
	
	@Override
	protected BaseService<Organ> service() {
		return this.organService;
	}

}
