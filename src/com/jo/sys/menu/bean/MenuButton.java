package com.jo.sys.menu.bean;

public class MenuButton {
	
	private Integer buttonId;
	
	private Integer _parentId;

	private String buttonName;
	
	private Integer menuId;
	
	private Integer checked;
	
	private Integer buttonUse;

	/**  
	 * 获取buttonId  
	 * @return buttonId buttonId  
	 */
	public Integer getButtonId() {
		return buttonId;
	}

	/**  
	 * 设置buttonId  
	 * @param buttonId buttonId  
	 */
	public void setButtonId(Integer buttonId) {
		this.buttonId = buttonId;
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
	 * 获取buttonName  
	 * @return buttonName buttonName  
	 */
	public String getButtonName() {
		return buttonName;
	}

	/**  
	 * 设置buttonName  
	 * @param buttonName buttonName  
	 */
	public void setButtonName(String buttonName) {
		this.buttonName = buttonName;
	}

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

	/**  
	 * 获取buttonUse  
	 * @return buttonUse buttonUse  
	 */
	public Integer getButtonUse() {
		return buttonUse;
	}

	/**  
	 * 设置buttonUse  
	 * @param buttonUse buttonUse  
	 */
	public void setButtonUse(Integer buttonUse) {
		this.buttonUse = buttonUse;
	}

}
