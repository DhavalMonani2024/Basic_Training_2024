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
-- Table structure for table `educational_details`
--

DROP TABLE IF EXISTS `educational_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educational_details` (
  `id` int DEFAULT NULL,
  `ssc_board` varchar(100) DEFAULT NULL,
  `ssc_year` int DEFAULT NULL,
  `ssc_percentage` int DEFAULT NULL,
  `hsc_board` varchar(100) DEFAULT NULL,
  `hsc_year` int DEFAULT NULL,
  `hsc_percentage` int DEFAULT NULL,
  `bachelor_degree` varchar(100) DEFAULT NULL,
  `bachelor_university` varchar(100) DEFAULT NULL,
  `bachelor_year` int DEFAULT NULL,
  `bachelor_percentage` int DEFAULT NULL,
  `master_degree` varchar(100) DEFAULT NULL,
  `master_university` varchar(100) DEFAULT NULL,
  `master_year` int DEFAULT NULL,
  `master_percentage` int DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educational_details`
--

LOCK TABLES `educational_details` WRITE;
/*!40000 ALTER TABLE `educational_details` DISABLE KEYS */;
INSERT INTO `educational_details` VALUES (122,'GSEB',2018,89,'GSHSEB',2020,73,'BTECH','GTU',2024,80,NULL,NULL,NULL,NULL),(123,'gseb',2018,99,'GSHSEB',2020,99,'BTECH','GTU',2024,99,NULL,NULL,NULL,NULL),(125,'GSEB',2017,69,'GSHSEB',2019,55,'BSC(IT)','SAURASHTRA UNIVERSITY',2024,81,'MCA','Dharmsinh Desai University',2024,75),(126,'GSEB',2017,99,'GSHSEB',2019,99,'BTECH','GTU',2022,99,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `educational_details` ENABLE KEYS */;
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
