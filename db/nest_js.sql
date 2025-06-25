-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3310
-- Generation Time: Jun 25, 2025 at 07:47 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nest_js`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` enum('SUCCESS','PENDING','CANCELED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `image` varchar(255) DEFAULT NULL,
  `categoryId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `status`, `createdAt`, `updatedAt`, `image`, `categoryId`, `userId`) VALUES
('03930aed-f0a4-4d93-90cd-bb6fc85f6a8c', 'VMSphrer', 'server cnofiguration ', 'SUCCESS', '2025-06-18 13:33:01.086742', '2025-06-18 13:33:01.086742', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750228381/articles/i37xqmvdxawdahxq6bpj.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('28a15a74-cd44-43ac-87d4-719c030136b9', 'Java Script', 'Node JS ', 'SUCCESS', '2025-06-18 10:31:13.203084', '2025-06-18 10:31:13.203084', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750217473/articles/upvs7oq7mmlcxfn3nbxc.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('5c8191fd-7f42-494a-a1a8-1a992e356976', 'Bahasa Java', 'lorem ipsum', 'PENDING', '2025-06-17 18:57:48.285220', '2025-06-17 18:57:48.285220', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750161470/articles/lzvai4grcpj8ozxblxxi.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('717a9d35-c8a8-45b3-a754-94da0b764a5e', 'Proxmox server', 'server cnofiguration ', 'SUCCESS', '2025-06-20 15:37:37.200532', '2025-06-20 15:37:37.200532', NULL, '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('83182a9b-b4e8-454c-8f8b-32fc7386b813', 'Bahasa C#', 'lorem ipsum', 'SUCCESS', '2025-06-18 10:30:43.815865', '2025-06-18 10:30:43.815865', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750217444/articles/xdqjgcwdnbqofepdx3jt.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('8577406f-5db5-49a1-8c3d-1d531d4e6c56', 'Solana', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n', 'SUCCESS', '2025-06-18 10:32:15.209813', '2025-06-18 11:29:13.000000', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750217535/articles/rqveo5tostjm67hvfp7v.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('ae7ee005-4c2b-4131-af1f-49f0a50c8f40', 'Proxmox', 'Blockchain Language', 'SUCCESS', '2025-06-18 13:24:07.854262', '2025-06-18 13:24:07.854262', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750227848/articles/md4mwihp9wzd1gj3gn66.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('cdacf10a-705d-4e78-9ed2-b3c4a0d3bc85', 'Flutter', 'dart Language', 'SUCCESS', '2025-06-18 10:31:35.996408', '2025-06-18 10:31:35.996408', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750217496/articles/p18gnsq5er44hphe4fov.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('d2ab6501-5e2e-4397-9b0e-2c8931fdbd5b', 'RedHat server', 'server cnofiguration ', 'SUCCESS', '2025-06-20 15:37:53.607223', '2025-06-20 15:37:53.607223', NULL, '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9'),
('e4a179c9-3258-4064-bc4f-8f6058e414c1', 'Bahasa Python', 'bermain dengan ular', 'PENDING', '2025-06-18 09:37:40.890002', '2025-06-18 10:05:27.000000', 'https://res.cloudinary.com/do5rtp9jr/image/upload/v1750214261/articles/mcxasu9kvevq0smhrscu.png', '90afb307-c7bf-4300-863b-fe332500ea6f', '9767ea1f-9be5-4785-8cf2-c71ec8d453a9');

-- --------------------------------------------------------

--
-- Table structure for table `article_tag`
--

CREATE TABLE `article_tag` (
  `id` varchar(36) NOT NULL,
  `tagId` varchar(255) NOT NULL,
  `articleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `article_tag`
--

INSERT INTO `article_tag` (`id`, `tagId`, `articleId`) VALUES
('02fe78a7-dc91-4436-93a9-d2fc9d23211d', '1de5f13d-c038-4424-8e8e-dd63be225029', 'd2ab6501-5e2e-4397-9b0e-2c8931fdbd5b'),
('0d21aaf9-0148-4a0d-89d7-72aa76e78561', 'd4b663c4-887e-4bf4-b091-9fabf1b26a71', 'ae7ee005-4c2b-4131-af1f-49f0a50c8f40'),
('7bcc057f-3522-4e52-a9f9-a4823d1148a2', 'd4b663c4-887e-4bf4-b091-9fabf1b26a71', '717a9d35-c8a8-45b3-a754-94da0b764a5e'),
('7cf41af5-e7be-4ee7-aa17-f30ed444a535', '1de5f13d-c038-4424-8e8e-dd63be225029', 'ae7ee005-4c2b-4131-af1f-49f0a50c8f40'),
('a0efcf5a-d32d-48a6-a3f3-466f1bdb5c11', '1de5f13d-c038-4424-8e8e-dd63be225029', '717a9d35-c8a8-45b3-a754-94da0b764a5e'),
('acb3fa83-e54c-4511-9e71-a019391cabbb', 'd4b663c4-887e-4bf4-b091-9fabf1b26a71', '03930aed-f0a4-4d93-90cd-bb6fc85f6a8c'),
('b6823c8a-c261-473b-a663-880374015d9c', '1de5f13d-c038-4424-8e8e-dd63be225029', '03930aed-f0a4-4d93-90cd-bb6fc85f6a8c'),
('d2f68a0d-2ad6-4fa5-87d4-18e7155ac676', 'd4b663c4-887e-4bf4-b091-9fabf1b26a71', 'd2ab6501-5e2e-4397-9b0e-2c8931fdbd5b');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
('7ebd1c8c-5f26-4bd4-a47d-1452cff7a21e', 'IT Infrastructure'),
('8b709df0-083f-468f-8dbd-3d9d3da6580a', 'sastra'),
('90afb307-c7bf-4300-863b-fe332500ea6f', 'informatika');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1748407725730, 'InitDatabase1748407725730'),
(2, 1748604131623, 'InitDatabase1748604131623'),
(3, 1748754843678, 'InitDatabase1748754843678'),
(4, 1749614213508, 'InitDaatabase1749614213508'),
(5, 1749654439077, 'InitDaatabase1749654439077'),
(6, 1750223268506, 'InitDatabase1750223268506');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` varchar(36) NOT NULL,
  `age` int NOT NULL,
  `bio` text NOT NULL,
  `userId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `age`, `bio`, `userId`) VALUES
('27fa40ad-102f-40d8-8fff-499db40dd26b', 17, 'jaya ngetes', '291d838c-7cad-4300-a231-bde14f211a57');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
('d4b663c4-887e-4bf4-b091-9fabf1b26a71', 'cloud'),
('1de5f13d-c038-4424-8e8e-dd63be225029', 'server');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('291d838c-7cad-4300-a231-bde14f211a57', 'test', 'tester@email.com', '$2b$10$WF2rPdOf2nvTtv9wJ0kulu4Q0guSlfCEgqqF8/W1QcRwC3wIoatoe', 'user', '2025-06-01 14:11:35.305276', '2025-06-13 19:27:22.000000'),
('5fd11037-e53c-4443-aeb9-6bbbb98999e4', 'bambang', 'bambang@gmail.com', '$2b$10$7lg4vsWloz6rfRVcl5gh2O/slRgrQObcnbEUUoUJ7cShACVaTW/EG', 'admin', '2025-06-04 15:17:24.833513', '2025-06-04 15:22:42.000000'),
('77507c60-b069-40a3-ab1a-94f1db188227', 'User', 'user@email.com', '$2b$10$CJ/PCnvwcdxOr3vu6CplyOvCbAKzshm03uIa7z6aVDE9dOJO8nYhe', 'user', '2025-06-13 19:15:08.912024', '2025-06-13 19:15:08.912024'),
('9767ea1f-9be5-4785-8cf2-c71ec8d453a9', 'admin', 'admin@email.com', '$2b$10$Rx4l.AKiz7zuPiDCrJwDB.OmoHsu3AGVWawH6zdn2Mo7k.z0dglXe', 'admin', '2025-06-01 14:07:36.941112', '2025-06-01 14:07:36.941112'),
('cf43866f-aa15-4d6f-9b5d-2e8dec721084', 'Bram', 'maba@gmail.com', '$2b$10$gxo98vSqqMG3MhtAU5/vbe2esPL4tmdKIr81dM1U3.gmoRkezQ16K', 'user', '2025-06-13 19:05:12.175626', '2025-06-13 19:05:12.175626'),
('f6671308-6f61-48b5-890f-b1ab8e490186', 'jaya', 'jaya@email.com', '$2b$10$rQAMFYhE206kbHobCqAoJuMGS2sJIxDq1EfXxB06QfYUbrm2PT19W', 'user', '2025-06-03 10:04:10.124385', '2025-06-03 10:04:10.124385');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_12824e4598ee46a0992d99ba553` (`categoryId`),
  ADD KEY `FK_636f17dadfea1ffb4a412296a28` (`userId`);

--
-- Indexes for table `article_tag`
--
ALTER TABLE `article_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bbbd0832bdd107597b596d63f69` (`tagId`),
  ADD KEY `FK_602d4921b27c9a7cb6c095992b4` (`articleId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_a24972ebd73b106250713dcddd` (`userId`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_6a9775008add570dc3e5a0bab7` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_065d4d8f3b5adb4a08841eae3c` (`name`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_12824e4598ee46a0992d99ba553` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_636f17dadfea1ffb4a412296a28` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `article_tag`
--
ALTER TABLE `article_tag`
  ADD CONSTRAINT `FK_602d4921b27c9a7cb6c095992b4` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`),
  ADD CONSTRAINT `FK_bbbd0832bdd107597b596d63f69` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
