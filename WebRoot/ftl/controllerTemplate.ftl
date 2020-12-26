package com.jo.${packageName}.${objectNameLower}.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.${packageName}.${objectNameLower}.bean.${objectName};
import com.jo.${packageName}.${objectNameLower}.service.${objectName}Service;
 /**
 * ${objectName}Controller
 * @author hxk
 * @date ${nowDate?string("yyyy-MM-dd")}
 */
@Controller
@RequestMapping({"${packageName}/${objectNameLower}"})
public class ${objectName}Controller extends BaseController<${objectName}> {

	@Autowired
	private ${objectName}Service ${objectNameLower}Service;
	
	@Override
	protected BaseService<${objectName}> service() {
		return this.${objectNameLower}Service;
	}

}
