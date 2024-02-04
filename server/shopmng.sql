/*
SQLyog Ultimate v8.4 
MySQL - 5.1.47-community : Database - shopmng
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shopmng` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `shopmng`;

/*Table structure for table `caigou` */

DROP TABLE IF EXISTS `caigou`;

CREATE TABLE `caigou` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '采购订单id',
  `goodsname` varchar(30) DEFAULT NULL COMMENT '商品名称',
  `price` varchar(20) DEFAULT NULL COMMENT '商品单价',
  `num` varchar(30) DEFAULT NULL COMMENT '数量',
  `money` varchar(30) DEFAULT NULL COMMENT '价格',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `caigou` */

insert  into `caigou`(`cid`,`goodsname`,`price`,`num`,`money`) values (9,'木瓜','12','50','600'),(11,'水杯','18','100','1800');

/*Table structure for table `card` */

DROP TABLE IF EXISTS `card`;

CREATE TABLE `card` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `gid` varchar(30) DEFAULT NULL COMMENT '商品id',
  `number` int(11) DEFAULT '1' COMMENT '加购数量',
  `uid` varchar(30) DEFAULT NULL COMMENT '用户账号',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `card` */

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '评价表id',
  `uid` varchar(11) DEFAULT NULL COMMENT '用户id',
  `gid` varchar(11) DEFAULT NULL COMMENT '商品id',
  `oid` varchar(11) DEFAULT NULL COMMENT '订单id',
  `content` varchar(100) DEFAULT NULL COMMENT '评价内容',
  `ctime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

/*Data for the table `comments` */

insert  into `comments`(`cid`,`uid`,`gid`,`oid`,`content`,`ctime`) values (31,'111','7','68','大米好吃','2023-04-05 14:36:35'),(32,'111','1','70','苹果好吃','2023-03-05 14:36:35'),(33,'111','4','72','木瓜好吃','2023-02-05 14:36:35'),(34,'111','9','77','鸭腿好吃','2023-01-05 14:36:35'),(35,'111','1','78','苹果真好吃','2023-01-15 14:36:35'),(36,'111','1','68','......','2023-05-15 14:36:35'),(37,'111','1','68','......','2023-05-05 14:39:48');

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `type` int(11) DEFAULT NULL COMMENT '商品类型',
  `goodsname` varchar(30) DEFAULT NULL COMMENT '商品名称',
  `imgs` varchar(100) DEFAULT NULL COMMENT '图片',
  `price` int(11) DEFAULT NULL COMMENT '商品价格',
  `sid` int(11) DEFAULT NULL COMMENT '供应商id',
  `productiondate` varchar(30) DEFAULT NULL COMMENT '生产日期',
  `number` varchar(30) DEFAULT NULL COMMENT '数量',
  `lirun` double(30,2) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

insert  into `goods`(`id`,`type`,`goodsname`,`imgs`,`price`,`sid`,`productiondate`,`number`,`lirun`) values (1,1,'苹果','images/pingguo.jpg',8,1,'2022-03-02','37',6.00),(2,1,'猕猴桃','images/mihoutao.jpg',11,1,'2022-03-02','47',7.00),(3,1,'梨','images/li.jpg',7,1,'2022-03-04','150',5.00),(4,1,'木瓜','images/mugua.jpg',12,2,'2022-03-03','97',6.00),(5,2,'鸡肉','images/jirou.jpg',28,2,'2022-03-06','49',7.00),(6,2,'培根','images/peigen.jpg',24,2,'2022-03-05','100',6.00),(7,3,'大米','images/dami.jpg',89,2,'2022-03-04','48',7.00),(8,4,'椅子','images/yizi.jpg',49,2,'2022-03-03','50',6.00),(9,2,'鸭腿','images/yatui.jpg',22,1,'2022-03-06','40',7.00),(10,2,'牛腱子','images/niujianzi.jpg',43,2,'2022-03-04','50',6.00),(12,1,'新疆苹果','images/pingguo.jpg',34,1,'2000-02-02','23',3434.00);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `uid` varchar(30) DEFAULT NULL COMMENT '用户账号',
  `gid` varchar(30) DEFAULT NULL COMMENT '商品id',
  `money` varchar(30) DEFAULT NULL COMMENT '价格',
  `num` varchar(30) DEFAULT NULL COMMENT '总价',
  `pingjia` int(11) DEFAULT '0' COMMENT '是否评价0是1否',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`oid`,`uid`,`gid`,`money`,`num`,`pingjia`) values (78,'111','1','24','3',1),(79,'111','1','8','1',0),(80,'111','2','11','1',0),(81,'111','5','28','1',0),(82,'111','1','16','2',0);

/*Table structure for table `supplier` */

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '供应商id',
  `region` varchar(30) DEFAULT NULL COMMENT '地区',
  `suppliername` varchar(30) DEFAULT NULL COMMENT '供应商',
  `tel` varchar(30) DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `supplier` */

insert  into `supplier`(`id`,`region`,`suppliername`,`tel`) values (1,'沈阳','沈阳供货商','2432131'),(2,'大连','大连科技有限公司','2312312323'),(3,'沈阳','家具城','078821389');

/*Table structure for table `type` */

DROP TABLE IF EXISTS `type`;

CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品类型id',
  `typename` varchar(30) DEFAULT NULL COMMENT '商品类型',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `type` */

insert  into `type`(`id`,`typename`) values (1,'果蔬类'),(2,'新鲜肉类'),(3,'食品类'),(4,'杂货类'),(5,'便利性商品'),(6,'速食');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` varchar(30) DEFAULT NULL COMMENT '账号',
  `uname` varchar(30) DEFAULT NULL COMMENT '姓名',
  `upwd` varchar(30) DEFAULT NULL COMMENT '密码',
  `tel` varchar(30) DEFAULT NULL COMMENT '电话',
  `role` int(11) DEFAULT '0' COMMENT '用户角色0普通用户1管理员'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`uid`,`uname`,`upwd`,`tel`,`role`) values ('111','张三','111','1656488565458',0),('admin','管理员','admin','15984546565',1),('666','66','66','66',1),('6','李四','112','18546524956',0),('123','小李','123','124844564564',0),('456','小李','456','13758469546',0),('4587','小李','111','13485796542',0),('1212','111','1212444','888',0),('456','111','789','123456',0),('345','111','34','3456',0),('smith','111','aaa','112',0),('121','bbb','111','2111121212',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
