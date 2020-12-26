package com.jo.sys.user.bean;

public class UserOrgan {

	private Integer organId;
	
	private Integer _parentId;
	
	private String parentName;
	
	private String organNo;
	
	private String organName;
	
	private String organContent;
	
	private Integer userId;
	
	private Integer checked;

	/**  
	 * 获取organId  
	 * @return organId organId  
	 */
	public Integer getOrganId() {
		return organId;
	}

	/**  
	 * 设置organId  
	 * @param organId organId  
	 */
	public void setOrganId(Integer organId) {
		this.organId = organId;
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
	 * 获取organNo  
	 * @return organNo organNo  
	 */
	public String getOrganNo() {
		return organNo;
	}

	/**  
	 * 设置organNo  
	 * @param organNo organNo  
	 */
	public void setOrganNo(String organNo) {
		this.organNo = organNo;
	}

	/**  
	 * 获取organName  
	 * @return organName organName  
	 */
	public String getOrganName() {
		return organName;
	}

	/**  
	 * 设置organName  
	 * @param organName organName  
	 */
	public void setOrganName(String organName) {
		this.organName = organName;
	}

	/**  
	 * 获取organContent  
	 * @return organContent organContent  
	 */
	public String getOrganContent() {
		return organContent;
	}

	/**  
	 * 设置organContent  
	 * @param organContent organContent  
	 */
	public void setOrganContent(String organContent) {
		this.organContent = organContent;
	}

	/**  
	 * 获取userId  
	 * @return userId userId  
	 */
	public Integer getUserId() {
		return userId;
	}

	/**  
	 * 设置userId  
	 * @param userId userId  
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**  
	 * 获取checked  
	 * @return checked checked  
	 */
	public Integer getChecked() {
		return checked;
	}

	/**  
	 * 设置checked  
	 * @param checked checked  
	 */
	public void setChecked(Integer checked) {
		this.checked = checked;
	}
	
}
