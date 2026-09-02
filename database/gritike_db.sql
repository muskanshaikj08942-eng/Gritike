-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: gritike_db
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `product_id` bigint NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `selected_size` varchar(255) NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,'/uploads/obsidian.jpg',7999,1,'Obsidian Power Dress',1,'L',4),(2,'https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800',7999,25,'Obsidian Power Dress',1,'L',5),(3,'https://images.pexels.com/photos/19344082/pexels-photo-19344082.jpeg?auto=compress&cs=tinysrgb&w=800',8299,5,'Emerald Shadow Statement Dress',1,'L',5),(4,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'M',5),(5,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'L',5),(6,'https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800',7999,25,'Obsidian Power Dress',1,'L',6),(7,'https://images.pexels.com/photos/19344082/pexels-photo-19344082.jpeg?auto=compress&cs=tinysrgb&w=800',8299,5,'Emerald Shadow Statement Dress',1,'L',6),(8,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'M',6),(9,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'L',6),(10,'https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800',7999,25,'Obsidian Power Dress',1,'L',7),(11,'https://images.pexels.com/photos/19344082/pexels-photo-19344082.jpeg?auto=compress&cs=tinysrgb&w=800',8299,5,'Emerald Shadow Statement Dress',1,'L',7),(12,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'M',7),(13,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'L',7),(14,'https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800',7999,25,'Obsidian Power Dress',1,'L',8),(15,'https://images.pexels.com/photos/19344082/pexels-photo-19344082.jpeg?auto=compress&cs=tinysrgb&w=800',8299,5,'Emerald Shadow Statement Dress',1,'L',8),(16,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'M',8),(17,'https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800',8499,16,'Champagne Muse Dress',1,'L',8);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `order_date` datetime(6) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total_amount` double NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `pin_code` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'muskan.demo@gmail.com','2026-08-27 21:36:04.438049','PLACED',33296,'yunus buidlijng 16','mumbai','Muskan','Demo','cod','8965479963','400020','maharastra'),(2,'test@gmail.com','2026-08-27 22:20:42.387315','PLACED',33296,'123 Main Street','mumbai','Sohil','shaikh','cod','9876543210','400003','maharastra'),(3,'test@gmail.com','2026-08-27 22:29:29.546791','PLACED',33296,'123 Main Street','mumbai','Sohil','shaikh','cod','9876543210','40040','maharastra'),(4,'test@gmail.com','2026-08-27 22:57:55.364523','PLACED',33296,'123 Main Street','Mumbai','Sohil','Shaikh','cod','9876543210','400001','Maharashtra'),(5,'test@gmail.com','2026-08-27 23:09:12.249233','PLACED',33296,'123 Main Street','mumbai','Sohil','shaikh','cod','9876543210','20003','maharastra'),(6,'test@gmail.com','2026-08-27 23:18:34.110317','PLACED',33296,'123 Main Street','mumbai','Sohil','shaikh','cod','9876543210','40002','maharastra'),(7,'test@gmail.com','2026-08-27 23:24:41.786789','PLACED',33296,'123 Main Street','mumbai','Sohil','shaikh','cod','9876543210','40002','maharastra'),(8,'muskan.demo@gmail.com','2026-08-27 23:26:15.591884','PLACED',33296,'yunus buidlijng 16','mumbai','Muskan','Demo','cod','8965479963','400030','maharastra');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Dresses','Elegant premium evening dress','dress.jpg','Royal Evening Dress',4999),(2,'Dresses','A graceful rose pink dress designed with a flowing silhouette for elegant evening occasions.',NULL,'Rose Pink Evening Dress',2499),(3,'Dresses','A sophisticated black dress combining timeless elegance with a modern silhouette.',NULL,'Midnight Black Dress',2799),(4,'Dresses','A beautiful floral dress designed for a fresh and effortless everyday look.',NULL,'Floral Summer Dress',1899),(5,'Festive Wear','A sophisticated festive outfit inspired by traditional Indian elegance.',NULL,'Royal Festive Outfit',2999),(6,'Sarees','A sophisticated Indian saree look designed to represent elegance, heritage and modern confidence.',NULL,'Premium Traditional Saree',3999),(7,'Sarees','A timeless white saree paired with a striking traditional look for elegant cultural occasions.',NULL,'Elegant White Saree',2899),(8,'Festive Wear','An intricate traditional outfit featuring rich colors and detailed styling for festive celebrations.',NULL,'Maroon Embroidered Festive Wear',3799),(9,'Sarees','A graceful pink saree inspired by traditional Indian craftsmanship and timeless feminine style.',NULL,'Pink Heritage Saree',3199),(10,'Festive Wear','A luxurious traditional outfit designed to bring elegance and sophistication to special occasions.',NULL,'Golden Festive Ensemble',3499),(11,'Dresses','A graceful rose pink dress designed with a flowing silhouette for elegant evening occasions.',NULL,'Rose Pink Evening Dress',2499),(12,'Dresses','Elegant premium evening dress designed for sophisticated occasions.',NULL,'Royal Evening Dress',4999);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Elegant premium evening dress','https://images.unsplash.com/photo-1566174053879-31528523f8ae','Royal Evening Dress',4999,NULL),(5,'A rich emerald statement dress with a sculpted modern silhouette and polished finish, created for confident entrances, cocktail evenings and luxury celebrations.','https://images.pexels.com/photos/19344082/pexels-photo-19344082.jpeg?auto=compress&cs=tinysrgb&w=800','Emerald Shadow Statement Dress',8299,'Designer Dresses'),(10,'A modern plum saree with midnight tones and champagne-gold detailing, designed for elegant evening parties and luxury celebrations.','https://images.pexels.com/photos/13057798/pexels-photo-13057798.jpeg?auto=compress&cs=tinysrgb&w=800','Plum Noir Couture Saree',8999,'Couture Sarees'),(11,'A soft rose-toned saree with elegant detailing and a sleek contemporary drape, designed for romantic evenings, receptions and sophisticated celebrations.','https://images.pexels.com/photos/36951355/pexels-photo-36951355.jpeg?auto=compress&cs=tinysrgb&w=800','Rose Quartz Luxe Saree',8299,'Luxury Sarees'),(12,'An elegant ivory saree with a refined silhouette and subtle luminous detailing, created for modern brides, receptions and intimate luxury occasions.','https://images.pexels.com/photos/12850132/pexels-photo-12850132.jpeg?auto=compress&cs=tinysrgb&w=800','Ivory Pearl Couture Saree',8799,'Couture Sarees'),(13,'A rich burgundy statement saree featuring a sophisticated drape and contemporary styling, perfect for evening parties, date nights and glamorous celebrations.','https://images.pexels.com/photos/13162246/pexels-photo-13162246.jpeg?auto=compress&cs=tinysrgb&w=800','Burgundy Muse Saree',8999,'Designer Sarees'),(14,'A striking cobalt saree designed with a clean modern silhouette and pearl-inspired accents, made for confident entrances, celebrations and luxury evenings.','https://images.pexels.com/photos/17503287/pexels-photo-17503287.jpeg?auto=compress&cs=tinysrgb&w=800','Cobalt Pearl Statement Saree',9299,'Statement Sarees'),(16,'An elegant champagne-toned dress with a graceful silhouette and polished finish, created for sophisticated evenings, receptions and exclusive occasions.','https://images.pexels.com/photos/13057768/pexels-photo-13057768.jpeg?auto=compress&cs=tinysrgb&w=800','Champagne Muse Dress',8499,'Luxury Dresses'),(17,'A striking amethyst-purple gown featuring a sculpted silhouette and luxurious evening finish, designed for confident entrances and glamorous celebrations.','https://images.pexels.com/photos/13057761/pexels-photo-13057761.jpeg?auto=compress&cs=tinysrgb&w=800','Royal Amethyst Gown',9499,'Couture Dresses'),(18,'A luminous metallic evening dress with a sleek contemporary silhouette and high-fashion finish, designed for parties, fashion nights and statement occasions.','https://images.pexels.com/photos/13364873/pexels-photo-13364873.jpeg?auto=compress&cs=tinysrgb&w=800','Silver Chrome Couture',9999,'Couture Dresses'),(19,'A refined ivory designer dress with delicate embellishment and a graceful modern silhouette, perfect for receptions, celebrations and sophisticated evening occasions.','https://images.pexels.com/photos/34376107/pexels-photo-34376107.jpeg?auto=compress&cs=tinysrgb&w=800','Ivory Élan Dress',9299,'Designer Dresses'),(20,'A timeless black couture dress with a clean sculpted silhouette and sophisticated finish, designed for modern elegance at parties and exclusive evening events.','https://images.pexels.com/photos/32322502/pexels-photo-32322502.jpeg?auto=compress&cs=tinysrgb&w=800','Noir Sculpted Evening Dress',8999,'Luxury Dresses'),(21,'A polished mocha satin co-ord with a relaxed tailored silhouette, designed for effortless luxury from brunch dates to evening gatherings.','https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800','Mocha Satin Co-ord',6999,'Luxury Co-ords'),(22,'A graceful powder-blue couture gown with a fluid silhouette and refined finish, created for receptions, galas and unforgettable evening moments.','https://images.pexels.com/photos/34414849/pexels-photo-34414849.jpeg?auto=compress&cs=tinysrgb&w=800','Celeste Blue Couture Gown',9499,'Couture Gowns'),(23,'A rich burgundy statement dress with a sleek silhouette and luxurious evening appeal, designed for confident entrances and intimate celebrations.','https://images.pexels.com/photos/35661024/pexels-photo-35661024.jpeg?auto=compress&cs=tinysrgb&w=800','Burgundy Velvet Muse',8799,'Occasionwear'),(24,'A luminous gold gown with a clean modern silhouette and understated glamour, designed for cocktail evenings, celebrations and luxury events.','https://images.pexels.com/photos/36849246/pexels-photo-36849246.jpeg?auto=compress&cs=tinysrgb&w=800','Golden Hour Gown',9999,'Luxury Gowns'),(25,'A sharp black statement dress combining a clean silhouette with modern tailoring, designed for confident city nights and exclusive occasions.','https://images.pexels.com/photos/29103505/pexels-photo-29103505.jpeg?auto=compress&cs=tinysrgb&w=800','Obsidian Power Dress',7999,'Statement Dresses'),(26,'A luminous silver metallic dress with a sleek contemporary silhouette, created for fashion nights, cocktail events and glamorous celebrations.','https://images.pexels.com/photos/13364873/pexels-photo-13364873.jpeg?auto=compress&cs=tinysrgb&w=800','Silver Mist Metallic Dress',9499,'Metallic Couture'),(27,'A contemporary forest-toned Indo-Western ensemble blending traditional elegance with a sleek modern silhouette for elevated celebrations and evening events.','https://images.pexels.com/photos/33048506/pexels-photo-33048506.jpeg?auto=compress&cs=tinysrgb&w=800','Forest Noir Indo-Western Set',8299,'Indo-Western'),(28,'A refined ivory dress with a clean silhouette and delicate detailing, designed for understated luxury, receptions and elegant daytime occasions.','https://images.pexels.com/photos/12001287/pexels-photo-12001287.jpeg?auto=compress&cs=tinysrgb&w=800','Ivory Pearl Minimalist Dress',7499,'Minimalist Luxury');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'muskan.demo@gmail.com','Muskan Demo','$2a$10$2BNfy8RfZzQ02DYDz6CEVO5benOenGDAMNoo4omae9Fx7heVkvExu','USER'),(2,'muskanshaikj08942@gmail.com','harish','$2a$10$uEg7xAxjHYYNUH3J4k1G6eRCWw5.KCUYKLiD27q.3ASpbnp8aS2CO','ADMIN'),(3,'muskannew@gmail.com','hamza','$2a$10$iynmmaSSN/Ah/NTyZZ1.xuhvI8IR7ly29w4cx37FoUq.2Br3jjB1C','USER'),(4,'test@gmail.com','Test User','$2a$10$ajQEr47eBVGGDCn1TiHuVexf3Vfr69fFObyfmiXuUO4ZnJHSQ1xjm','USER');
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

-- Dump completed on 2026-09-02 18:31:15
