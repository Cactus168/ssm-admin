package com.jo.sys.code.controller;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.commons.CommonDataUtils;
import com.jo.commons.CommonFileUtils;
import com.jo.sys.code.bean.Code;
import com.jo.sys.code.service.CodeAttrService;
import com.jo.sys.code.service.CodeService;

import freemarker.template.Configuration;
import freemarker.template.Template;
@Controller
@RequestMapping({"sys/code"})
public class CodeController extends BaseController<Code> {

	@Autowired
	private CodeService codeService;
	
	@Autowired
	private CodeAttrService codeAttrService;
	
	@Override
	protected void beforeRemove(Map<String, Object> params, Map<String, Object> rsMap) throws Exception {
		this.codeAttrService.remove(params);
	}

	/**
	 * ็ๆไปฃ็ 
	 * @param t
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping({"/create.shtml"})
	public Map<String, Object> create(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			String packageName = params.get("packageName").toString();
			String objectName = params.get("objectName").toString();
			String tableTop = params.get("tableTop").toString();
			String dataView = params.get("dataView").toString();
			String dataSelect = params.get("dataSelect").toString();
			String objectNameLower =  CommonDataUtils.initialsLower(objectName);
			String fieldJsonStr = params.get("fieldList").toString();
			String treeFieldName = params.get("treeFieldName").toString();
			JSONArray jsonArry = JSONArray.fromObject(fieldJsonStr);
			for(int i = 0; i < jsonArry.size(); i++){
				JSONObject obj = jsonArry.getJSONObject(i);
				obj.put("attrNameUpper", CommonDataUtils.initialsUpper(obj.get("attrName").toString()));
				obj.put("jdbcType", CommonDataUtils.javaTypeToJdbcType(obj.get("attrType").toString()));
			}
			Map<String,Object> root = new HashMap<String,Object>();		//ๅๅปบๆฐๆฎๆจกๅ
			root.put("fieldList", jsonArry);
			root.put("packageName", packageName);						//ๅๅ
			root.put("dataView", dataView);	
			root.put("dataSelect", dataSelect);	
			root.put("objectName", objectName);                          //็ฑปๅ
			root.put("objectNameLower", objectNameLower);		//็ฑปๅ(ๅจๅฐๅ)
			root.put("objectNameUpper", objectName.toUpperCase());		//็ฑปๅ(ๅจๅคงๅ)
			root.put("tableTop", "t_"+tableTop);								//่กจๅ็ผ	
			root.put("nowDate", new Date());
			root.put("attrTreeField", treeFieldName);
			String ftlPath = request.getSession().getServletContext().getRealPath("")+"/ftl";//ๆจกๆฟ่ทฏๅพ
			String filePath = request.getSession().getServletContext().getRealPath("")+"/temp/code/";//ๅญๆพ่ทฏๅพ
			String zipPath = request.getSession().getServletContext().getRealPath("")+"/temp/zip/";//ๅญๆพ่ทฏๅพ
			CommonFileUtils.delAllFile(filePath);
			String jsPath = filePath+"jsp/"+packageName+"/"+objectNameLower+"/";
			String jspPath = filePath+"jsp/"+packageName+"/"+objectNameLower+"/";
			String daoPath = filePath+packageName+"/"+objectNameLower+"/dao/";
			String beanPath = filePath+packageName+"/"+objectNameLower+"/bean/";
			String mysqlPath = filePath+packageName+"/"+objectNameLower+"/mysql/";
			String mapperPath = filePath+packageName+"/"+objectNameLower+"/mapper/";
			String servicePath = filePath+packageName+"/"+objectNameLower+"/service/";
			String controllerPath = filePath+packageName+"/"+objectNameLower+"/controller/";
			String serviceImplPath = filePath+packageName+"/"+objectNameLower+"/service/impl/";
			freeMarkerPrintFile(root, ftlPath, "jspBrowseTemplate.ftl", jspPath, "browse.jsp");
			freeMarkerPrintFile(root, ftlPath, "beanTemplate.ftl", beanPath, objectName+".java");
			freeMarkerPrintFile(root, ftlPath, "mysqlTemplate.ftl", mysqlPath, objectName+".sql");
			freeMarkerPrintFile(root, ftlPath, "daoTemplate.ftl", daoPath, objectName+"Dao.java");
			freeMarkerPrintFile(root, ftlPath, "jsActionTemplate.ftl", jsPath, objectNameLower+"Action.js");
			freeMarkerPrintFile(root, ftlPath, "serviceTemplate.ftl", servicePath, objectName+"Service.java");
			freeMarkerPrintFile(root, ftlPath, "mySqlMapperTemplate.ftl", mapperPath, objectName+"Mapper.xml");
			freeMarkerPrintFile(root, ftlPath, "controllerTemplate.ftl", controllerPath, objectName+"Controller.java");
			freeMarkerPrintFile(root, ftlPath, "serviceImplTemplate.ftl", serviceImplPath, objectName+"ServiceImpl.java");
			CommonFileUtils.zipFile(filePath, zipPath, "code.zip", "");
			rsMap.put("success", Boolean.valueOf(true));
			rsMap.put("filePath", zipPath+"code.zip");
			rsMap.put("fileName", "code.zip");
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}

	public void freeMarkerPrintFile(Map<String, Object> root, String ftlPath, String ftlName, String filePath, String fileName){
		Writer out = null;
		try {
			System.out.println(">>>>>ๅกซๅๆจก็ใ"+ftlName+"ใๆฐๆฎ<<<<<");
			CommonFileUtils.isFolderExitAndCreate(filePath);
			out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filePath+fileName), "utf-8"));
			Configuration cfg = new Configuration();  												//้่ฟFreemaker็Configuration่ฏปๅ็ธๅบ็ftl
			cfg.setEncoding(Locale.CHINA, "utf-8");
			cfg.setDirectoryForTemplateLoading(new File(ftlPath));		//่ฎพๅฎๅปๅช้่ฏปๅ็ธๅบ็ftlๆจกๆฟๆไปถ
			Template temp = cfg.getTemplate(ftlName);
			temp.process(root, out);					//ๆจก็่พๅบ
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(out != null){
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	@Override
	protected BaseService<Code> service() {
		return this.codeService;
	}

}
