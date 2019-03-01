/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : ops_0

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-03-02 00:06:41
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_company
-- ----------------------------

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
-- Records of t_province
-- ----------------------------
INSERT INTO `t_province` VALUES ('1', '1', '国外', '5', '1');
INSERT INTO `t_province` VALUES ('2', '10', '北京', '1', '1');
INSERT INTO `t_province` VALUES ('3', '11', '上海', '1', '1');
INSERT INTO `t_province` VALUES ('4', '12', '天津', '1', '1');
INSERT INTO `t_province` VALUES ('5', '13', '重庆', '1', '1');
INSERT INTO `t_province` VALUES ('6', '14', '河北', '2', '1');
INSERT INTO `t_province` VALUES ('7', '15', '山西', '2', '1');
INSERT INTO `t_province` VALUES ('8', '16', '内蒙古 ', '3', '1');
INSERT INTO `t_province` VALUES ('9', '17', '辽宁', '2', '1');
INSERT INTO `t_province` VALUES ('10', '18', '吉林', '2', '1');
INSERT INTO `t_province` VALUES ('11', '19', '黑龙江', '2', '1');
INSERT INTO `t_province` VALUES ('12', '20', '江苏', '2', '1');
INSERT INTO `t_province` VALUES ('13', '21', '浙江', '2', '1');
INSERT INTO `t_province` VALUES ('14', '22', '安徽', '2', '1');
INSERT INTO `t_province` VALUES ('15', '23', '福建', '2', '1');
INSERT INTO `t_province` VALUES ('16', '24', '江西', '2', '1');
INSERT INTO `t_province` VALUES ('17', '25', '山东', '2', '1');
INSERT INTO `t_province` VALUES ('18', '26', '河南', '2', '1');
INSERT INTO `t_province` VALUES ('19', '27', '湖北', '2', '1');
INSERT INTO `t_province` VALUES ('20', '28', '湖南', '2', '1');
INSERT INTO `t_province` VALUES ('21', '29', '广东', '2', '1');
INSERT INTO `t_province` VALUES ('22', '30', '广西', '3', '1');
INSERT INTO `t_province` VALUES ('23', '31', '海南', '2', '1');
INSERT INTO `t_province` VALUES ('24', '32', '四川', '2', '1');
INSERT INTO `t_province` VALUES ('25', '33', '贵州', '2', '1');
INSERT INTO `t_province` VALUES ('26', '34', '云南', '2', '1');
INSERT INTO `t_province` VALUES ('27', '35', '西藏', '3', '1');
INSERT INTO `t_province` VALUES ('28', '36', '陕西', '2', '1');
INSERT INTO `t_province` VALUES ('29', '37', '甘肃', '2', '1');
INSERT INTO `t_province` VALUES ('30', '38', '青海', '2', '1');
INSERT INTO `t_province` VALUES ('31', '39', '宁夏', '3', '1');
INSERT INTO `t_province` VALUES ('32', '40', '新疆', '3', '1');
INSERT INTO `t_province` VALUES ('33', '41', '香港', '4', '1');
INSERT INTO `t_province` VALUES ('34', '42', '澳门', '4', '1');
INSERT INTO `t_province` VALUES ('35', '43', '台湾', '2', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=308389433512559091 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info_0
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=308389433512559092 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info_1
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=308389433512559088 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info_2
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=308389433512559089 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info_3
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=308389433512559090 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info_4
-- ----------------------------
