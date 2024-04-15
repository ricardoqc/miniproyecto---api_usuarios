-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2024 a las 16:27:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombres`, `apellidos`, `direccion`, `correo`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(120, 'John', 'Doe', '123 Main St', 'john.doe@example.com', '12345678', 35, '2022-01-01', '555-1234'),
(121, 'Jane', 'Smith', '456 Oak Rd', 'jane.smith@example.com', '87654321', 28, '2022-02-15', '555-5678'),
(122, 'Michael', 'Johnson', '789 Elm Ave', 'michael.johnson@example.com', '13579246', 42, '2022-03-01', '555-9012'),
(123, 'Emily', 'Williams', '321 Pine St', 'emily.williams@example.com', '24681012', 31, '2022-04-10', '555-3456'),
(124, 'David', 'Brown', '654 Maple Ln', 'david.brown@example.com', '98765432', 25, '2022-05-05', '555-7890'),
(125, 'Olivia', 'Davis', '987 Oak St', 'olivia.davis@example.com', '14725836', 39, '2022-06-20', '555-2345'),
(126, 'William', 'Wilson', '159 Elm Rd', 'william.wilson@example.com', '78963214', 47, '2022-07-01', '555-6789'),
(127, 'Sophia', 'Anderson', '753 Pine Ave', 'sophia.anderson@example.com', '36925814', 27, '2022-08-15', '555-0123'),
(128, 'Daniel', 'Thompson', '951 Maple Dr', 'daniel.thompson@example.com', '45781236', 33, '2022-09-01', '555-4567'),
(129, 'Avery', 'Lee', '159 Oak Ln', 'avery.lee@example.com', '78523149', 29, '2022-10-10', '555-8901'),
(130, 'Isabella', 'Harris', '753 Elm St', 'isabella.harris@example.com', '36987452', 41, '2022-11-05', '555-2345'),
(131, 'Alexander', 'Martin', '159 Pine Rd', 'alexander.martin@example.com', '78145236', 23, '2022-12-01', '555-6789'),
(132, 'Mia', 'Hernandez', '753 Oak Ave', 'mia.hernandez@example.com', '36741258', 30, '2023-01-15', '555-0123'),
(133, 'Emma', 'Reyes', '753 Elm Ln', 'emma.reyes@example.com', '36825741', 26, '2023-03-10', '555-8901'),
(134, 'Ethan', 'Diaz', '159 Pine St', 'ethan.diaz@example.com', '78123456', 44, '2023-04-01', '555-2345'),
(135, 'Benjamin', 'Morales', '159 Maple Ave', 'benjamin.morales@example.com', '78456123', 29, '2023-06-01', '555-0123'),
(136, 'Isabella', 'Torres', '753 Elm Dr', 'isabella.torres@example.com', '36741852', 35, '2023-07-10', '555-4567'),
(137, 'Abigail', 'Castillo', '753 Oak St', 'abigail.castillo@example.com', '36852741', 42, '2023-09-15', '555-2345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
