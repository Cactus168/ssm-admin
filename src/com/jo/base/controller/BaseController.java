package com.jo.base.controller;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.jo.base.service.BaseService;
import com.jo.commons.CommonConstants;
import com.jo.commons.CommonDataUtils;
import com.jo.commons.CommonExcelUtils;
import com.jo.commons.CommonFileUtils;
import com.jo.commons.CommonJsonUtils;
import com.jo.commons.SpringContextUtils;
import com.jo.core.service.CoreService;
import com.jo.sys.dict.bean.Dict;

/**
 * Controller控制基类
 * @author Administrator
 */
@Controller
public abstract class BaseController<T> {

	@Autowired
	public CoreService coreService;
	
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeBrowse(ModelMap model, Map<String, Object> params) throws Exception{
		model.put("buttons", this.coreService.getButtonsByMenuId(params));
		List<Dict> dicts = this.coreService.getDictsByMenuId(params);
		for(Dict dict : dicts){
			if(CommonConstants.TREE_PARENT_VALUE == dict.getParentId()){
				model.put(dict.getDictNo(),CommonDataUtils.subList(dicts, "parentId = "+dict.getDictId()));
			}
		}
	}
	/**
	 * 跳转到模块的首页
	 * @param t
	 * @param request
	 * @return
	 */
	@RequestMapping({"/browse.shtml"})
	public void browse(ModelMap model, HttpServletRequest request){
		try {
			Map<String, Object> params = this.getParams(request);
			this.beforeBrowse(model, params);
			model.putAll(params);
			this.afterBrowse(model, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 在将要执行跳转后方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void afterBrowse(ModelMap model, Map<String, Object> params) throws Exception{}
	/**
	 * 在将要返回列表数据前执行此方法
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeList(Map<String, Object> params, Map<String, Object> rsMap) throws Exception{}
	/**
	 * 获取数据列表
	 * @param t
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping({"/list.shtml"})
	public Map<String, Object> list(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			this.beforeList(params, rsMap);
			rsMap.put("rows", this.service().queryByList(params));
			rsMap.put("total", this.service().count(params));
			this.afterList(params, rsMap);
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	/**
	 * 获取数据
	 * @param t
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping({"/queryById.shtml"})
	public T queryById(HttpServletRequest request){
		T t = null;
		try {
			t = this.service().queryById(this.getParams(request));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	/**
	 * 在将要返回列表数据前执行此方法
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void afterList(Map<String, Object> params, Map<String, Object> rsMap) throws Exception{}
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeAdd(T t, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping({"/add.shtml"})
	public Map<String, Object> add(T t, HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			CommonJsonUtils.newfor(params, t.getClass());
			this.beforeAdd(t, rsMap);
			int isSuccess = this.service().add(t);
			if(isSuccess > 0){
				this.afterAdd(t, rsMap);
				rsMap.put("success", Boolean.valueOf(true));
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "数据添加失败！");
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void afterAdd(T t, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeModify(T t, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping({"/modify.shtml"})
	public Map<String, Object> modify(T t, HttpServletRequest request) {
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			CommonJsonUtils.newfor(params, t.getClass());
			this.beforeModify(t, rsMap);
			int isSuccess = this.service().modify(t);
			if(isSuccess > 0){
				this.afterModify(t, rsMap);
				rsMap.put("success", Boolean.valueOf(true));
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "数据修改失败！");
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void afterModify(T t, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeRemove(Map<String, Object> params, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping({"/remove.shtml"})
	public Map<String, Object> remove(HttpServletRequest request) {
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			this.beforeRemove(params, rsMap);
			int isSuccess = this.service().remove(params);
			if(isSuccess > 0){
				this.afterRemove(params, rsMap);
				rsMap.put("success", Boolean.valueOf(true));
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "数据删除失败！");
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	/**
	 * 在将要执行删除执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void afterRemove(Map<String, Object> params, Map<String, Object> rsMap) throws Exception{};
	/**
	 * 在将要执行文件下载前执行方法
	 * @author huixiaoke
	 * @date 2017-2-15
	 */
	protected void beforeDownload(Map<String, Object> params) throws Exception{};
	/**
	 * 文件下载
	 * @param response 
	 * @param filePath		//文件完整路径(包括文件名和扩展名)
	 * @param fileName		//下载后看到的文件名
	 * @author huixiaoke
	 * @date 2017-2-15
	 */
	@RequestMapping({"/download"})
	public void download(HttpServletRequest request, HttpServletResponse response) {
		OutputStream outputStream = null;  
		try {
			outputStream = new BufferedOutputStream(response.getOutputStream());
			Map<String, Object> params = this.getParams(request);
			this.beforeDownload(params);
			byte[] data = CommonFileUtils.toByteArray2(params.get("filePath").toString());  
			response.reset();  
			response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(params.get("fileName").toString(), "UTF-8") + "\"");  
			response.addHeader("Content-Length", "" + data.length);  
			response.setContentType("application/octet-stream;charset=UTF-8");  
			outputStream.write(data);  
			outputStream.flush();  
			outputStream.close();
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(outputStream != null){
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 在将要执行导入excel前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected void beforeImportExcel(Map<String, Object> params) throws Exception{};
	
	/**
	 * 导入excel数据
	 * @Description:TODO
	 * @param file
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @exception:
	 * @author: hxk
	 * @time:2017-12-25 上午10:55:07
	 */
	@ResponseBody
	@SuppressWarnings("unchecked")
	@RequestMapping("/importExcel.shtml")
	public Map<String, Object> importExcel(@RequestParam MultipartFile file, T t, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			this.beforeImportExcel(params);
			String attrs = (String)((Map<String, Object>)SpringContextUtils.getBean("execlConfig")).get(params.get("modNo"));
			CommonExcelUtils<T> excelUtil = new CommonExcelUtils<T>(file);
			List<T> datas = excelUtil.readExcel(t, params, attrs);
			for(T tt : datas){
				this.service().add(tt);
			}
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	/**
	 * 获取request传递的参数
	 * @param request
	 * @return
	 * @throws Exception
	 */
	protected Map<String, Object> getParams(HttpServletRequest request) throws Exception{
		Map<String, String[]>  pms = request.getParameterMap();
		Map<String, Object> returnPms = new HashMap<String, Object>();
		String name = "", value = "";
		for(Map.Entry<String, String[]> entry : pms.entrySet()){
			name = entry.getKey();
			if(entry.getValue() != null){
				if ((entry.getValue() instanceof String[])){
					for(int i = 0; i < entry.getValue().length; i++){
				         value = entry.getValue()[i] + ",";
				    }
					value = value.substring(0, value.length() - 1);
				}
			}
			returnPms.put(name, value.trim());
		}
		if((returnPms.get("page") != null) && (returnPms.get("rows") != null)){
			returnPms.put("beginRow", Integer.valueOf((Integer.parseInt(String.valueOf(returnPms.get("page"))) - 1) * Integer.parseInt(String.valueOf(returnPms.get("rows")))));
			returnPms.put("pageSize", returnPms.get("rows"));
		}
		return returnPms;
	}

	/**
	 * 在将要执行跳转前执行方法
	 * 该方法主要是为了方便初始化一下参数
	 * @param t
	 * @param params
	 * @throws Exception
	 */
	protected abstract BaseService<T> service();
}
