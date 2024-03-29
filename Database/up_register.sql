-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: up
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

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
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(40) DEFAULT NULL,
  `lastname` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `salt` varchar(8) DEFAULT NULL,
  `activationlink` varchar(12) DEFAULT NULL,
  `activationtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usercreationtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'inactive',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (10,'Haresh','Chauhan','hc@gmail.com','2002-10-03','q0mORTiz','2O9iojdPfTda','2024-03-21 13:21:10','2024-03-21 11:24:13','ccc2d5a2cc23858e0771f9091947acad','active'),(12,'Alpesh','prajapati','alpesh@1gmail.com','2002-06-08','EtL0mDaj','WLdBu1pWk604','2024-03-22 11:12:04','2024-03-22 03:58:14','af98bb6287bb255654d209a1758d4fd7','active'),(13,'vikram','Kanzeriya','vikram@gmail.com','2002-08-30','Lgbbf1f7','wzgZofGWeYG1','2024-03-22 04:31:35','2024-03-22 04:31:35','5d9fe3003a458c7524544d36eeb54f75','active'),(14,'Dhaval','Monani','dhvlmonani@gmail.com','2002-06-24','NFnhp5dj','KqiZ2lwr53DO','2024-03-27 05:03:24','2024-03-22 05:00:25','6969b7f5a4a179283277389a5fc2f1e4','active'),(15,'Dhaval','Monani','dhavalmonani@gmail.com','2002-06-24','DqPEUlpt','MAhUqBcD6xLn','2024-03-22 11:17:24','2024-03-22 05:02:23','b25faa39e595b13edde45e386f222ecd','active'),(16,'Tushar','Shinde','tushar@gmail.com','2002-12-29','cBdy9MCZ','ESJisU5HYmFj','2024-03-22 08:39:11','2024-03-22 08:31:46','23f2fcc042350142eceb23120d3a035c','active'),(17,'Chirag','Kanani','ck@gmail.com','2002-05-20','BfvofT1k','1sY41DRQWSb5','2024-03-28 09:34:14','2024-03-28 09:34:14',NULL,'inactive');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 11:22:25
