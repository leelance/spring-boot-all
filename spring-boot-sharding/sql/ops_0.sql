/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : ops_0

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-03-02 22:38:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_company
-- ----------------------------
DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company` (
  `company_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2019_0
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2019_0`;
CREATE TABLE `t_order_2019_0` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733038697644529 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2019_1
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2019_1`;
CREATE TABLE `t_order_2019_1` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733038697644530 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2019_2
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2019_2`;
CREATE TABLE `t_order_2019_2` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733038697644531 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2019_3
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2019_3`;
CREATE TABLE `t_order_2019_3` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733038697644532 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2020_0
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2020_0`;
CREATE TABLE `t_order_2020_0` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733820285223909 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2020_1
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2020_1`;
CREATE TABLE `t_order_2020_1` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733820285223910 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2020_2
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2020_2`;
CREATE TABLE `t_order_2020_2` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733820285223911 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_order_2020_3
-- ----------------------------
DROP TABLE IF EXISTS `t_order_2020_3`;
CREATE TABLE `t_order_2020_3` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308733820285223912 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_province
-- ----------------------------
DROP TABLE IF EXISTS `t_province`;
CREATE TABLE `t_province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prov_id` int(10) unsigned NOT NULL DEFAULT '0',
  `prov_name` varchar(30) NOT NULL,
  `prov_type` varchar(1) DEFAULT NULL COMMENT '1 - 直辖市\r\n2 - 行政省\r\n3 - 自治区\r\n4 - 特别行政区\r\n5 - 其他国家\r\n见全局数据字典[省份类型] \r\n',
  `prov_state` varchar(1) DEFAULT NULL COMMENT '0 - 禁用\r\n1 - 启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_info_0
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info_0`;
CREATE TABLE `t_user_info_0` (
  `user_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(19) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308397331563151856 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_info_1
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info_1`;
CREATE TABLE `t_user_info_1` (
  `user_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(19) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308617883624144897 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_info_2
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info_2`;
CREATE TABLE `t_user_info_2` (
  `user_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(19) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308712319800573953 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_info_3
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info_3`;
CREATE TABLE `t_user_info_3` (
  `user_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(19) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308397331563151859 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_info_4
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info_4`;
CREATE TABLE `t_user_info_4` (
  `user_id` bigint(19) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(19) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308397331563151860 DEFAULT CHARSET=utf8;
