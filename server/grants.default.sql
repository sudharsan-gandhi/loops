-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: kabaflow
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `grant`
--

LOCK TABLES `grant` WRITE;
/*!40000 ALTER TABLE `grant` DISABLE KEYS */;
INSERT INTO `grant` (
`role`,
`resource`,
`action`,
`attributes`,
`postDate`,
`updatedAt`,
`postedById`)
VALUES 
('admin','loop','create:any','*','2022-03-12 04:01:12.585828','2022-03-12 04:01:12.585828',1),
('admin','loop','read:any','*','2022-03-12 04:01:12.599807','2022-03-12 04:01:12.599807',1),
('admin','loop','update:any','*','2022-03-12 04:01:12.606729','2022-03-12 04:01:12.606729',1),
('admin','loop','delete:any','*','2022-03-12 04:01:12.618452','2022-03-12 04:01:12.618452',1),
('admin','job','create:any','*','2022-03-12 04:01:12.625613','2022-03-12 04:01:12.625613',1),
('admin','job','read:any','*','2022-03-12 04:01:12.640820','2022-03-12 04:01:12.640820',1),
('admin','job','update:any','*','2022-03-12 04:01:12.652717','2022-03-12 04:01:12.652717',1),
('admin','job','delete:any','*','2022-03-12 04:01:12.658629','2022-03-12 04:01:12.658629',1),
('admin','pack','create:any','*','2022-03-12 04:01:12.664673','2022-03-12 04:01:12.664673',1),
('admin','pack','read:any','*','2022-03-12 04:01:12.673787','2022-03-12 04:01:12.673787',1),
('admin','pack','update:any','*','2022-03-12 04:01:12.680754','2022-03-12 04:01:12.680754',1),
('admin','pack','delete:any','*','2022-03-12 04:01:12.686513','2022-03-12 04:01:12.686513',1),
('admin','paymentplan','create:any','*','2022-03-12 04:01:12.691588','2022-03-12 04:01:12.691588',1),
('admin','paymentplan','read:any','*','2022-03-12 04:01:12.697377','2022-03-12 04:01:12.697377',1),
('admin','paymentplan','update:any','*','2022-03-12 04:01:12.716019','2022-03-12 04:01:12.716019',1),
('admin','paymentplan','delete:any','*','2022-03-12 04:01:12.725545','2022-03-12 04:01:12.725545',1),
('admin','payment','create:any','*','2022-03-12 04:01:12.732583','2022-03-12 04:01:12.732583',1),
('admin','payment','read:any','*','2022-03-12 04:01:12.737593','2022-03-12 04:01:12.737593',1),
('admin','payment','update:any','*','2022-03-12 04:01:12.741974','2022-03-12 04:01:12.741974',1),
('admin','payment','delete:any','*','2022-03-12 04:01:12.746622','2022-03-12 04:01:12.746622',1),
('admin','rave','create:any','*','2022-03-12 04:01:12.750706','2022-03-12 04:01:12.750706',1),
('admin','rave','read:any','*','2022-03-12 04:01:12.753808','2022-03-12 04:01:12.753808',1),
('admin','rave','update:any','*','2022-03-12 04:01:12.756734','2022-03-12 04:01:12.756734',1),
('admin','rave','delete:any','*','2022-03-12 04:01:12.759620','2022-03-12 04:01:12.759620',1),
('admin','review','create:any','*','2022-03-12 04:01:12.764082','2022-03-12 04:01:12.764082',1),
('admin','review','read:any','*','2022-03-12 04:01:12.767412','2022-03-12 04:01:12.767412',1),
('admin','review','update:any','*','2022-03-12 04:01:12.772600','2022-03-12 04:01:12.772600',1),
('admin','review','delete:any','*','2022-03-12 04:01:12.776074','2022-03-12 04:01:12.776074',1),
('admin','user','create:any','*','2022-03-12 04:01:12.781729','2022-03-12 04:01:12.781729',1),
('admin','user','read:any','*','2022-03-12 04:01:12.784988','2022-03-12 04:01:12.784988',1),
('admin','user','update:any','*','2022-03-12 04:01:12.788332','2022-03-12 04:01:12.788332',1),
('admin','user','delete:any','*','2022-03-12 04:01:12.793144','2022-03-12 04:01:12.793144',1),
('admin','wishlist','create:any','*','2022-03-12 04:01:12.799234','2022-03-12 04:01:12.799234',1),
('admin','wishlist','read:any','*','2022-03-12 04:01:12.803390','2022-03-12 04:01:12.803390',1),
('admin','wishlist','update:any','*','2022-03-12 04:01:12.807167','2022-03-12 04:01:12.807167',1),
('admin','wishlist','delete:any','*','2022-03-12 04:01:12.811406','2022-03-12 04:01:12.811406',1),
('user','loop','create:own','*','2022-03-12 04:01:12.814858','2022-03-12 04:01:12.814858',1),
('user','loop','read:any','*','2022-03-12 04:01:12.817834','2022-03-12 04:01:12.817834',1),
('user','loop','update:own','*','2022-03-12 04:01:12.820542','2022-03-12 04:01:12.820542',1),
('user','loop','delete:own','*','2022-03-12 04:01:12.823172','2022-03-12 04:01:12.823172',1),
('user','job','read:any','*','2022-03-12 04:01:12.826672','2022-03-12 04:01:12.826672',1),
('user','pack','create:own','*','2022-03-12 04:01:12.829387','2022-03-12 04:01:12.829387',1),
('user','pack','read:any','*','2022-03-12 04:01:12.831993','2022-03-12 04:01:12.831993',1),
('user','pack','update:own','*','2022-03-12 04:01:12.834605','2022-03-12 04:01:12.834605',1),
('user','pack','delete:any','*','2022-03-12 04:01:12.837700','2022-03-12 04:01:12.837700',1),
('user','paymentplan','read:any','*','2022-03-12 04:01:12.840518','2022-03-12 04:01:12.840518',1),
('user','payment','create:own','*','2022-03-12 04:01:12.843451','2022-03-12 04:01:12.843451',1),
('user','payment','read:own','*','2022-03-12 04:01:12.846045','2022-03-12 04:01:12.846045',1),
('user','rave','create:own','*','2022-03-12 04:01:12.849225','2022-03-12 04:01:12.849225',1),
('user','rave','read:any','*','2022-03-12 04:01:12.851818','2022-03-12 04:01:12.851818',1),
('user','rave','update:own','*','2022-03-12 04:01:12.854467','2022-03-12 04:01:12.854467',1),
('user','rave','delete:own','*','2022-03-12 04:01:12.857173','2022-03-12 04:01:12.857173',1),
('user','review','create:own','*','2022-03-12 04:01:12.859812','2022-03-12 04:01:12.859812',1),
('user','review','read:any','*','2022-03-12 04:01:12.862458','2022-03-12 04:01:12.862458',1),
('user','review','update:own','*','2022-03-12 04:01:12.865101','2022-03-12 04:01:12.865101',1),
('user','review','delete:own','*','2022-03-12 04:01:12.867791','2022-03-12 04:01:12.867791',1),
('user','user','create:any','*, !role','2022-03-12 04:01:12.870946','2022-03-12 04:01:12.870946',1),
('user','user','read:own','*','2022-03-12 04:01:12.873866','2022-03-12 04:01:12.873866',1),
('user','user','update:own','*','2022-03-12 04:01:12.876908','2022-03-12 04:01:12.876908',1),
('user','user','delete:own','*','2022-03-12 04:01:12.879535','2022-03-12 04:01:12.879535',1),
('user','wishlist','create:own','*','2022-03-12 04:01:12.882275','2022-03-12 04:01:12.882275',1),
('user','wishlist','read:own','*','2022-03-12 04:01:12.884995','2022-03-12 04:01:12.884995',1),
('user','wishlist','update:own','*','2022-03-12 04:01:12.887833','2022-03-12 04:01:12.887833',1),
('user','wishlist','delete:own','*','2022-03-12 04:01:12.890493','2022-03-12 04:01:12.890493',1),
('guest','loop','read:any','*','2022-03-12 04:01:12.893997','2022-03-12 04:01:12.893997',1),
('guest','job','read:any','*','2022-03-12 04:01:12.897155','2022-03-12 04:01:12.897155',1),
('guest','pack','read:any','*','2022-03-12 04:01:12.899824','2022-03-12 04:01:12.899824',1),
('guest','paymentplan','read:any','*','2022-03-12 04:01:12.902719','2022-03-12 04:01:12.902719',1),
('guest','rave','read:any','*','2022-03-12 04:01:12.905504','2022-03-12 04:01:12.905504',1),
('guest','review','read:any','*','2022-03-12 04:01:12.908102','2022-03-12 04:01:12.908102',1),
('guest','user','read:any','*','2022-03-12 04:01:12.910765','2022-03-12 04:01:12.910765',1),
('admin','grant','create:any','*','2022-03-18 02:36:58.818281','2022-03-18 02:36:58.818281',1),
('admin','grant','read:any','*','2022-03-18 02:39:11.926276','2022-03-18 02:39:11.926276',1),
('admin','grant','update:any','*','2022-03-19 00:55:08.373813','2022-03-19 00:55:08.373813',1),
('admin','grant','delete:any','*','2022-03-19 00:55:26.677451','2022-03-19 00:55:26.677451',1),
('admin','carousel','read:any','*','2022-03-19 01:08:11.170175','2022-03-19 01:08:11.170175',1),
('user','carousel','read:any','*','2022-03-20 01:20:07.026744','2022-03-20 01:20:07.026744',1),
('admin','carousel','create:any','*','2022-03-20 01:21:55.407991','2022-03-20 01:21:55.407991',1),
('guest','carousel','read:any','*','2022-03-21 02:15:27.399494','2022-03-21 02:15:27.399494',1);

/*!40000 ALTER TABLE `grant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-23 20:21:53
