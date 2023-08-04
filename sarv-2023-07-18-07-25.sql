-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: sarv
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (36,'database/migrations/1687337741378_users',1,'2023-07-13 23:33:57'),(37,'database/migrations/1687337741382_api_tokens',1,'2023-07-13 23:33:57'),(38,'database/migrations/1687359503312_task_categories',1,'2023-07-13 23:33:57'),(39,'database/migrations/1687584282578_task_statuses',1,'2023-07-13 23:33:57'),(40,'database/migrations/1687598913779_tasks',1,'2023-07-13 23:33:58'),(41,'database/migrations/1689548681924_change_priority_to_number_on_tasks',2,'2023-07-16 23:07:18'),(42,'database/migrations/1689549264976_add_status_to_tasks',3,'2023-07-16 23:16:03'),(43,'database/migrations/1689549799451_remove_task_status_id_on_tasks',4,'2023-07-16 23:24:32'),(44,'database/migrations/1689550028428_remove_task_statuses',5,'2023-07-16 23:28:18');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adonis_schema_versions`
--

DROP TABLE IF EXISTS `adonis_schema_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema_versions` (
  `version` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema_versions`
--

LOCK TABLES `adonis_schema_versions` WRITE;
/*!40000 ALTER TABLE `adonis_schema_versions` DISABLE KEYS */;
INSERT INTO `adonis_schema_versions` VALUES (2);
/*!40000 ALTER TABLE `adonis_schema_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_tokens_token_unique` (`token`),
  KEY `api_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tokens`
--

LOCK TABLES `api_tokens` WRITE;
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
INSERT INTO `api_tokens` VALUES (4,4,'Opaque Access Token','api','712f1216d27aca410969637c60c7d88ff40ecaf4b44ed48ba0270c3520bdd081',NULL,'2023-07-15 01:58:25');
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_categories`
--

DROP TABLE IF EXISTS `task_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_categories_user_id_foreign` (`user_id`),
  CONSTRAINT `task_categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_categories`
--

LOCK TABLES `task_categories` WRITE;
/*!40000 ALTER TABLE `task_categories` DISABLE KEYS */;
INSERT INTO `task_categories` VALUES (1,'Sarv BE',4,'2023-07-15 01:58:58','2023-07-15 01:58:58'),(2,'Sarv FE',4,'2023-07-15 01:59:03','2023-07-16 07:40:22');
/*!40000 ALTER TABLE `task_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `due_date` timestamp NULL DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `task_category_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('todo','pending','in-progress','done') DEFAULT 'todo',
  PRIMARY KEY (`id`),
  KEY `tasks_task_category_id_foreign` (`task_category_id`),
  KEY `tasks_user_id_foreign` (`user_id`),
  CONSTRAINT `tasks_task_category_id_foreign` FOREIGN KEY (`task_category_id`) REFERENCES `task_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (16,'Count Task Children',NULL,NULL,1,1,4,'2023-07-15 02:02:40','2023-07-15 02:02:40','todo'),(18,'Task Children',NULL,NULL,1,1,4,'2023-07-15 02:03:40','2023-07-15 02:03:40','todo'),(19,'Bug Cannot Edit Task With Category',NULL,'2023-07-14 17:00:00',3,1,4,'2023-07-15 02:04:00','2023-07-15 02:44:46','done'),(20,'Task Sort Dropdown',NULL,'2023-07-14 17:00:00',2,2,4,'2023-07-15 02:04:34','2023-07-15 05:22:47','done'),(21,'Category Detail','With Tasks List','2023-07-14 17:00:00',2,2,4,'2023-07-15 02:05:05','2023-07-16 12:14:41','done'),(22,'Task List On Dashboard','task due today, task in progress, task high priority',NULL,1,2,4,'2023-07-15 02:06:04','2023-07-15 02:06:04','todo'),(23,'Separate Task List Component',NULL,'2023-07-14 17:00:00',2,2,4,'2023-07-15 02:06:37','2023-07-15 10:17:24','done'),(24,'Separate Task List Filter And Sort Component',NULL,'2023-07-14 17:00:00',2,2,4,'2023-07-15 02:06:58','2023-07-15 08:39:10','done'),(25,'Complete Auth And Profile',NULL,NULL,1,2,4,'2023-07-15 02:07:31','2023-07-15 02:07:31','todo'),(44,'Change Task Priority To Number',NULL,'2023-07-16 17:00:00',3,1,4,'2023-07-16 12:18:19','2023-07-16 23:13:09','done'),(45,'Migrate Task Status To Enum',NULL,'2023-07-15 17:00:00',3,1,4,'2023-07-16 12:18:30','2023-07-16 23:13:23','done'),(46,'Default Due Date Set To End Of The Created Day',NULL,'2023-07-17 17:00:00',2,1,4,'2023-07-16 12:19:21','2023-07-16 12:19:33','todo'),(47,'Filter Using Icon',NULL,NULL,NULL,2,4,'2023-07-16 12:19:51','2023-07-17 13:39:21','todo'),(48,'Applied Filter and Applied Sort Info',NULL,NULL,NULL,2,4,'2023-07-16 12:19:59','2023-07-16 12:19:59','todo'),(49,'Task Precentage',NULL,NULL,NULL,1,4,'2023-07-16 12:21:18','2023-07-16 12:21:18','todo'),(50,'Category Precentage',NULL,NULL,NULL,1,4,'2023-07-16 12:21:25','2023-07-16 12:21:25','todo'),(51,'Default Sort Created At Ascending And High Priority And Due Date',NULL,NULL,NULL,2,4,'2023-07-16 12:21:43','2023-07-16 12:22:01','todo'),(52,'Migrate Priority To Number',NULL,'2023-07-16 17:00:00',3,2,4,'2023-07-16 23:34:14','2023-07-17 23:44:30','done'),(53,'Migrate Status To Enum',NULL,'2023-07-16 17:00:00',3,2,4,'2023-07-16 23:34:41','2023-07-17 23:44:32','in-progress');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(180) NOT NULL,
  `remember_me_token` varchar(255) DEFAULT NULL,
  `photo_src` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'ibrahimalanshor6@gmail.com','Ibrahim Al Anshor','$scrypt$n=16384,r=8,p=1$9g8q87jRpgeQSLU0eQCJuA$CC9vQf3PVQapMsK7TRqgbSritL3CIxPRLRSgNnHgdjPJ2MefgJvsl/km0tTE0YglJk5gmUbIBxanYkwq9OcS3A',NULL,NULL,'2023-07-15 01:58:25','2023-07-15 01:58:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18  7:25:19
