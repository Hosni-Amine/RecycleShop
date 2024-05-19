-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 01:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_laravel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `userid` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `latitude`, `longitude`, `created_at`, `updated_at`, `userid`) VALUES
(1, 35.7648163, 10.8109023, '2024-05-13 21:19:32', '2024-05-16 22:29:26', 2),
(2, 15.8698243, 10.5352367, '2024-05-14 00:24:11', '2024-05-14 00:24:11', 1),
(3, 35.7648322, 100.8108980, '2024-05-14 02:51:37', '2024-05-14 02:51:37', 13),
(5, 35.7647726, 10.8112362, '2024-05-16 19:09:23', '2024-05-16 19:09:23', 13),
(6, 35.7648115, 10.8106394, '2024-05-19 21:25:46', '2024-05-19 21:25:46', 10);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_05_07_161225_create_product_table', 1),
(6, '2024_05_07_161237_add_seller_id_to_products_table', 1),
(7, '2024_05_10_123027_create_orders_table', 1),
(8, '2024_05_10_123124_add_product_id_to_order', 1),
(9, '2024_05_10_140908_add_seller__id_to_order', 1),
(10, '2024_05_13_211715_add_location_table', 2),
(11, '2024_05_13_212637_add_location_userid', 3),
(12, '2024_05_13_213405_add_location_userid', 4),
(13, '2024_05_13_220848_add_userid_to_location', 5),
(14, '2024_05_13_221503_add_location_table', 6),
(15, '2024_05_13_221522_add_userid_to_location', 6);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `price` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `buyerid` bigint(20) UNSIGNED NOT NULL,
  `productid` bigint(20) UNSIGNED NOT NULL,
  `sellerid` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `quantity`, `status`, `price`, `created_at`, `updated_at`, `buyerid`, `productid`, `sellerid`) VALUES
(18, 18, 0, 18.00, '2024-05-19 21:25:04', '2024-05-19 21:25:04', 2, 7, 10),
(19, 10, 0, 25.00, '2024-05-19 21:25:05', '2024-05-19 21:25:05', 2, 8, 10),
(20, 13, 1, 46.41, '2024-05-19 21:25:06', '2024-05-19 21:26:00', 2, 10, 10),
(21, 7, 0, 7.00, '2024-05-19 21:46:08', '2024-05-19 21:46:08', 2, 7, 10),
(22, 8, 0, 20.00, '2024-05-19 21:46:09', '2024-05-19 21:46:09', 2, 8, 10),
(23, 8, 0, 28.56, '2024-05-19 21:46:10', '2024-05-19 21:46:10', 2, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sellerid` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `quantity`, `image`, `category`, `price`, `created_at`, `updated_at`, `sellerid`) VALUES
(7, 'First class Plastic', 'This is the first recyclable stuff for water bottles.', 1000, 'HUGFC6PAtJbtJsBp.jpg', 'Plastic', 1.00, '2024-05-19 19:00:58', '2024-05-19 19:00:58', 10),
(8, 'Plastic PET', 'is the most common thermoplastic polymer resin of the polyester family and is used in fibres for clothing, containers for liquids and foods, and thermoforming for manufacturing.', 950, 'kRFx4SFhhH8JQGm0.webp', 'Plastic', 2.50, '2024-05-19 19:05:23', '2024-05-19 19:05:23', 10),
(10, 'Polyethylene Terephthalate (PETE)', 'This is one of the most commonly used plastics. It’s lightweight, strong, typically transparent and is often used in food packaging and fabrics (polyester).', 5410, 'li4pIArTMMXHtgAX.jpg', 'Plastic', 3.57, '2024-05-19 19:08:51', '2024-05-19 19:08:51', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `locationid` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `email_verified_at`, `password`, `address`, `phone`, `userType`, `remember_token`, `created_at`, `updated_at`, `locationid`) VALUES
(1, 'amine', 'hosni', 'amine.hosni02@gmail.comd', NULL, 'amine.hosni02@gmail.com', 'N18 cite snit', '99949976844', 'Admin', NULL, '2024-05-10 13:14:41', '2024-05-18 16:18:31', NULL),
(2, 'miled', 'miled', 'miled@miled', NULL, 'miled@miled', 'N18 cite snit', '456456', 'Client', NULL, '2024-05-10 13:15:05', '2024-05-16 00:14:38', NULL),
(3, 'miloud', 'millaaa', 'miled@miled1', NULL, 'miled@miled', 'N18 cite snit', '9999976844', 'Client', NULL, '2024-05-10 13:15:25', '2024-05-16 00:14:41', NULL),
(4, 'milede', 'hosnie', 'miled@miled2e', NULL, '123123', 'N18 cite snit', '1232312311', 'Client', NULL, '2024-05-10 13:32:33', '2024-05-16 00:14:52', NULL),
(5, 'mileddd', 'mileddd', 'mileddd@mileddd', NULL, 'mileddd', 'miledddmiledddmileddd', '5546456', 'Client', NULL, '2024-05-13 20:54:40', '2024-05-16 00:14:57', NULL),
(6, 'zzzzzz', 'zzzzzz', 'zzzzzz@zzzzzz', NULL, 'zzzzzz', 'zzzzzzzzzzzzzzzzzzzzzzzz', '846551', 'Client', NULL, '2024-05-13 22:34:36', '2024-05-13 22:34:36', NULL),
(7, 'amine', 'hosni', 'azertezrtez@azertezrtez', NULL, 'azertezrtez', 'N18 cite snit', '999997685', 'Seller', NULL, '2024-05-13 22:48:17', '2024-05-13 22:48:17', NULL),
(8, 'mounir', 'mounir', 'mounir@mounir', NULL, 'mounir', 'mounir', '89465156', 'Seller', NULL, '2024-05-14 00:12:58', '2024-05-14 00:12:58', NULL),
(9, 'coords', 'coords', 'coords@coords', NULL, 'coords', 'coordscoords', '89465', 'Seller', NULL, '2024-05-14 00:14:29', '2024-05-14 00:14:29', NULL),
(10, 'Bel haj', 'Miled', 'Miled@gmail.com', NULL, 'Miled', 'C2 Bizert bhira', '21612121212', 'Seller', NULL, '2024-05-14 00:15:17', '2024-05-19 21:25:49', NULL),
(11, 'zert', 'zertzert', 'zert@zert', NULL, 'zert', 'zertzert', '8456156', 'Seller', NULL, '2024-05-14 00:22:29', '2024-05-14 00:22:29', NULL),
(12, 'zert', 'zertzert', 'zert@zert21', NULL, 'zert', 'zertzert', '84561564', 'Seller', NULL, '2024-05-14 00:24:11', '2024-05-14 00:24:11', NULL),
(13, 'zaer', 'ze', '21aze@aze', NULL, 'aze@aze', '456ds51', '465132', 'Seller', NULL, '2024-05-14 02:51:37', '2024-05-14 02:51:37', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `locations_userid_foreign` (`userid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_buyerid_foreign` (`buyerid`),
  ADD KEY `orders_productid_foreign` (`productid`),
  ADD KEY `orders_sellerid_foreign` (`sellerid`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_sellerid_foreign` (`sellerid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_locationid_foreign` (`locationid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_userid_foreign` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_buyerid_foreign` FOREIGN KEY (`buyerid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_productid_foreign` FOREIGN KEY (`productid`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_sellerid_foreign` FOREIGN KEY (`sellerid`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_sellerid_foreign` FOREIGN KEY (`sellerid`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
