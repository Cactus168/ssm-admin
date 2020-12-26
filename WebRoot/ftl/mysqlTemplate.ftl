SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `${tableTop}${objectNameLower}`
-- ----------------------------
DROP TABLE IF EXISTS `${tableTop}${objectNameLower}`;
CREATE TABLE `${tableTop}${objectNameLower}` (
 		`${objectNameLower}Id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
	<#if dataView == "treeGrid">
		`parentId` INT(11) NULL DEFAULT NULL COMMENT '父节点Id',
		`parentName` VARCHAR(50) NULL DEFAULT NULL COMMENT '父节点名称',
	</#if> 
	<#list fieldList as field>
		<#if field.jdbcType == "INTEGER"> 
		`${field.attrName}` ${field.jdbcType}(11) NOT NULL COMMENT '${field.attrTitle}',
		</#if>
		<#if field.jdbcType == "VARCHAR"> 
		`${field.attrName}` ${field.jdbcType}(50) NULL COMMENT '${field.attrTitle}',
		</#if>
		<#if field.jdbcType == "DOUBLE"> 
		`${field.attrName}` ${field.jdbcType} NULL COMMENT '${field.attrTitle}',
		</#if>
	</#list>
		`creator` INT(11) NULL DEFAULT NULL COMMENT '创建者',
		`createDate` VARCHAR(50) NULL DEFAULT NULL COMMENT '创建时间',
		`modify` INT(11) NULL DEFAULT NULL COMMENT '修改者',
		`modifyDate` VARCHAR(50) NULL DEFAULT NULL COMMENT '修改时间',
  		PRIMARY KEY (`${objectNameLower}Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
