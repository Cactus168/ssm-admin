package com.jo.sys.button.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.button.bean.Button;
import com.jo.sys.button.dao.ButtonDao;
import com.jo.sys.button.service.ButtonService;
@Service
public class ButtonServiceImpl extends BaseServiceImpl<Button> implements ButtonService {
	@Autowired
	public ButtonDao buttonDao;
	
	@Override
	public BaseDao<Button> dao() throws Exception {
		return this.buttonDao;
	}

}
