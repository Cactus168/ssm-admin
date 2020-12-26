package com.jo.sys.message.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.message.bean.Message;
import com.jo.sys.message.dao.MessageDao;
import com.jo.sys.message.service.MessageService;
@Service
public class MessageServiceImpl extends BaseServiceImpl<Message> implements MessageService {
	@Autowired
	private MessageDao messageDao;

	@Override
	public BaseDao<Message> dao() throws Exception {
		return this.messageDao;
	}
	

}
