-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 03:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `landshield`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_customer`
--

CREATE TABLE `api_customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `address` longtext NOT NULL,
  `aadhar_number` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_customer`
--

INSERT INTO `api_customer` (`customer_id`, `name`, `email`, `mobile_number`, `address`, `aadhar_number`) VALUES
(1, 'swsw', 'kcvineesh@gmail.com', '9113508529', '756', '3546563'),
(3, 'admin3', 'admin3@gmail.com', '911350529', 'ccc', '354465');

-- --------------------------------------------------------

--
-- Table structure for table `api_customuser`
--

CREATE TABLE `api_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `address` longtext NOT NULL,
  `customer_type` varchar(10) NOT NULL,
  `customer_role` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `created_by_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_customuser`
--

INSERT INTO `api_customuser` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `mobile_number`, `address`, `customer_type`, `customer_role`, `status`, `created_by_id`) VALUES
(1, 'pbkdf2_sha256$720000$aUxJwY6Lhh79fV8elQ5Z3M$dCbkH0ThNv7x7ohddlo9xjdgGjHxljafNDlD3i2EFp4=', '2024-10-31 07:58:18.000000', 1, 'admin', '', '', 'admin@gmail.com', 1, 1, '2024-10-31 07:58:04.000000', '911350852', 'ddddddddd', 'project', 'super', 'active', NULL),
(2, 'pbkdf2_sha256$720000$JbSrdTXAptufkxMBZj8dn6$p7LGW7ShB9PUnPqlBkfqm9ehR8OsmUrTWUOBdbJTK1U=', NULL, 0, 'admin2', '', '', '', 0, 1, '2024-11-05 10:30:52.183530', '911350852', 'admin2', 'property', 'super', 'active', NULL),
(3, 'pbkdf2_sha256$720000$Sqkt6q2RATeyJbeqikQauZ$yxmWdCcvOoPddNWESPkzxxOtDd38NljfUlMx30+bQvc=', NULL, 0, 'admin4', '', '', 'admin4@gmail.com', 0, 1, '2024-11-07 08:21:34.394239', '9113508529', 'dasfdg', 'project', 'manager', 'active', 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_customuser_groups`
--

CREATE TABLE `api_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_customuser_user_permissions`
--

CREATE TABLE `api_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_device`
--

CREATE TABLE `api_device` (
  `id` bigint(20) NOT NULL,
  `device_id` varchar(100) NOT NULL,
  `battery_status` varchar(100) NOT NULL,
  `device_status` tinyint(1) NOT NULL,
  `device_type_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_device`
--

INSERT INTO `api_device` (`id`, `device_id`, `battery_status`, `device_status`, `device_type_id`, `customer_id`) VALUES
(1, '1234567', '0', 1, 1, 1),
(2, 'Dileep4', '45', 0, 1, 1),
(3, 'Dileep1', '56', 1, 2, 1),
(4, 'Dileep11', '50', 1, 2, 2),
(5, 'Dileep10', '60', 1, 1, 2),
(6, 'Dileep12', '70', 1, 1, 2),
(7, 'Dileep5', '80', 1, 1, 2),
(8, 'dileep20', '', 1, 1, 2),
(9, 'dileep21', '', 0, 1, 2),
(10, 'Dileep22', '', 1, 1, 1),
(11, 'Dileep26', '', 1, 1, 1),
(12, '333', '', 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_devicegeopoint`
--

CREATE TABLE `api_devicegeopoint` (
  `id` bigint(20) NOT NULL,
  `device_movement` int(11) NOT NULL,
  `last_updated` date NOT NULL,
  `device_id` bigint(20) DEFAULT NULL,
  `geolocation_id` bigint(20) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_devicegeopoint`
--

INSERT INTO `api_devicegeopoint` (`id`, `device_movement`, `last_updated`, `device_id`, `geolocation_id`, `project_id`) VALUES
(1, 1, '2024-11-06', 2, 1, 1),
(2, 0, '2024-11-05', 1, 2, 1),
(3, 0, '2024-11-05', NULL, 5, 1),
(4, 0, '2024-11-05', NULL, 6, 1),
(5, 1, '2024-11-06', NULL, 7, 1),
(9, 1, '2024-11-07', 10, 12, 2),
(10, 0, '2024-11-07', 11, 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `api_devicegeopointworkingold`
--

CREATE TABLE `api_devicegeopointworkingold` (
  `id` bigint(20) NOT NULL,
  `device_movement` int(11) NOT NULL,
  `last_updated` date NOT NULL,
  `device_id` bigint(20) DEFAULT NULL,
  `geolocation_id` bigint(20) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_devicestatus`
--

CREATE TABLE `api_devicestatus` (
  `id` bigint(20) NOT NULL,
  `device_id` varchar(100) NOT NULL,
  `battery_status` varchar(100) NOT NULL,
  `device_status` tinyint(1) NOT NULL,
  `device_log` varchar(100) NOT NULL,
  `device_lat` varchar(100) NOT NULL,
  `device_gforce` varchar(100) NOT NULL,
  `device_movement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_devicetype`
--

CREATE TABLE `api_devicetype` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_devicetype`
--

INSERT INTO `api_devicetype` (`id`, `name`, `status`) VALUES
(1, 'Bluetooth', 1),
(2, 'GSM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_district`
--

CREATE TABLE `api_district` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_district`
--

INSERT INTO `api_district` (`id`, `name`) VALUES
(1, 'Bangalore');

-- --------------------------------------------------------

--
-- Table structure for table `api_geolocation`
--

CREATE TABLE `api_geolocation` (
  `id` bigint(20) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `property_registration_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_geolocation`
--

INSERT INTO `api_geolocation` (`id`, `latitude`, `longitude`, `property_registration_id`) VALUES
(1, 11122, 2222, 1),
(2, 2333, 222, 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_project`
--

CREATE TABLE `api_project` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_state` varchar(100) NOT NULL,
  `project_city` varchar(100) NOT NULL,
  `project_descriptions` varchar(100) NOT NULL,
  `customer_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_project`
--

INSERT INTO `api_project` (`project_id`, `project_name`, `project_state`, `project_city`, `project_descriptions`, `customer_id`) VALUES
(1, 'test', 'test2', 'project3', 'project1', 1),
(2, 'project2', 'project2', 'project2', '', 1),
(3, 'project3', 'project3', 'project3', '', 2),
(5, 'Peenya Gas Line', 'karnataka', 'bangalore', 'peenya', 1),
(6, 'Chennai-bangalore line', 'Karnataka', 'bangalore', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_projectgeolocation`
--

CREATE TABLE `api_projectgeolocation` (
  `id` bigint(20) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `refference_name` varchar(100) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_projectgeolocation`
--

INSERT INTO `api_projectgeolocation` (`id`, `latitude`, `longitude`, `refference_name`, `project_id`) VALUES
(1, 122, 1222, '333', 1),
(2, 444444, 4444444, '444', 1),
(5, 8888, 77, '99', 1),
(6, 9999, 9877, '999', 1),
(7, 99, 7777, '333', 1),
(12, 13.0519, 77.5416, '1', 2),
(13, 13.0508, 77.5154, '77.5154', 2),
(15, 777777777, 7.777777777777778e18, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_property`
--

CREATE TABLE `api_property` (
  `property_id` int(11) NOT NULL,
  `property_name` varchar(100) NOT NULL,
  `survey_number` varchar(100) NOT NULL,
  `survey_sub_division` varchar(100) NOT NULL,
  `patta_number` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `fmb` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL,
  `taluk_id` bigint(20) NOT NULL,
  `village_id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_property`
--

INSERT INTO `api_property` (`property_id`, `property_name`, `survey_number`, `survey_sub_division`, `patta_number`, `area`, `fmb`, `district_id`, `taluk_id`, `village_id`, `customer_id`) VALUES
(1, 'SM layout', '123444', '4444', '444', '444', 'fmb_pdfs/download_EkvBe00.jpg', 1, 1, 1, 1),
(2, 'SM Layout', '1234566', '67788', '1233', '444', 'fmb_pdfs/download_5MwclJp.jpg', 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `api_propertydevice`
--

CREATE TABLE `api_propertydevice` (
  `id` bigint(20) NOT NULL,
  `updated` date NOT NULL,
  `last_updated` date NOT NULL,
  `customer_id_id` int(11) NOT NULL,
  `property_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_propertydevice`
--

INSERT INTO `api_propertydevice` (`id`, `updated`, `last_updated`, `customer_id_id`, `property_id_id`) VALUES
(1, '2024-11-05', '2024-11-05', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_propertydevicedevice`
--

CREATE TABLE `api_propertydevicedevice` (
  `id` bigint(20) NOT NULL,
  `device_movement` int(11) NOT NULL,
  `last_updated` date NOT NULL,
  `device_id` bigint(20) NOT NULL,
  `geolocation_id` bigint(20) NOT NULL,
  `property_device_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_propertydevicedevice`
--

INSERT INTO `api_propertydevicedevice` (`id`, `device_movement`, `last_updated`, `device_id`, `geolocation_id`, `property_device_id`) VALUES
(1, 0, '2024-11-05', 2, 1, 1),
(2, 0, '2024-11-05', 3, 2, 1),
(3, 0, '2024-11-05', 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_propertydevicegeopoint`
--

CREATE TABLE `api_propertydevicegeopoint` (
  `id` bigint(20) NOT NULL,
  `device_movement` int(11) NOT NULL,
  `last_updated` date NOT NULL,
  `device_id` bigint(20) DEFAULT NULL,
  `property_id` int(11) NOT NULL,
  `geolocation_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_propertydevicegeopoint`
--

INSERT INTO `api_propertydevicegeopoint` (`id`, `device_movement`, `last_updated`, `device_id`, `property_id`, `geolocation_id`) VALUES
(1, 0, '2024-11-05', 1, 1, 1),
(2, 0, '2024-11-05', NULL, 1, 2),
(3, 0, '2024-11-05', 2, 1, 4),
(5, 0, '2024-11-06', 7, 2, 5),
(6, 0, '2024-11-06', 5, 2, 6),
(7, 0, '2024-11-06', 4, 2, 7),
(8, 1, '2024-11-07', 8, 2, 8),
(9, 0, '2024-11-06', 9, 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `api_propertygeolocation`
--

CREATE TABLE `api_propertygeolocation` (
  `id` bigint(20) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `refference_name` varchar(100) NOT NULL,
  `property_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_propertygeolocation`
--

INSERT INTO `api_propertygeolocation` (`id`, `latitude`, `longitude`, `refference_name`, `property_id`) VALUES
(1, 1.233499999999999e15, 3.339999999999999e15, '333399', 1),
(2, 555555555, 555555555555, '444xx', 1),
(4, 1111, 1111, '2222', 1),
(5, 9.286700326184762, 79.15421339506354, '66666', 2),
(6, 9.286415379407138, 79.15475345305232, '77.5479', 2),
(7, 9.286128835480879, 79.1546387886148, '77.5479', 2),
(8, 9.286134594793916, 79.1545517332303, '77.594566', 2),
(9, 9.285868238846316, 79.15425040427135, 'test', 2);

-- --------------------------------------------------------

--
-- Table structure for table `api_propertyregistration`
--

CREATE TABLE `api_propertyregistration` (
  `id` bigint(20) NOT NULL,
  `property_id` varchar(100) NOT NULL,
  `property_name` varchar(100) NOT NULL,
  `survey_number` varchar(100) NOT NULL,
  `survey_sub_division` varchar(100) NOT NULL,
  `patta_number` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `fmb` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL,
  `taluk_id` bigint(20) NOT NULL,
  `village_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_propertyregistration`
--

INSERT INTO `api_propertyregistration` (`id`, `property_id`, `property_name`, `survey_number`, `survey_sub_division`, `patta_number`, `area`, `fmb`, `district_id`, `taluk_id`, `village_id`) VALUES
(1, '1000', 'ss', 'sss', 'sss', 'ss', 'sss', 'fmb_pdfs/download_f4raQIZ.jpg', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_taluk`
--

CREATE TABLE `api_taluk` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_taluk`
--

INSERT INTO `api_taluk` (`id`, `name`, `district_id`) VALUES
(1, 'Yeshwathpur', 1);

-- --------------------------------------------------------

--
-- Table structure for table `api_village`
--

CREATE TABLE `api_village` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL,
  `taluk_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_village`
--

INSERT INTO `api_village` (`id`, `name`, `district_id`, `taluk_id`) VALUES
(1, 'Jalahalli', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add customer', 6, 'add_customer'),
(22, 'Can change customer', 6, 'change_customer'),
(23, 'Can delete customer', 6, 'delete_customer'),
(24, 'Can view customer', 6, 'view_customer'),
(25, 'Can add device status', 7, 'add_devicestatus'),
(26, 'Can change device status', 7, 'change_devicestatus'),
(27, 'Can delete device status', 7, 'delete_devicestatus'),
(28, 'Can view device status', 7, 'view_devicestatus'),
(29, 'Can add device type', 8, 'add_devicetype'),
(30, 'Can change device type', 8, 'change_devicetype'),
(31, 'Can delete device type', 8, 'delete_devicetype'),
(32, 'Can view device type', 8, 'view_devicetype'),
(33, 'Can add district', 9, 'add_district'),
(34, 'Can change district', 9, 'change_district'),
(35, 'Can delete district', 9, 'delete_district'),
(36, 'Can view district', 9, 'view_district'),
(37, 'Can add geolocation', 10, 'add_geolocation'),
(38, 'Can change geolocation', 10, 'change_geolocation'),
(39, 'Can delete geolocation', 10, 'delete_geolocation'),
(40, 'Can view geolocation', 10, 'view_geolocation'),
(41, 'Can add project', 11, 'add_project'),
(42, 'Can change project', 11, 'change_project'),
(43, 'Can delete project', 11, 'delete_project'),
(44, 'Can view project', 11, 'view_project'),
(45, 'Can add device', 12, 'add_device'),
(46, 'Can change device', 12, 'change_device'),
(47, 'Can delete device', 12, 'delete_device'),
(48, 'Can view device', 12, 'view_device'),
(49, 'Can add project geolocation', 13, 'add_projectgeolocation'),
(50, 'Can change project geolocation', 13, 'change_projectgeolocation'),
(51, 'Can delete project geolocation', 13, 'delete_projectgeolocation'),
(52, 'Can view project geolocation', 13, 'view_projectgeolocation'),
(53, 'Can add property device', 14, 'add_propertydevice'),
(54, 'Can change property device', 14, 'change_propertydevice'),
(55, 'Can delete property device', 14, 'delete_propertydevice'),
(56, 'Can view property device', 14, 'view_propertydevice'),
(57, 'Can add property device device', 15, 'add_propertydevicedevice'),
(58, 'Can change property device device', 15, 'change_propertydevicedevice'),
(59, 'Can delete property device device', 15, 'delete_propertydevicedevice'),
(60, 'Can view property device device', 15, 'view_propertydevicedevice'),
(61, 'Can add property registration', 16, 'add_propertyregistration'),
(62, 'Can change property registration', 16, 'change_propertyregistration'),
(63, 'Can delete property registration', 16, 'delete_propertyregistration'),
(64, 'Can view property registration', 16, 'view_propertyregistration'),
(65, 'Can add taluk', 17, 'add_taluk'),
(66, 'Can change taluk', 17, 'change_taluk'),
(67, 'Can delete taluk', 17, 'delete_taluk'),
(68, 'Can view taluk', 17, 'view_taluk'),
(69, 'Can add village', 18, 'add_village'),
(70, 'Can change village', 18, 'change_village'),
(71, 'Can delete village', 18, 'delete_village'),
(72, 'Can view village', 18, 'view_village'),
(73, 'Can add user', 19, 'add_customuser'),
(74, 'Can change user', 19, 'change_customuser'),
(75, 'Can delete user', 19, 'delete_customuser'),
(76, 'Can view user', 19, 'view_customuser'),
(77, 'Can add device geo point', 20, 'add_devicegeopoint'),
(78, 'Can change device geo point', 20, 'change_devicegeopoint'),
(79, 'Can delete device geo point', 20, 'delete_devicegeopoint'),
(80, 'Can view device geo point', 20, 'view_devicegeopoint'),
(81, 'Can add device geo pointworkingold', 21, 'add_devicegeopointworkingold'),
(82, 'Can change device geo pointworkingold', 21, 'change_devicegeopointworkingold'),
(83, 'Can delete device geo pointworkingold', 21, 'delete_devicegeopointworkingold'),
(84, 'Can view device geo pointworkingold', 21, 'view_devicegeopointworkingold'),
(85, 'Can add property', 22, 'add_property'),
(86, 'Can change property', 22, 'change_property'),
(87, 'Can delete property', 22, 'delete_property'),
(88, 'Can view property', 22, 'view_property'),
(89, 'Can add property device geo point', 23, 'add_propertydevicegeopoint'),
(90, 'Can change property device geo point', 23, 'change_propertydevicegeopoint'),
(91, 'Can delete property device geo point', 23, 'delete_propertydevicegeopoint'),
(92, 'Can view property device geo point', 23, 'view_propertydevicegeopoint'),
(93, 'Can add property geolocation', 24, 'add_propertygeolocation'),
(94, 'Can change property geolocation', 24, 'change_propertygeolocation'),
(95, 'Can delete property geolocation', 24, 'delete_propertygeolocation'),
(96, 'Can view property geolocation', 24, 'view_propertygeolocation');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2024-10-31 08:06:56.482920', '1', 'Project object (1)', 1, '[{\"added\": {}}]', 11, 1),
(2, '2024-10-31 16:29:04.959209', '1', 'Bluetooth', 1, '[{\"added\": {}}]', 8, 1),
(3, '2024-10-31 16:29:10.967905', '2', 'GSM', 1, '[{\"added\": {}}]', 8, 1),
(4, '2024-10-31 16:29:27.665789', '1', 'dileep13 - Bluetooth', 1, '[{\"added\": {}}]', 12, 1),
(5, '2024-10-31 16:29:43.685112', '1', 'Location for project1', 1, '[{\"added\": {}}]', 20, 1),
(6, '2024-11-05 10:10:42.023295', '1', 'admin', 2, '[{\"changed\": {\"fields\": [\"Mobile number\", \"Address\", \"Customer type\", \"Customer role\"]}}]', 19, 1),
(7, '2024-11-05 10:30:52.892841', '2', 'admin2', 1, '[{\"added\": {}}]', 19, 1),
(8, '2024-11-05 16:34:42.944096', '7', 'Dileep5 - Bluetooth', 2, '[{\"changed\": {\"fields\": [\"Battery status\", \"Device status\"]}}]', 12, 1),
(9, '2024-11-05 16:34:42.946057', '6', 'Dileep12 - Bluetooth', 2, '[{\"changed\": {\"fields\": [\"Battery status\", \"Device status\"]}}]', 12, 1),
(10, '2024-11-05 16:34:42.953217', '5', 'Dileep10 - Bluetooth', 2, '[{\"changed\": {\"fields\": [\"Battery status\", \"Device status\"]}}]', 12, 1),
(11, '2024-11-05 16:34:42.953217', '4', 'Dileep11 - GSM', 2, '[{\"changed\": {\"fields\": [\"Battery status\"]}}]', 12, 1),
(12, '2024-11-05 16:34:42.953217', '3', 'Dileep5 - Bluetooth', 2, '[{\"changed\": {\"fields\": [\"Battery status\"]}}]', 12, 1),
(13, '2024-11-05 16:34:42.953217', '2', 'Dileep4 - Bluetooth', 2, '[{\"changed\": {\"fields\": [\"Battery status\"]}}]', 12, 1),
(14, '2024-11-06 05:22:31.253525', '1', 'Location for test', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 20, 1),
(15, '2024-11-06 05:23:53.206597', '5', 'Location for test', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 20, 1),
(16, '2024-11-06 05:39:51.247836', '7', 'Location for SM Layout', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 23, 1),
(17, '2024-11-06 09:20:57.091865', '10', 'Location for project2', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 20, 1),
(18, '2024-11-06 09:55:36.194981', '9', 'Location for SM Layout', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 23, 1),
(19, '2024-11-07 09:10:29.262195', '9', 'Location for project2', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 20, 1),
(20, '2024-11-07 11:08:30.509574', '8', 'Location for SM Layout', 2, '[{\"changed\": {\"fields\": [\"Device movement\"]}}]', 23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(6, 'API', 'customer'),
(19, 'API', 'customuser'),
(12, 'API', 'device'),
(20, 'API', 'devicegeopoint'),
(21, 'API', 'devicegeopointworkingold'),
(7, 'API', 'devicestatus'),
(8, 'API', 'devicetype'),
(9, 'API', 'district'),
(10, 'API', 'geolocation'),
(11, 'API', 'project'),
(13, 'API', 'projectgeolocation'),
(22, 'API', 'property'),
(14, 'API', 'propertydevice'),
(15, 'API', 'propertydevicedevice'),
(23, 'API', 'propertydevicegeopoint'),
(24, 'API', 'propertygeolocation'),
(16, 'API', 'propertyregistration'),
(17, 'API', 'taluk'),
(18, 'API', 'village'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-10-31 07:56:47.068143'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-10-31 07:56:47.107769'),
(3, 'auth', '0001_initial', '2024-10-31 07:56:47.282082'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-10-31 07:56:47.303324'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-10-31 07:56:47.320410'),
(6, 'auth', '0004_alter_user_username_opts', '2024-10-31 07:56:47.328940'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-10-31 07:56:47.331996'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-10-31 07:56:47.334874'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-10-31 07:56:47.337142'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-10-31 07:56:47.344530'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-10-31 07:56:47.350319'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-10-31 07:56:47.352199'),
(13, 'auth', '0011_update_proxy_permissions', '2024-10-31 07:56:47.366174'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-10-31 07:56:47.369085'),
(15, 'API', '0001_initial', '2024-10-31 07:56:48.309164'),
(16, 'admin', '0001_initial', '2024-10-31 07:56:48.406414'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-10-31 07:56:48.416529'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-10-31 07:56:48.423525'),
(19, 'sessions', '0001_initial', '2024-10-31 07:56:48.450867'),
(20, 'API', '0002_alter_projectgeolocation_refference_name_and_more', '2024-10-31 15:44:05.445033'),
(21, 'API', '0003_alter_devicegeopoint_device', '2024-11-04 12:24:29.113154'),
(22, 'API', '0004_alter_devicegeopoint_device_devicegeopointworkingold', '2024-11-04 15:14:04.323494'),
(23, 'API', '0005_property_propertygeolocation_propertydevicegeopoint', '2024-11-04 16:10:36.113101'),
(24, 'API', '0006_property_customer', '2024-11-05 06:06:02.340038'),
(25, 'API', '0007_device_customer', '2024-11-05 11:29:17.085203'),
(26, 'API', '0008_alter_device_device_id', '2024-11-06 08:14:32.869698'),
(27, 'API', '0009_customuser_created_by', '2024-11-07 06:00:07.818807');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('mu2t3uic40k9961k2wl9hyimxf2wiw4k', '.eJxVjEEOwiAQRe_C2pDCULAu3fcMZGYYpGpoUtqV8e7apAvd_vfef6mI21ri1mSJU1IXZdTpdyPkh9QdpDvW26x5rusykd4VfdCmxznJ83q4fwcFW_nWlD1wB1ZCSH5IbMUIsiQhCNaBDGiNYw7gewDuu2wsmRwcGeIzBlLvD_4xOH0:1t6Q4Q:uanMGNIJHu0y-e88482gmsqcQBGBBLmgBmC_VwQ7A-4', '2024-11-14 07:58:18.401281');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_customer`
--
ALTER TABLE `api_customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `aadhar_number` (`aadhar_number`);

--
-- Indexes for table `api_customuser`
--
ALTER TABLE `api_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `API_customuser_created_by_id_7382be29_fk_API_customuser_id` (`created_by_id`);

--
-- Indexes for table `api_customuser_groups`
--
ALTER TABLE `api_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `API_customuser_groups_customuser_id_group_id_aabbcdd0_uniq` (`customuser_id`,`group_id`),
  ADD KEY `API_customuser_groups_group_id_338d2feb_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `api_customuser_user_permissions`
--
ALTER TABLE `api_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `API_customuser_user_perm_customuser_id_permission_c054fff9_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `API_customuser_user__permission_id_4e6eee8c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `api_device`
--
ALTER TABLE `api_device`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `API_device_device_id_0c7e3e47_uniq` (`device_id`),
  ADD KEY `API_device_device_type_id_b4c135ae_fk_API_devicetype_id` (`device_type_id`),
  ADD KEY `API_device_customer_id_c661f241_fk_API_customuser_id` (`customer_id`);

--
-- Indexes for table `api_devicegeopoint`
--
ALTER TABLE `api_devicegeopoint`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `API_devicegeopoint_device_id_0d3624aa_uniq` (`device_id`),
  ADD KEY `API_devicegeopoint_geolocation_id_46e8a9da_fk_API_proje` (`geolocation_id`),
  ADD KEY `API_devicegeopoint_project_id_499a4302_fk_API_project_project_id` (`project_id`);

--
-- Indexes for table `api_devicegeopointworkingold`
--
ALTER TABLE `api_devicegeopointworkingold`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_devicegeopointworkingold_device_id_6e114f3b_fk_API_device_id` (`device_id`),
  ADD KEY `API_devicegeopointwo_geolocation_id_5f9d7ca1_fk_API_proje` (`geolocation_id`),
  ADD KEY `API_devicegeopointwo_project_id_c28d4a81_fk_API_proje` (`project_id`);

--
-- Indexes for table `api_devicestatus`
--
ALTER TABLE `api_devicestatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_devicetype`
--
ALTER TABLE `api_devicetype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_district`
--
ALTER TABLE `api_district`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_geolocation`
--
ALTER TABLE `api_geolocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_geolocation_property_registratio_e55cdf52_fk_API_prope` (`property_registration_id`);

--
-- Indexes for table `api_project`
--
ALTER TABLE `api_project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `API_project_customer_id_eeef129e_fk_API_customuser_id` (`customer_id`);

--
-- Indexes for table `api_projectgeolocation`
--
ALTER TABLE `api_projectgeolocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_projectgeolocati_project_id_9cfae2eb_fk_API_proje` (`project_id`);

--
-- Indexes for table `api_property`
--
ALTER TABLE `api_property`
  ADD PRIMARY KEY (`property_id`),
  ADD KEY `API_property_district_id_1fe36631_fk_API_district_id` (`district_id`),
  ADD KEY `API_property_taluk_id_1c89f698_fk_API_taluk_id` (`taluk_id`),
  ADD KEY `API_property_village_id_13ca9719_fk_API_village_id` (`village_id`),
  ADD KEY `API_property_customer_id_4d20d4f8_fk_API_customuser_id` (`customer_id`);

--
-- Indexes for table `api_propertydevice`
--
ALTER TABLE `api_propertydevice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_propertydevice_property_id_id_f6f189ea_fk_API_prope` (`property_id_id`),
  ADD KEY `API_propertydevice_customer_id_id_289cd118_fk_API_custo` (`customer_id_id`);

--
-- Indexes for table `api_propertydevicedevice`
--
ALTER TABLE `api_propertydevicedevice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_propertydevicedevice_device_id_b7bc74c4_fk_API_device_id` (`device_id`),
  ADD KEY `API_propertydevicede_geolocation_id_1d501aaf_fk_API_geolo` (`geolocation_id`),
  ADD KEY `API_propertydevicede_property_device_id_53400613_fk_API_prope` (`property_device_id`);

--
-- Indexes for table `api_propertydevicegeopoint`
--
ALTER TABLE `api_propertydevicegeopoint`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`),
  ADD KEY `API_propertydevicege_property_id_e822b2d1_fk_API_prope` (`property_id`),
  ADD KEY `API_propertydevicege_geolocation_id_a1bbca0b_fk_API_prope` (`geolocation_id`);

--
-- Indexes for table `api_propertygeolocation`
--
ALTER TABLE `api_propertygeolocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_propertygeolocat_property_id_c65fe68e_fk_API_prope` (`property_id`);

--
-- Indexes for table `api_propertyregistration`
--
ALTER TABLE `api_propertyregistration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_propertyregistration_taluk_id_e29f2deb_fk_API_taluk_id` (`taluk_id`),
  ADD KEY `API_propertyregistration_village_id_d69ef9e6_fk_API_village_id` (`village_id`),
  ADD KEY `API_propertyregistration_district_id_b6ca79f2_fk_API_district_id` (`district_id`);

--
-- Indexes for table `api_taluk`
--
ALTER TABLE `api_taluk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_taluk_district_id_d830de85_fk_API_district_id` (`district_id`);

--
-- Indexes for table `api_village`
--
ALTER TABLE `api_village`
  ADD PRIMARY KEY (`id`),
  ADD KEY `API_village_district_id_305afc44_fk_API_district_id` (`district_id`),
  ADD KEY `API_village_taluk_id_2602f0e1_fk_API_taluk_id` (`taluk_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_API_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_customer`
--
ALTER TABLE `api_customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `api_customuser`
--
ALTER TABLE `api_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `api_customuser_groups`
--
ALTER TABLE `api_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_customuser_user_permissions`
--
ALTER TABLE `api_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_device`
--
ALTER TABLE `api_device`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `api_devicegeopoint`
--
ALTER TABLE `api_devicegeopoint`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `api_devicegeopointworkingold`
--
ALTER TABLE `api_devicegeopointworkingold`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_devicestatus`
--
ALTER TABLE `api_devicestatus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_devicetype`
--
ALTER TABLE `api_devicetype`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `api_district`
--
ALTER TABLE `api_district`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `api_geolocation`
--
ALTER TABLE `api_geolocation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `api_project`
--
ALTER TABLE `api_project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `api_projectgeolocation`
--
ALTER TABLE `api_projectgeolocation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `api_property`
--
ALTER TABLE `api_property`
  MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `api_propertydevice`
--
ALTER TABLE `api_propertydevice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `api_propertydevicedevice`
--
ALTER TABLE `api_propertydevicedevice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `api_propertydevicegeopoint`
--
ALTER TABLE `api_propertydevicegeopoint`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `api_propertygeolocation`
--
ALTER TABLE `api_propertygeolocation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `api_propertyregistration`
--
ALTER TABLE `api_propertyregistration`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `api_taluk`
--
ALTER TABLE `api_taluk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `api_village`
--
ALTER TABLE `api_village`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_customuser`
--
ALTER TABLE `api_customuser`
  ADD CONSTRAINT `API_customuser_created_by_id_7382be29_fk_API_customuser_id` FOREIGN KEY (`created_by_id`) REFERENCES `api_customuser` (`id`);

--
-- Constraints for table `api_customuser_groups`
--
ALTER TABLE `api_customuser_groups`
  ADD CONSTRAINT `API_customuser_group_customuser_id_86c1b4c6_fk_API_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  ADD CONSTRAINT `API_customuser_groups_group_id_338d2feb_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `api_customuser_user_permissions`
--
ALTER TABLE `api_customuser_user_permissions`
  ADD CONSTRAINT `API_customuser_user__customuser_id_83c5665c_fk_API_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  ADD CONSTRAINT `API_customuser_user__permission_id_4e6eee8c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `api_device`
--
ALTER TABLE `api_device`
  ADD CONSTRAINT `API_device_customer_id_c661f241_fk_API_customuser_id` FOREIGN KEY (`customer_id`) REFERENCES `api_customuser` (`id`),
  ADD CONSTRAINT `API_device_device_type_id_b4c135ae_fk_API_devicetype_id` FOREIGN KEY (`device_type_id`) REFERENCES `api_devicetype` (`id`);

--
-- Constraints for table `api_devicegeopoint`
--
ALTER TABLE `api_devicegeopoint`
  ADD CONSTRAINT `API_devicegeopoint_geolocation_id_46e8a9da_fk_API_proje` FOREIGN KEY (`geolocation_id`) REFERENCES `api_projectgeolocation` (`id`),
  ADD CONSTRAINT `API_devicegeopoint_project_id_499a4302_fk_API_project_project_id` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`project_id`);

--
-- Constraints for table `api_devicegeopointworkingold`
--
ALTER TABLE `api_devicegeopointworkingold`
  ADD CONSTRAINT `API_devicegeopointwo_geolocation_id_5f9d7ca1_fk_API_proje` FOREIGN KEY (`geolocation_id`) REFERENCES `api_projectgeolocation` (`id`),
  ADD CONSTRAINT `API_devicegeopointwo_project_id_c28d4a81_fk_API_proje` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`project_id`),
  ADD CONSTRAINT `API_devicegeopointworkingold_device_id_6e114f3b_fk_API_device_id` FOREIGN KEY (`device_id`) REFERENCES `api_device` (`id`);

--
-- Constraints for table `api_geolocation`
--
ALTER TABLE `api_geolocation`
  ADD CONSTRAINT `API_geolocation_property_registratio_e55cdf52_fk_API_prope` FOREIGN KEY (`property_registration_id`) REFERENCES `api_propertyregistration` (`id`);

--
-- Constraints for table `api_project`
--
ALTER TABLE `api_project`
  ADD CONSTRAINT `API_project_customer_id_eeef129e_fk_API_customuser_id` FOREIGN KEY (`customer_id`) REFERENCES `api_customuser` (`id`);

--
-- Constraints for table `api_projectgeolocation`
--
ALTER TABLE `api_projectgeolocation`
  ADD CONSTRAINT `API_projectgeolocati_project_id_9cfae2eb_fk_API_proje` FOREIGN KEY (`project_id`) REFERENCES `api_project` (`project_id`);

--
-- Constraints for table `api_property`
--
ALTER TABLE `api_property`
  ADD CONSTRAINT `API_property_customer_id_4d20d4f8_fk_API_customuser_id` FOREIGN KEY (`customer_id`) REFERENCES `api_customuser` (`id`),
  ADD CONSTRAINT `API_property_district_id_1fe36631_fk_API_district_id` FOREIGN KEY (`district_id`) REFERENCES `api_district` (`id`),
  ADD CONSTRAINT `API_property_taluk_id_1c89f698_fk_API_taluk_id` FOREIGN KEY (`taluk_id`) REFERENCES `api_taluk` (`id`),
  ADD CONSTRAINT `API_property_village_id_13ca9719_fk_API_village_id` FOREIGN KEY (`village_id`) REFERENCES `api_village` (`id`);

--
-- Constraints for table `api_propertydevice`
--
ALTER TABLE `api_propertydevice`
  ADD CONSTRAINT `API_propertydevice_customer_id_id_289cd118_fk_API_custo` FOREIGN KEY (`customer_id_id`) REFERENCES `api_customer` (`customer_id`),
  ADD CONSTRAINT `API_propertydevice_property_id_id_f6f189ea_fk_API_prope` FOREIGN KEY (`property_id_id`) REFERENCES `api_propertyregistration` (`id`);

--
-- Constraints for table `api_propertydevicedevice`
--
ALTER TABLE `api_propertydevicedevice`
  ADD CONSTRAINT `API_propertydevicede_geolocation_id_1d501aaf_fk_API_geolo` FOREIGN KEY (`geolocation_id`) REFERENCES `api_geolocation` (`id`),
  ADD CONSTRAINT `API_propertydevicede_property_device_id_53400613_fk_API_prope` FOREIGN KEY (`property_device_id`) REFERENCES `api_propertydevice` (`id`),
  ADD CONSTRAINT `API_propertydevicedevice_device_id_b7bc74c4_fk_API_device_id` FOREIGN KEY (`device_id`) REFERENCES `api_device` (`id`);

--
-- Constraints for table `api_propertydevicegeopoint`
--
ALTER TABLE `api_propertydevicegeopoint`
  ADD CONSTRAINT `API_propertydevicege_geolocation_id_a1bbca0b_fk_API_prope` FOREIGN KEY (`geolocation_id`) REFERENCES `api_propertygeolocation` (`id`),
  ADD CONSTRAINT `API_propertydevicege_property_id_e822b2d1_fk_API_prope` FOREIGN KEY (`property_id`) REFERENCES `api_property` (`property_id`),
  ADD CONSTRAINT `API_propertydevicegeopoint_device_id_f93335bf_fk_API_device_id` FOREIGN KEY (`device_id`) REFERENCES `api_device` (`id`);

--
-- Constraints for table `api_propertygeolocation`
--
ALTER TABLE `api_propertygeolocation`
  ADD CONSTRAINT `API_propertygeolocat_property_id_c65fe68e_fk_API_prope` FOREIGN KEY (`property_id`) REFERENCES `api_property` (`property_id`);

--
-- Constraints for table `api_propertyregistration`
--
ALTER TABLE `api_propertyregistration`
  ADD CONSTRAINT `API_propertyregistration_district_id_b6ca79f2_fk_API_district_id` FOREIGN KEY (`district_id`) REFERENCES `api_district` (`id`),
  ADD CONSTRAINT `API_propertyregistration_taluk_id_e29f2deb_fk_API_taluk_id` FOREIGN KEY (`taluk_id`) REFERENCES `api_taluk` (`id`),
  ADD CONSTRAINT `API_propertyregistration_village_id_d69ef9e6_fk_API_village_id` FOREIGN KEY (`village_id`) REFERENCES `api_village` (`id`);

--
-- Constraints for table `api_taluk`
--
ALTER TABLE `api_taluk`
  ADD CONSTRAINT `API_taluk_district_id_d830de85_fk_API_district_id` FOREIGN KEY (`district_id`) REFERENCES `api_district` (`id`);

--
-- Constraints for table `api_village`
--
ALTER TABLE `api_village`
  ADD CONSTRAINT `API_village_district_id_305afc44_fk_API_district_id` FOREIGN KEY (`district_id`) REFERENCES `api_district` (`id`),
  ADD CONSTRAINT `API_village_taluk_id_2602f0e1_fk_API_taluk_id` FOREIGN KEY (`taluk_id`) REFERENCES `api_taluk` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_API_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
