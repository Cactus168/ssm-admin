package com.jo.sys.message.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.message.bean.Message;
import com.jo.sys.message.service.MessageService;
@Controller
@RequestMapping({"sys/message"})
public class MessageController extends BaseController<Message> {

	@Autowired
	private MessageService messageService;
	
	@Override
	protected BaseService<Message> service() {
		return this.messageService;
	}

}
