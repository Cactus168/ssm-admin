package com.jo.sys.user.bean;

public class UserRole {

	private Integer roleId;
	
	private Integer _parentId;
	
	private String roleName;
	
	private String roleContent;
	
	private Integer userId;
	
	private Integer checked;

	/**  
	 * 获取roleId  
	 * @return roleId roleId  
	 */
	public Integer getRoleId() {
		return roleId;
	}

	/**  
	 * 设置roleId  
	 * @param roleId roleId  
	 */
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
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
	 * 获取roleName  
	 * @return roleName roleName  
	 */
	public String getRoleName() {
		return roleName;
	}

	/**  
	 * 设置roleName  
	 * @param roleName roleName  
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	/**  
	 * 获取roleContent  
	 * @return roleContent roleContent  
	 */
	public String getRoleContent() {
		return roleContent;
	}

	/**  
	 * 设置roleContent  
	 * @param roleContent roleContent  
	 */
	public void setRoleContent(String roleContent) {
		this.roleContent = roleContent;
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
