-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.29 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 ssm-admin 的数据库结构
CREATE DATABASE IF NOT EXISTS `ssm-admin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ssm-admin`;

-- 导出  函数 ssm-admin.f_sys_getUserName 结构
DROP FUNCTION IF EXISTS `f_sys_getUserName`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_sys_getUserName`(
	`f_userId` INT

) RETURNS varchar(50) CHARSET utf8
    DETERMINISTIC
BEGIN
RETURN (SELECT realName FROM t_sys_user WHERE userId = f_userId);
END//
DELIMITER ;

-- 导出  表 ssm-admin.t_sys_attachment 结构
DROP TABLE IF EXISTS `t_sys_attachment`;
CREATE TABLE IF NOT EXISTS `t_sys_attachment` (
  `attachmentId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `menuNo` varchar(50) DEFAULT NULL COMMENT '菜单编号',
  `dataId` varchar(50) NOT NULL COMMENT '数据id',
  `attachmentName` varchar(50) DEFAULT NULL COMMENT '附件名称',
  `attachmentType` varchar(50) DEFAULT NULL COMMENT '附件类型',
  `attachmentSize` varchar(50) NOT NULL COMMENT '附件大小',
  `attachmentPath` varchar(500) DEFAULT NULL COMMENT '附件路径',
  `creator` int(11) DEFAULT NULL COMMENT '创建者',
  `createDate` varchar(50) DEFAULT NULL COMMENT '创建时间',
  `modify` int(11) DEFAULT NULL COMMENT '修改者',
  `modifyDate` varchar(50) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`attachmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_attachment 的数据：~0 rows (大约)
DELETE FROM `t_sys_attachment`;
/*!40000 ALTER TABLE `t_sys_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_attachment` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_button 结构
DROP TABLE IF EXISTS `t_sys_button`;
CREATE TABLE IF NOT EXISTS `t_sys_button` (
  `buttonId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `buttonNo` varchar(50) DEFAULT NULL,
  `parentName` varchar(50) DEFAULT NULL,
  `buttonIcon` varchar(50) DEFAULT NULL,
  `buttonType` varchar(50) DEFAULT NULL,
  `buttonName` varchar(50) DEFAULT NULL,
  `buttonSort` int(11) DEFAULT NULL,
  `buttonEvent` varchar(50) DEFAULT NULL,
  `buttonContent` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`buttonId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_button 的数据：~9 rows (大约)
DELETE FROM `t_sys_button`;
/*!40000 ALTER TABLE `t_sys_button` DISABLE KEYS */;
INSERT INTO `t_sys_button` (`buttonId`, `parentId`, `buttonNo`, `parentName`, `buttonIcon`, `buttonType`, `buttonName`, `buttonSort`, `buttonEvent`, `buttonContent`) VALUES
	(1, 0, 'add', '---', 'icon-add', 'linkbutton', '添加', 1, 'add()', '添加'),
	(2, 0, 'edit', '---', 'icon-edit', 'linkbutton', '编辑', 2, 'edit()', '编辑'),
	(3, 0, 'remove', '---', 'icon-remove', 'linkbutton', '删除', 3, 'remove()', '删除'),
	(4, 0, 'test', '---', 'icon-standard-folder-bell', 'splitbutton', '下载', 4, '', '下载'),
	(5, 4, 'test1', '下载', 'icon-standard-arrow-down', 'linkbutton', '设计', 4, 'k()', '设计'),
	(6, 4, 'test2', '下载', 'icon-standard-email-edit', 'linkbutton', '文档', 4, 'cs()', '测试'),
	(7, 0, 'create', '---', 'icon-standard-book-edit', 'linkbutton', '生成', 5, 'create()', '生成'),
	(8, 0, 'importExcel', '---', 'icon-standard-page-white-excel', 'linkbutton', '导入Excel', 6, 'importExcel()', '导入Excel'),
	(9, 0, 'upload', '---', 'icon-standard-arrow-join', 'buttonflag', '上传', 7, 'upload()', '上传');
/*!40000 ALTER TABLE `t_sys_button` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_code 结构
DROP TABLE IF EXISTS `t_sys_code`;
CREATE TABLE IF NOT EXISTS `t_sys_code` (
  `codeId` int(11) NOT NULL AUTO_INCREMENT,
  `packageName` varchar(50) DEFAULT NULL,
  `objectName` varchar(50) DEFAULT NULL,
  `tableTop` varchar(50) DEFAULT NULL,
  `dataView` varchar(50) DEFAULT NULL,
  `dataSelect` int(11) DEFAULT NULL,
  PRIMARY KEY (`codeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_code 的数据：~0 rows (大约)
DELETE FROM `t_sys_code`;
/*!40000 ALTER TABLE `t_sys_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_code` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_code_attr 结构
DROP TABLE IF EXISTS `t_sys_code_attr`;
CREATE TABLE IF NOT EXISTS `t_sys_code_attr` (
  `attrId` int(11) NOT NULL AUTO_INCREMENT,
  `codeId` int(11) NOT NULL DEFAULT '0',
  `attrName` varchar(50) DEFAULT NULL,
  `attrType` varchar(50) DEFAULT NULL,
  `attrTitle` varchar(50) DEFAULT NULL,
  `attrEdit` int(11) DEFAULT NULL,
  `attrRequired` int(11) DEFAULT NULL,
  `dataValidType` varchar(50) DEFAULT NULL,
  `attrSearch` int(11) DEFAULT NULL,
  `attrSor` int(11) DEFAULT NULL,
  PRIMARY KEY (`attrId`),
  KEY `codeId` (`codeId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_code_attr 的数据：~0 rows (大约)
DELETE FROM `t_sys_code_attr`;
/*!40000 ALTER TABLE `t_sys_code_attr` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_code_attr` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_collect_menu 结构
DROP TABLE IF EXISTS `t_sys_collect_menu`;
CREATE TABLE IF NOT EXISTS `t_sys_collect_menu` (
  `collectId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `menuId` int(11) DEFAULT NULL,
  `collectName` varchar(50) DEFAULT NULL,
  `collectUrl` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`collectId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_collect_menu 的数据：~4 rows (大约)
DELETE FROM `t_sys_collect_menu`;
/*!40000 ALTER TABLE `t_sys_collect_menu` DISABLE KEYS */;
INSERT INTO `t_sys_collect_menu` (`collectId`, `userId`, `menuId`, `collectName`, `collectUrl`) VALUES
	(12, 1, 19, NULL, NULL),
	(15, 1, NULL, '百度翻译', 'http://fanyi.baidu.com/#zh/en/'),
	(16, 2, 27, NULL, NULL),
	(17, 2, NULL, '百度翻译', 'http://www.baidu.com/');
/*!40000 ALTER TABLE `t_sys_collect_menu` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_dict 结构
DROP TABLE IF EXISTS `t_sys_dict`;
CREATE TABLE IF NOT EXISTS `t_sys_dict` (
  `dictId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL DEFAULT '0',
  `parentName` varchar(50) NOT NULL DEFAULT '0',
  `dictNo` varchar(50) DEFAULT NULL,
  `dictName` varchar(50) DEFAULT NULL,
  `dictKey` varchar(50) DEFAULT NULL,
  `dictValue` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dictId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_dict 的数据：~14 rows (大约)
DELETE FROM `t_sys_dict`;
/*!40000 ALTER TABLE `t_sys_dict` DISABLE KEYS */;
INSERT INTO `t_sys_dict` (`dictId`, `parentId`, `parentName`, `dictNo`, `dictName`, `dictKey`, `dictValue`) VALUES
	(1, 0, '---', 'menuTypes', '菜单类型', '', ''),
	(2, 1, '菜单类型', '', '菜单类型子项', '1', '普通菜单'),
	(4, 0, '---', 'userTypes', '用户类型', '', ''),
	(5, 4, '用户类型', '', '用户类型子项', '2', '普通用户'),
	(6, 4, '用户类型', '', '用户类型子项', '1', '管理员'),
	(7, 0, '---', 'buttonTypes', '按钮类型', '', ''),
	(8, 7, '按钮类型', '', '按钮类型子项', 'linkbutton', '普通按钮'),
	(9, 7, '按钮类型', '', '按钮类型子项', 'splitbutton', '分割按钮'),
	(10, 1, '菜单类型', '', '菜单类型子项', '0', '系统菜单'),
	(14, 0, '---', 'states', '状态类型', NULL, NULL),
	(15, 14, '状态类型', '', '状态类型子项', 'Enable', '启用'),
	(16, 14, '状态类型', '', '状态类型子项', 'Disable', '禁用'),
	(20, 7, '按钮类型', '', '按钮类型子项', 'buttonflag', '标识按钮'),
	(21, 14, '状态类型', '', '状态类型子项', 'Inactive', '未激活');
/*!40000 ALTER TABLE `t_sys_dict` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_log 结构
DROP TABLE IF EXISTS `t_sys_log`;
CREATE TABLE IF NOT EXISTS `t_sys_log` (
  `logId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `logIp` varchar(50) DEFAULT NULL,
  `menuId` int(11) DEFAULT NULL,
  `logContent` varchar(500) DEFAULT NULL,
  `logDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_log 的数据：~71 rows (大约)
DELETE FROM `t_sys_log`;
/*!40000 ALTER TABLE `t_sys_log` DISABLE KEYS */;
INSERT INTO `t_sys_log` (`logId`, `userId`, `logIp`, `menuId`, `logContent`, `logDate`) VALUES
	(1, 1, '127.0.0.1', 1, '退出系统', '2020-10-10 11:07:32'),
	(2, 1, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:07:32'),
	(3, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:08:03'),
	(4, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 11:08:03'),
	(5, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 11:10:12'),
	(6, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:10:12'),
	(7, 1, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:10:47'),
	(8, 1, '127.0.0.1', 1, '登录系统', '2020-10-10 11:10:47'),
	(9, 1, '127.0.0.1', 27, '删除数据', '2020-10-10 11:11:20'),
	(10, 1, '127.0.0.1', 7, '删除数据', '2020-10-10 11:11:29'),
	(11, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:11:58'),
	(12, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:12:04'),
	(13, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:12:37'),
	(14, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:12:48'),
	(15, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:12:58'),
	(16, 1, '127.0.0.1', 11, '删除数据', '2020-10-10 11:13:04'),
	(17, 1, '127.0.0.1', 2, '删除数据', '2020-10-10 11:15:55'),
	(18, 1, '127.0.0.1', 2, '删除数据', '2020-10-10 11:17:37'),
	(19, 1, '127.0.0.1', 1, '退出系统', '2020-10-10 11:18:18'),
	(20, 1, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:18:18'),
	(21, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:18:32'),
	(22, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 11:18:32'),
	(23, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 11:19:02'),
	(24, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:19:02'),
	(25, 1, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:19:19'),
	(26, 1, '127.0.0.1', 1, '登录系统', '2020-10-10 11:19:19'),
	(27, 1, '127.0.0.1', 27, '删除数据', '2020-10-10 11:19:45'),
	(28, 1, '127.0.0.1', 1, '退出系统', '2020-10-10 11:20:55'),
	(29, 1, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:20:55'),
	(30, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:21:02'),
	(31, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 11:21:02'),
	(32, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 11:21:14'),
	(33, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:21:14'),
	(34, 1, '127.0.0.1', NULL, '登录系统', '2020-10-10 11:21:28'),
	(35, 1, '127.0.0.1', 1, '登录系统', '2020-10-10 11:21:28'),
	(36, 1, '127.0.0.1', 27, '删除数据', '2020-10-10 11:21:36'),
	(37, 1, '127.0.0.1', 1, '退出系统', '2020-10-10 11:31:01'),
	(38, 1, '127.0.0.1', NULL, '退出系统', '2020-10-10 11:31:01'),
	(39, 1, '127.0.0.1', NULL, '登录系统', '2020-10-10 14:31:35'),
	(40, 1, '127.0.0.1', 1, '登录系统', '2020-10-10 14:31:35'),
	(41, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 15:43:33'),
	(42, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:43:36'),
	(43, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:44:24'),
	(44, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:45:04'),
	(45, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:45:18'),
	(46, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:46:33'),
	(47, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 15:54:03'),
	(48, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:54:03'),
	(49, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 15:54:53'),
	(50, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 15:55:19'),
	(51, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 15:55:19'),
	(52, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 16:07:00'),
	(53, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 16:07:00'),
	(54, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 16:07:06'),
	(55, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 16:07:06'),
	(56, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 16:09:00'),
	(57, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 16:09:00'),
	(58, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 16:09:05'),
	(59, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 16:09:05'),
	(60, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 16:10:08'),
	(61, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 16:10:08'),
	(62, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 16:10:14'),
	(63, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 16:10:14'),
	(64, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 16:12:26'),
	(65, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 16:12:26'),
	(66, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 16:12:30'),
	(67, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 16:12:30'),
	(68, 2, '127.0.0.1', NULL, '登录系统', '2020-10-10 16:16:28'),
	(69, 2, '127.0.0.1', 1, '登录系统', '2020-10-10 16:16:28'),
	(70, 2, '127.0.0.1', 1, '退出系统', '2020-10-10 16:16:32'),
	(71, 2, '127.0.0.1', NULL, '退出系统', '2020-10-10 16:16:32');
/*!40000 ALTER TABLE `t_sys_log` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_menu 结构
DROP TABLE IF EXISTS `t_sys_menu`;
CREATE TABLE IF NOT EXISTS `t_sys_menu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL DEFAULT '0',
  `parentName` varchar(50) NOT NULL DEFAULT '--',
  `buttonId` int(11) NOT NULL DEFAULT '0',
  `menuNo` varchar(50) NOT NULL DEFAULT '0',
  `menuName` varchar(50) NOT NULL DEFAULT '0',
  `menuIcon` varchar(50) NOT NULL DEFAULT '0',
  `menuUrl` varchar(50) DEFAULT NULL,
  `menuOrder` int(11) NOT NULL DEFAULT '0',
  `menuStatus` int(11) NOT NULL DEFAULT '0',
  `menuRemark` varchar(500) DEFAULT NULL,
  `menuType` int(11) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `createDate` varchar(20) DEFAULT NULL,
  `modify` int(11) DEFAULT NULL,
  `modifyDate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- 正在导出表  ssm-admin.t_sys_menu 的数据：~38 rows (大约)
DELETE FROM `t_sys_menu`;
/*!40000 ALTER TABLE `t_sys_menu` DISABLE KEYS */;
INSERT INTO `t_sys_menu` (`menuId`, `parentId`, `parentName`, `buttonId`, `menuNo`, `menuName`, `menuIcon`, `menuUrl`, `menuOrder`, `menuStatus`, `menuRemark`, `menuType`, `creator`, `createDate`, `modify`, `modifyDate`) VALUES
	(1, 0, '---', 0, '001', '系统设置', 'icon-hamburg-config', '---', 1, 1, '系统设置', 0, NULL, NULL, NULL, '2017-01-09 15:22:34'),
	(2, 1, '系统设置', 0, '001001', '菜单管理', 'icon-hamburg-delicious', 'sys/menu/browse.shtml', 2, 1, '菜单管理', 0, NULL, NULL, NULL, '2017-01-09 15:25:25'),
	(3, 2, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(4, 2, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(5, 2, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(6, 1, '系统设置', 0, '001002', '系统日志', 'icon-hamburg-networking', 'sys/log/browse.shtml', 10, 1, '系统日志', 0, NULL, '2016-04-22 16:02:21', NULL, '2017-01-09 15:25:56'),
	(7, 1, '系统设置', 0, '001003', '用户管理', 'icon-hamburg-user', 'sys/user/browse.shtml', 5, 1, '用户管理', 0, NULL, '2016-04-22 17:08:27', NULL, '2017-01-09 15:25:39'),
	(8, 7, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(9, 7, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(10, 7, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(11, 1, '系统设置', 0, '001005', '数据字典', 'icon-hamburg-library', 'sys/dict/browse.shtml', 6, 1, '数据字典', 0, NULL, '2016-04-25 09:34:47', NULL, '2017-12-28 16:23:02'),
	(12, 11, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(13, 11, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(14, 11, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(15, 1, '系统设置', 0, '001006', '消息服务', 'icon-hamburg-consulting', 'monitoring', 8, 1, '消息服务', 0, NULL, '2016-04-25 09:38:12', NULL, '2017-01-20 14:04:01'),
	(16, 15, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(17, 15, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(18, 15, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(19, 1, '系统设置', 0, '001008', '按钮设置', 'icon-hamburg-link', 'sys/button/browse.shtml', 3, 1, '按钮设置', 0, 2, '2016-05-03 10:10:44', NULL, '2017-01-09 15:25:30'),
	(20, 19, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(21, 19, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(22, 19, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(23, 1, '系统设置', 0, '001007', '组织机构', 'icon-hamburg-customers', 'sys/organ/browse.shtml', 9, 1, '组织机构', 0, NULL, '2016-04-25 09:40:01', NULL, '2017-01-09 15:25:52'),
	(24, 23, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(25, 23, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(26, 23, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(27, 1, '系统设置', 0, '001004', '角色管理', 'icon-hamburg-my-account', 'sys/role/browse.shtml', 4, 1, '角色管理', 0, NULL, '2016-04-25 09:33:14', NULL, '2017-01-09 15:25:34'),
	(28, 27, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(29, 27, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(30, 27, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(48, 1, '系统设置', 0, '001009', '代码生成', 'icon-hamburg-archives', 'sys/code/browse.shtml', 11, 1, '代码生成', 0, 1, '2017-02-06 11:04:03', NULL, '2017-12-28 16:23:11'),
	(49, 48, '--', 1, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(50, 48, '--', 2, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(51, 48, '--', 3, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(52, 48, '--', 7, '0', '0', '0', NULL, 0, 0, NULL, 0, NULL, NULL, NULL, NULL),
	(76, 1, '系统设置', 0, '001010', '主页配置', 'icon-hamburg-home', 'sys/desktop/browse.shtml', 12, 1, '主页配置', 0, 1, '2018-01-03 11:08:00', NULL, NULL),
	(77, 1, '系统设置', 0, '001011', '导入配置', 'icon-hamburg-sign-up', 'sys/import/browse.shtml', 13, 1, '导入配置', 0, 1, '2018-01-03 11:12:31', NULL, '2018-01-03 11:14:02'),
	(78, 1, '系统设置', 0, '001012', '导出配置', 'icon-hamburg-sign-out', 'sys/export/browse.shtml', 14, 0, '导出配置', 0, 1, '2018-01-03 11:13:52', NULL, NULL);
/*!40000 ALTER TABLE `t_sys_menu` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_menu_dict 结构
DROP TABLE IF EXISTS `t_sys_menu_dict`;
CREATE TABLE IF NOT EXISTS `t_sys_menu_dict` (
  `menuId` int(11) DEFAULT NULL,
  `dictId` int(11) DEFAULT NULL,
  KEY `menuId_codeId` (`menuId`,`dictId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_menu_dict 的数据：~7 rows (大约)
DELETE FROM `t_sys_menu_dict`;
/*!40000 ALTER TABLE `t_sys_menu_dict` DISABLE KEYS */;
INSERT INTO `t_sys_menu_dict` (`menuId`, `dictId`) VALUES
	(2, 1),
	(2, 2),
	(2, 10),
	(19, 7),
	(19, 8),
	(19, 9),
	(19, 20);
/*!40000 ALTER TABLE `t_sys_menu_dict` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_message 结构
DROP TABLE IF EXISTS `t_sys_message`;
CREATE TABLE IF NOT EXISTS `t_sys_message` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `sendUser` int(11) NOT NULL DEFAULT '0',
  `sendDate` varchar(50) NOT NULL DEFAULT '0',
  `sendContent` varchar(500) NOT NULL DEFAULT '0',
  `receiveUser` int(11) NOT NULL DEFAULT '0',
  `receiveDate` varchar(50) DEFAULT '0',
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_message 的数据：~1 rows (大约)
DELETE FROM `t_sys_message`;
/*!40000 ALTER TABLE `t_sys_message` DISABLE KEYS */;
INSERT INTO `t_sys_message` (`messageId`, `sendUser`, `sendDate`, `sendContent`, `receiveUser`, `receiveDate`) VALUES
	(1, 1, '2016-06-17 10:31:48', '您上次登录IP(127.0.0.1)和登录时间(192.168.1.161)不一样！并没有按正常步骤退出系统！', 1, '0');
/*!40000 ALTER TABLE `t_sys_message` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_organ 结构
DROP TABLE IF EXISTS `t_sys_organ`;
CREATE TABLE IF NOT EXISTS `t_sys_organ` (
  `organId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `parentName` varchar(50) DEFAULT NULL,
  `organNo` varchar(50) DEFAULT NULL,
  `organName` varchar(50) DEFAULT NULL,
  `organContent` varchar(500) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `createDate` varchar(50) DEFAULT NULL,
  `modify` int(11) DEFAULT NULL,
  `modifyDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`organId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_organ 的数据：~5 rows (大约)
DELETE FROM `t_sys_organ`;
/*!40000 ALTER TABLE `t_sys_organ` DISABLE KEYS */;
INSERT INTO `t_sys_organ` (`organId`, `parentId`, `parentName`, `organNo`, `organName`, `organContent`, `creator`, `createDate`, `modify`, `modifyDate`) VALUES
	(1, 0, '---', '001', '瓜哥科技有限公司', '瓜哥科技有限公司', 2, '2016-04-27 14:00:59', NULL, '2018-03-07 15:42:51'),
	(2, 1, '瓜哥科技有限公司', '001001', '财务部', '财务部', 2, '2016-04-27 14:02:29', NULL, NULL),
	(3, 1, '瓜哥科技有限公司', '001002', '行政部', '行政部', 2, '2016-04-27 14:53:50', NULL, NULL),
	(4, 1, '瓜哥科技有限公司', '001003', '销售部', '销售部', 2, '2016-04-27 14:56:39', NULL, NULL),
	(5, 1, '瓜哥科技有限公司', '001004', '业务部', '业务部', 2, '2016-04-27 14:57:38', NULL, '2016-04-27 15:04:51');
/*!40000 ALTER TABLE `t_sys_organ` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_role 结构
DROP TABLE IF EXISTS `t_sys_role`;
CREATE TABLE IF NOT EXISTS `t_sys_role` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) DEFAULT NULL,
  `roleContent` varchar(500) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `createDate` varchar(50) DEFAULT NULL,
  `modify` int(11) DEFAULT NULL,
  `modifyDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_role 的数据：~4 rows (大约)
DELETE FROM `t_sys_role`;
/*!40000 ALTER TABLE `t_sys_role` DISABLE KEYS */;
INSERT INTO `t_sys_role` (`roleId`, `roleName`, `roleContent`, `creator`, `createDate`, `modify`, `modifyDate`) VALUES
	(1, '超级管理员', '超级管理员', 0, '2016-04-27 15:37:50', NULL, '2016-05-04 14:31:47'),
	(2, '系统管理员', '系统管理员', 1, '2016-04-27 15:37:50', NULL, '2016-05-04 14:31:47'),
	(3, '测试人员', '测试人员', 2, '2017-01-09 15:50:14', NULL, '2018-03-07 15:45:13'),
	(6, '销售人员', '销售人员', 2, '2018-03-15 16:19:07', NULL, NULL);
/*!40000 ALTER TABLE `t_sys_role` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_role_menu 结构
DROP TABLE IF EXISTS `t_sys_role_menu`;
CREATE TABLE IF NOT EXISTS `t_sys_role_menu` (
  `roleId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  KEY `roelId_menuId` (`roleId`,`menuId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_role_menu 的数据：~40 rows (大约)
DELETE FROM `t_sys_role_menu`;
/*!40000 ALTER TABLE `t_sys_role_menu` DISABLE KEYS */;
INSERT INTO `t_sys_role_menu` (`roleId`, `menuId`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11),
	(1, 12),
	(1, 13),
	(1, 14),
	(1, 19),
	(1, 20),
	(1, 21),
	(1, 22),
	(1, 27),
	(1, 28),
	(1, 29),
	(1, 30),
	(1, 48),
	(1, 49),
	(1, 50),
	(1, 51),
	(1, 52),
	(2, 1),
	(2, 6),
	(2, 7),
	(2, 8),
	(2, 9),
	(2, 10),
	(2, 23),
	(2, 24),
	(2, 25),
	(2, 26),
	(2, 27),
	(2, 28),
	(2, 29),
	(2, 30);
/*!40000 ALTER TABLE `t_sys_role_menu` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_user 结构
DROP TABLE IF EXISTS `t_sys_user`;
CREATE TABLE IF NOT EXISTS `t_sys_user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `organId` int(11) NOT NULL DEFAULT '0',
  `userName` varchar(50) DEFAULT NULL,
  `passWord` varchar(50) DEFAULT NULL,
  `realName` varchar(50) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `qq` varchar(50) DEFAULT NULL,
  `phoneNum` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT '0',
  `userType` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `remarks` varchar(500) DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `createDate` varchar(50) NOT NULL DEFAULT '0',
  `modify` int(11) DEFAULT NULL,
  `modifyDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `organId_roelId` (`organId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_user 的数据：~2 rows (大约)
DELETE FROM `t_sys_user`;
/*!40000 ALTER TABLE `t_sys_user` DISABLE KEYS */;
INSERT INTO `t_sys_user` (`userId`, `organId`, `userName`, `passWord`, `realName`, `sex`, `birthday`, `email`, `qq`, `phoneNum`, `address`, `userType`, `status`, `remarks`, `creator`, `createDate`, `modify`, `modifyDate`) VALUES
	(1, 0, 'super', '852a2751dbfd8953', '超级管理员', 1, '2017-01-20', '666@163.com', '345736612', '5555', '5555', 0, 1, '5555hhhhhhh', 0, '0', 1, '2017-01-19 15:25:42'),
	(2, 0, 'admin', 'fc89cf192b9d79e9', '系统管理员', 1, '2016-05-03', '666@163.com', '5555', '5555', '5555', 1, 1, '5555', 1, '0', NULL, NULL);
/*!40000 ALTER TABLE `t_sys_user` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_user_organ 结构
DROP TABLE IF EXISTS `t_sys_user_organ`;
CREATE TABLE IF NOT EXISTS `t_sys_user_organ` (
  `userId` int(11) NOT NULL,
  `organId` int(11) NOT NULL,
  KEY `userId_organId` (`userId`,`organId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_user_organ 的数据：~5 rows (大约)
DELETE FROM `t_sys_user_organ`;
/*!40000 ALTER TABLE `t_sys_user_organ` DISABLE KEYS */;
INSERT INTO `t_sys_user_organ` (`userId`, `organId`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5);
/*!40000 ALTER TABLE `t_sys_user_organ` ENABLE KEYS */;

-- 导出  表 ssm-admin.t_sys_user_role 结构
DROP TABLE IF EXISTS `t_sys_user_role`;
CREATE TABLE IF NOT EXISTS `t_sys_user_role` (
  `roleId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `roleId_menuId` (`roleId`,`userId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  ssm-admin.t_sys_user_role 的数据：~2 rows (大约)
DELETE FROM `t_sys_user_role`;
/*!40000 ALTER TABLE `t_sys_user_role` DISABLE KEYS */;
INSERT INTO `t_sys_user_role` (`roleId`, `userId`) VALUES
	(1, 1),
	(2, 2);
/*!40000 ALTER TABLE `t_sys_user_role` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
