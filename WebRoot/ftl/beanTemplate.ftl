package com.jo.${packageName}.${objectNameLower}.bean;
 /**
 * ${objectName}Bean
 * @author hxk
 * @date ${nowDate?string("yyyy-MM-dd")}
 */
public class ${objectName} {
	/**${objectName}Id**/
	private Integer ${objectNameLower}Id;
<#list fieldList as field>
	/**${field.attrTitle}**/
	private ${field.attrType} ${field.attrName};
</#list>
<#if dataView == "treeGrid"> 
	/**父节点Id**/
	private Integer parentId;
	/**tree插件生成树父节点Id**/
	private Integer _parentId;
	/**父节点名称**/
	private String parentName;
</#if> 
	/**创建人Id**/
	private Integer creator;
	/**创建人名称**/
	private String creatorName;
	/**创建时间**/
	private String createDate;
	/**修改人Id**/
	private Integer modify;
	/**修改人名称**/
	private String modifyName;
	/**修改时间**/
	private String modifyDate;
	/**  
	 * 获取${objectNameLower}Id  
	 * @return ${objectNameLower}Id ${objectNameLower}Id
	 */
	public Integer get${objectName}Id() {
		return ${objectNameLower}Id;
	}

	/**  
	 * 设置${objectNameLower}Id  
	 * @param ${objectNameLower}Id ${objectNameLower}Id
	 */
	public void set${objectName}Id(Integer ${objectNameLower}Id ) {
		this.${objectNameLower}Id  = ${objectNameLower}Id;
	}
<#list fieldList as field>
	/**  
	 * 获取${field.attrTitle}  
	 * @return ${field.attrName} ${field.attrTitle}
	 */
	public ${field.attrType} get${field.attrNameUpper}() {
		return ${field.attrName};
	}

	/**  
	 * 设置${field.attrTitle}  
	 * @param ${field.attrName} ${field.attrTitle}
	 */
	public void set${field.attrNameUpper}(${field.attrType} ${field.attrName}) {
		this.${field.attrName} = ${field.attrName};
	}
</#list>
<#if dataView == "treeGrid"> 
	/**  
	 * 获取父节点Id
	 * @return parentId 父节点Id  
	 */
	public Integer getParentId() {
		return parentId;
	}

	/**  
	 * 设置父节点Id  
	 * @param parentId 父节点Id  
	 */
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	/**  
	 * 获取tree插件生成树父节点Id  
	 * @return _parentId tree插件生成树父节点Id  
	 */
	public Integer get_parentId() {
		return _parentId;
	}

	/**  
	 * 设置tree插件生成树父节点Id  
	 * @param _parentId tree插件生成树父节点Id  
	 */
	public void set_parentId(Integer _parentId) {
		this._parentId = _parentId;
	}

	/**  
	 * 获取父节点名称  
	 * @return parentName 父节点名称  
	 */
	public String getParentName() {
		return parentName;
	}

	/**  
	 * 设置父节点名称  
	 * @param parentName 父节点名称  
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
</#if> 

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
	 * 获取创建人名称 
	 * @return creatorName 创建人名称 
	 */
	public String getCreatorName() {
		return creatorName;
	}

	/**  
	 * 设置创建人名称
	 * @param creatorName 创建人名称 
	 */
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
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
	 * 获取修改人名称
	 * @return modify 修改人名称 
	 */
	public String getModifyName() {
		return modifyName;
	}

	/**  
	 * 设置修改人名称 
	 * @param modify 修改人名称  
	 */
	public void setModifyName(String modifyName) {
		this.modifyName = modifyName;
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
}
