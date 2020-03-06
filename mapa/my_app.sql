-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-03-2020 a las 09:18:15
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `id_restaurant` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `king_food` set('Mexicano','Vegetariano','Mediterráneo','Japonés','Italiano','Asiático') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`id_restaurant`, `name`, `address`, `lat`, `lng`, `king_food`) VALUES
(0, 'Casa Carmen Passeig de Gracia', 'Carrer de Casp, 17, 08010 Barcelona', 41.3894, 2.17033, 'Mediterráneo,Italiano'),
(1, 'Restaurante Avocado Universitat', 'Carrer de Muntaner, 32, 08011 Barcelona', 41.3857, 2.16098, 'Vegetariano,Mediterráneo'),
(2, 'Sato i Tanaka', 'Carrer del Bruc, 79, 08009 Barcelona', 41.3947, 2.16896, 'Vegetariano,Japonés,Asiático'),
(3, 'Koy Shunka', 'Carrer d\'en Copons, 7, 08002 Barcelona', 41.3858, 2.17538, 'Japonés,Asiático'),
(4, 'Meneghina', 'Carrer dels Tiradors, 2, 08003 Barcelona', 41.388, 2.18088, 'Mediterráneo,Italiano'),
(5, 'Restaurante 7 Portes', 'Passeig d\'Isabel II, 14, 08003 Barcelona', 41.3822, 2.18323, 'Vegetariano,Mediterráneo'),
(6, 'Hawker 45', 'Carrer de Casp, 45, 08010 Barcelona', 41.3922, 2.1742, 'Asiático'),
(7, 'Bún Bò Viêtnam', 'Carrer dels Sagristans, 3, 08002 Barcelona', 41.3851, 2.17506, 'Vegetariano,Asiático'),
(8, 'Teresa Carles', 'Carrer de Jovellanos, 2, 08001 Barcelona', 41.3853, 2.16798, 'Vegetariano,Mediterráneo'),
(9, 'Veggie garden', 'Gran Via de les Corts Catalanes, 602, 08007 Barcelona', 41.3868, 2.1653, 'Vegetariano,Mediterráneo'),
(10, 'Bacaro', 'Carrer de Jerusalem, 6, 08001 Barcelona', 41.3813, 2.17152, 'Mediterráneo,Italiano'),
(11, 'Meneghina', 'Carrer dels Tiradors, 2, 08003 Barcelona', 41.388, 2.18083, 'Vegetariano,Mediterráneo,Italiano'),
(12, 'Taquerías Tamarindo', 'Carrer d\'Aragó, 236, 08007 Barcelona', 41.3901, 2.16225, 'Mexicano'),
(13, 'La Adelita Botanero', 'Carrer de Muntaner, 100, 08036 Barcelona', 41.3887, 2.15705, 'Mexicano');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD UNIQUE KEY `id_restaurant` (`id_restaurant`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
