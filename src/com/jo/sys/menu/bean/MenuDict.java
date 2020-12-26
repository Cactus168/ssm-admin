package com.jo.sys.menu.bean;

public class MenuDict {

	private Integer dictId;
	
	private Integer _parentId;
	
	private String dictName;
	
	private Integer menuId;
	
	private Integer checked;

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
}
