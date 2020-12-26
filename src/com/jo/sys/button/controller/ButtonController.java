package com.jo.sys.button.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.button.bean.Button;
import com.jo.sys.button.service.ButtonService;
@Controller
@RequestMapping({"sys/button"})
public class ButtonController extends BaseController<Button> {

	@Autowired
	public ButtonService buttonService;

	@Override
	protected BaseService<Button> service() {
		return buttonService;
	}

}
