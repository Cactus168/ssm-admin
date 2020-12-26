package com.jo.sys.role.bean;

public class Role {

	private Integer roleId;
	private String roleName;
	private String roleContent;
	private Integer creator;
	private String createDate;
	private Integer modify;
	private String modifyDate;
	private Integer roleUse;//该角色是否被使用
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
	 * 获取creator  
	 * @return creator creator  
	 */
	public Integer getCreator() {
		return creator;
	}
	/**  
	 * 设置creator  
	 * @param creator creator  
	 */
	public void setCreator(Integer creator) {
		this.creator = creator;
	}
	/**  
	 * 获取createDate  
	 * @return createDate createDate  
	 */
	public String getCreateDate() {
		return createDate;
	}
	/**  
	 * 设置createDate  
	 * @param createDate createDate  
	 */
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	/**  
	 * 获取modify  
	 * @return modify modify  
	 */
	public Integer getModify() {
		return modify;
	}
	/**  
	 * 设置modify  
	 * @param modify modify  
	 */
	public void setModify(Integer modify) {
		this.modify = modify;
	}
	/**  
	 * 获取modifyDate  
	 * @return modifyDate modifyDate  
	 */
	public String getModifyDate() {
		return modifyDate;
	}
	/**  
	 * 设置modifyDate  
	 * @param modifyDate modifyDate  
	 */
	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}
	/**  
	 * 获取roleUse  
	 * @return roleUse roleUse  
	 */
	public Integer getRoleUse() {
		return roleUse;
	}
	/**  
	 * 设置roleUse  
	 * @param roleUse roleUse  
	 */
	public void setRoleUse(Integer roleUse) {
		this.roleUse = roleUse;
	}
	
}
