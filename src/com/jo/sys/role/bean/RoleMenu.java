package com.jo.sys.role.bean;

public class RoleMenu {

	private Integer menuId;
	
	private Integer _parentId;
	
	private String menuName;
	
	private Integer roleId;
	
	private Integer checked;

	/**  
	 * 获取menuId  
	 * @return menuId menuId  
	 */
	public Integer getMenuId() {
		return menuId;
	}

	/**  
	 * 设置menuId  
	 * @param menuId menuId  
	 */
	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
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
	 * 获取menuName  
	 * @return menuName menuName  
	 */
	public String getMenuName() {
		return menuName;
	}

	/**  
	 * 设置menuName  
	 * @param menuName menuName  
	 */
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

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

	/* <p>Title: toString</p>
	 * <p>Description: </p> 
	 * @return 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "RoleMenu [menuId=" + menuId + ", _parentId=" + _parentId
				+ ", menuName=" + menuName + ", roleId=" + roleId
				+ ", checked=" + checked + "]";
	}

	
	
}
