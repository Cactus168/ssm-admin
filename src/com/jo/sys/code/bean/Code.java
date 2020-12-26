package com.jo.sys.code.bean;

public class Code {
	/**id*/
	private Integer codeId;
	/**上级包名（例如:com.jo.xxx 中的xxx）*/
	private String packageName;
	/**处理类名*/
	private String objectName;
	/**表前缀（如：sys_）*/
	private String tableTop;
	/**数据展示*/
	private String dataView;
	/**数据选取*/
	private Integer dataSelect;
	/**  
	 * 获取id  
	 * @return codeId id  
	 */
	public Integer getCodeId() {
		return codeId;
	}
	/**  
	 * 设置id  
	 * @param codeId id  
	 */
	public void setCodeId(Integer codeId) {
		this.codeId = codeId;
	}
	/**  
	 * 获取上级包名（例如:com.jo.xxx中的xxx）  
	 * @return packageName 上级包名（例如:com.jo.xxx中的xxx）  
	 */
	public String getPackageName() {
		return packageName;
	}
	/**  
	 * 设置上级包名（例如:com.jo.xxx中的xxx）  
	 * @param packageName 上级包名（例如:com.jo.xxx中的xxx）  
	 */
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}
	/**  
	 * 获取处理类名  
	 * @return objectName 处理类名  
	 */
	public String getObjectName() {
		return objectName;
	}
	/**  
	 * 设置处理类名  
	 * @param objectName 处理类名  
	 */
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	/**  
	 * 获取表前缀（如：sys_）  
	 * @return tableTop 表前缀（如：sys_）  
	 */
	public String getTableTop() {
		return tableTop;
	}
	/**  
	 * 设置表前缀（如：sys_）  
	 * @param tableTop 表前缀（如：sys_）  
	 */
	public void setTableTop(String tableTop) {
		this.tableTop = tableTop;
	}
	/**  
	 * 获取数据展示  
	 * @return dataView 数据展示  
	 */
	public String getDataView() {
		return dataView;
	}
	/**  
	 * 设置数据展示  
	 * @param dataView 数据展示  
	 */
	public void setDataView(String dataView) {
		this.dataView = dataView;
	}
	/**  
	 * 获取数据选取  
	 * @return dataSelect 数据选取  
	 */
	public Integer getDataSelect() {
		return dataSelect;
	}
	/**  
	 * 设置数据选取  
	 * @param dataSelect 数据选取  
	 */
	public void setDataSelect(Integer dataSelect) {
		this.dataSelect = dataSelect;
	}
}
