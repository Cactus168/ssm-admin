package com.jo.sys.dict.bean;

public class Dict {

	private Integer dictId;
	
	private Integer parentId;
	
	private Integer _parentId;
	
	private String parentName;
	
	private String dictNo;
	
	private String dictName;
	
	private String dictKey;
	
	private String dictValue;
	/**
	 * 编码是否被使用
	 */
	private Integer dictUse;
	/**  
	 * 获取dictId  
	 * @return dictId dictId  
	 */
	public Integer getDictId() {
		return dictId;
	}
	/**  
	 * 设置dictId  
	 * @param dictId dictId  
	 */
	public void setDictId(Integer dictId) {
		this.dictId = dictId;
	}
	/**  
	 * 获取parentId  
	 * @return parentId parentId  
	 */
	public Integer getParentId() {
		return parentId;
	}
	/**  
	 * 设置parentId  
	 * @param parentId parentId  
	 */
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	/**  
	 * 获取_parentId  
	 * @return _parentId _parentId  
	 */
	public Integer get_parentId() {
		return _parentId;
	}
	/**  
	 * 设置_parentId  
	 * @param _parentId _parentId  
	 */
	public void set_parentId(Integer _parentId) {
		this._parentId = _parentId;
	}
	/**  
	 * 获取parentName  
	 * @return parentName parentName  
	 */
	public String getParentName() {
		return parentName;
	}
	/**  
	 * 设置parentName  
	 * @param parentName parentName  
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	/**  
	 * 获取dictNo  
	 * @return dictNo dictNo  
	 */
	public String getDictNo() {
		return dictNo;
	}
	/**  
	 * 设置dictNo  
	 * @param dictNo dictNo  
	 */
	public void setDictNo(String dictNo) {
		this.dictNo = dictNo;
	}
	/**  
	 * 获取dictName  
	 * @return dictName dictName  
	 */
	public String getDictName() {
		return dictName;
	}
	/**  
	 * 设置dictName  
	 * @param dictName dictName  
	 */
	public void setDictName(String dictName) {
		this.dictName = dictName;
	}
	/**  
	 * 获取dictKey  
	 * @return dictKey dictKey  
	 */
	public String getDictKey() {
		return dictKey;
	}
	/**  
	 * 设置dictKey  
	 * @param dictKey dictKey  
	 */
	public void setDictKey(String dictKey) {
		this.dictKey = dictKey;
	}
	/**  
	 * 获取dictValue  
	 * @return dictValue dictValue  
	 */
	public String getDictValue() {
		return dictValue;
	}
	/**  
	 * 设置dictValue  
	 * @param dictValue dictValue  
	 */
	public void setDictValue(String dictValue) {
		this.dictValue = dictValue;
	}
	/**  
	 * 获取编码是否被使用  
	 * @return dictUse 编码是否被使用  
	 */
	public Integer getDictUse() {
		return dictUse;
	}
	/**  
	 * 设置编码是否被使用  
	 * @param dictUse 编码是否被使用  
	 */
	public void setDictUse(Integer dictUse) {
		this.dictUse = dictUse;
	}
}
