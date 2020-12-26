package com.jo.sys.menu.bean;

public class Menu{

	private Integer menuId;
	
	private Integer parentId;
	
	private Integer _parentId;
	
	private String parentName;
	
	private String menuNo;
	
	private String menuName;
	
	private String menuIcon;
	
	private String menuUrl;
	
	private String menuOrder;
	
	private String menuStatus;
	
	private String menuRemark;
	
	private Integer menuType;
	/**
	 * 菜单是否被使用
	 */
	private Integer menuUse;
	
	/**创建人**/
	private Integer creator;
	/**创建时间**/
	private String createDate;
	/**修改人**/
	private Integer modify;
	/**修改时间**/
	private String modifyDate;

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

	public String getMenuNo() {
		return menuNo;
	}

	public void setMenuNo(String menuNo) {
		this.menuNo = menuNo;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public String getMenuOrder() {
		return menuOrder;
	}

	public void setMenuOrder(String menuOrder) {
		this.menuOrder = menuOrder;
	}

	public String getMenuStatus() {
		return menuStatus;
	}

	public void setMenuStatus(String menuStatus) {
		this.menuStatus = menuStatus;
	}

	public String getMenuRemark() {
		return menuRemark;
	}

	public void setMenuRemark(String menuRemark) {
		this.menuRemark = menuRemark;
	}

	/**  
	 * 获取parentId  
	 * @return parentId parentId  
	 */
	public Integer getParentId() {
		return parentId;
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
	 * 设置parentId  
	 * @param parentId parentId  
	 */
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
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
	 * 获取menuType  
	 * @return menuType menuType  
	 */
	public Integer getMenuType() {
		return menuType;
	}

	/**  
	 * 设置menuType  
	 * @param menuType menuType  
	 */
	public void setMenuType(Integer menuType) {
		this.menuType = menuType;
	}

	/**  
	 * 获取创建人  
	 * @return creator 创建人  
	 */
	public Integer getCreator() {
		return creator;
	}

	/**  
	 * 设置创建人  
	 * @param creator 创建人  
	 */
	public void setCreator(Integer creator) {
		this.creator = creator;
	}

	/**  
	 * 获取创建时间  
	 * @return createDate 创建时间  
	 */
	public String getCreateDate() {
		return createDate;
	}

	/**  
	 * 设置创建时间  
	 * @param createDate 创建时间  
	 */
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	/**  
	 * 获取修改人  
	 * @return modify 修改人  
	 */
	public Integer getModify() {
		return modify;
	}

	/**  
	 * 设置修改人  
	 * @param modify 修改人  
	 */
	public void setModify(Integer modify) {
		this.modify = modify;
	}

	/**  
	 * 获取修改时间  
	 * @return modifyDate 修改时间  
	 */
	public String getModifyDate() {
		return modifyDate;
	}

	/**  
	 * 设置修改时间  
	 * @param modifyDate 修改时间  
	 */
	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	/**  
	 * 获取菜单是否被使用  
	 * @return menuUse 菜单是否被使用  
	 */
	public Integer getMenuUse() {
		return menuUse;
	}

	/**  
	 * 设置菜单是否被使用  
	 * @param menuUse 菜单是否被使用  
	 */
	public void setMenuUse(Integer menuUse) {
		this.menuUse = menuUse;
	}

	
}
