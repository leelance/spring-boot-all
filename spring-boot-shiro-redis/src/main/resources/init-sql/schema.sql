/*
Date: 2016-06-01 23:44:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_module`
-- ----------------------------
DROP TABLE IF EXISTS `t_module`;
CREATE TABLE `t_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(32) DEFAULT NULL,
  `module_path` varchar(50) DEFAULT NULL,
  `module_type` int(2) DEFAULT NULL COMMENT '1.URL, 2.功能',
  `module_key` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_module
-- ----------------------------
INSERT INTO `t_module` VALUES ('1', 'Overview', '/index', '1', 'IndexUrl', '2016-06-01 23:41:39');
INSERT INTO `t_module` VALUES ('2', 'Reports', null, '1', 'Reports', '2016-06-02 09:42:17');
INSERT INTO `t_module` VALUES ('3', 'Analytics', null, '1', 'Analytics', '2016-06-03 21:42:17');
INSERT INTO `t_module` VALUES ('4', 'Export', null, '1', 'Export', '2016-06-03 20:38:01');
INSERT INTO `t_module` VALUES ('5', 'Nav item', null, '1', 'Nav_item', '2016-06-03 20:38:04');
INSERT INTO `t_module` VALUES ('6', 'Nav item again', null, '1', 'Nav_item_again', '2016-06-03 20:38:08');
INSERT INTO `t_module` VALUES ('7', 'One more nav', null, '1', 'One_more_nav', '2016-06-21 20:38:11');
INSERT INTO `t_module` VALUES ('8', 'Another nav item', null, '1', 'Another_nav_item', '2016-05-29 20:38:23');
INSERT INTO `t_module` VALUES ('9', 'More navigation', null, '1', 'More_navigation', '2016-06-05 20:38:14');
INSERT INTO `t_module` VALUES ('10', 'Nav item again', null, '1', 'Nav_item_again1', '2016-07-01 20:38:28');
INSERT INTO `t_module` VALUES ('11', 'One more nav', null, '1', 'One_more_nav1', '2016-05-31 20:38:18');
INSERT INTO `t_module` VALUES ('12', 'Another nav item', null, '1', 'Another_nav_item1', '2016-05-29 20:38:31');

-- ----------------------------
-- Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '管理员', '系统管理员', '2016-06-01 23:41:11');

-- ----------------------------
-- Table structure for `t_role_module`
-- ----------------------------
DROP TABLE IF EXISTS `t_role_module`;
CREATE TABLE `t_role_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role_module
-- ----------------------------
INSERT INTO `t_role_module` VALUES ('1', '1', '1');
INSERT INTO `t_role_module` VALUES ('2', '1', '2');
INSERT INTO `t_role_module` VALUES ('3', '1', '3');
INSERT INTO `t_role_module` VALUES ('4', '1', '4');
INSERT INTO `t_role_module` VALUES ('5', '1', '5');
INSERT INTO `t_role_module` VALUES ('6', '1', '6');
INSERT INTO `t_role_module` VALUES ('7', '1', '7');
INSERT INTO `t_role_module` VALUES ('8', '1', '8');
INSERT INTO `t_role_module` VALUES ('9', '1', '9');
INSERT INTO `t_role_module` VALUES ('10', '1', '10');
INSERT INTO `t_role_module` VALUES ('11', '1', '11');
INSERT INTO `t_role_module` VALUES ('12', '1', '12');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('2', 'lance', 'e10adc3949ba59abbe56e057f20f883e', 'Lance', '2016-06-02 23:35:38');
INSERT INTO `t_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Admin', '2016-06-01 23:35:17');

-- ----------------------------
-- Table structure for `t_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES ('1', '1', '1');
