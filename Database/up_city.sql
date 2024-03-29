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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `cityname` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,1,'Vishakhapatnam'),(2,1,'Tirupati'),(3,1,'Kakinada'),(4,1,'Vijaywada'),(5,1,'Kurnool'),(6,2,'Itanagar'),(7,2,'Tawang'),(8,2,'Dirang'),(9,2,'Ziro'),(10,2,'Bomdila'),(11,3,'jorhat'),(12,3,'Dibrugarh'),(13,3,'Nagaon'),(14,3,'Guwahati'),(15,3,'silchar'),(16,4,'patna'),(17,4,'purnia'),(18,4,'gaya'),(19,4,'muzaffarpur'),(20,4,'darbhanga'),(21,5,'raipur'),(22,5,'raigarh'),(23,5,'bilaspur'),(24,5,'korba'),(25,5,'jagdalpur'),(26,6,'panjim'),(27,6,'vasco da gama'),(28,6,'mapusa'),(29,6,'canacona'),(30,6,'margao'),(31,7,'ahmedabad'),(32,7,'surat'),(33,7,'rajkot'),(34,7,'jamnagar'),(35,7,'bhavnagar'),(36,8,'gurugram'),(37,8,'rohtak'),(38,8,'hisar'),(39,8,'karnal'),(40,8,'panipat'),(41,9,'dharmshala'),(42,9,'manali'),(43,9,'parli'),(44,9,'kullu'),(45,9,'solan'),(46,10,'ranchi'),(47,10,'jamshedpur'),(48,10,'dhanbad'),(49,10,'deoghar'),(50,10,'ramgarh'),(51,11,'bengaluru'),(52,11,'mangaluru'),(53,11,'udupi'),(54,11,'belagavi'),(55,11,'tumakuru'),(56,12,'kochi'),(57,12,'kannur'),(58,12,'kottayam'),(59,12,'kollam'),(60,12,'Thiruvananthapuram'),(61,13,'indore'),(62,13,'gwalior'),(63,13,'ratlam'),(64,13,'bhopal'),(65,13,'satna'),(66,14,'mumbai'),(67,14,'nagpur'),(68,14,'pune'),(69,14,'bhiwandi'),(70,14,'satara'),(71,15,'imphal'),(72,15,'andro'),(73,15,'thoubal'),(74,15,'moirang'),(75,15,'ukhurl'),(76,16,'shilong'),(77,16,'jowai'),(78,16,'baghmara'),(79,16,'cherrapunji'),(80,16,'nongpoh'),(81,17,'aizawl'),(82,17,'mamit'),(83,17,'relek'),(84,17,'champhai'),(85,17,'kolasib'),(86,18,'kohima'),(87,18,'wokha'),(88,18,'khonoma'),(89,18,'dimapur'),(90,18,'mon'),(91,19,'bhubhaneshwar'),(92,19,'bhadrak'),(93,19,'sambhalpur'),(94,19,'rourkela'),(95,19,'balasore'),(96,20,'amritsar'),(97,20,'bathinda'),(98,20,'hoshiarpur'),(99,20,'jalandhar'),(100,20,'patiala'),(101,21,'jaipur'),(102,21,'jodhpur'),(103,21,'kota'),(104,21,'bikaner'),(105,21,'udaipur'),(106,22,'rangpo'),(107,22,'gangtok'),(108,22,'jorethang'),(109,22,'mangan'),(110,22,'namchi'),(111,23,'chennai'),(112,23,'coimbatore'),(113,23,'thoothukudi'),(114,23,'salem'),(115,23,'vellore'),(116,24,'hyderabad'),(117,24,'shamshabad'),(118,24,'karimnagar'),(119,24,'vikarabad'),(120,24,'medak'),(121,25,'agartala'),(122,25,'dharmanagar'),(123,25,'pratapgarh'),(124,25,'kailashahar'),(125,25,'belonia'),(126,26,'dehradun'),(127,26,'nainital'),(128,26,'rishikesh'),(129,26,'ranikhet'),(130,26,'auli'),(131,27,'agra'),(132,27,'kanpur'),(133,27,'meerut'),(134,27,'lucknow'),(135,27,'allahabad'),(136,28,'durgapur'),(137,28,'kolkata'),(138,28,'hooghly'),(139,28,'asansol'),(140,28,'silliguri');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
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
