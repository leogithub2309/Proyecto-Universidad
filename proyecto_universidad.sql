-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-04-2025 a las 23:18:37
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
-- Base de datos: `proyecto_universidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cedula_table`
--

CREATE TABLE `cedula_table` (
  `id_cedula` int(11) NOT NULL,
  `tipo_identidad` varchar(5) NOT NULL,
  `cedula` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cedula_table`
--

INSERT INTO `cedula_table` (`id_cedula`, `tipo_identidad`, `cedula`) VALUES
(1, 'V-', 32758403);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compras` int(11) NOT NULL,
  `compra_detalle` varchar(100) NOT NULL,
  `compra` varchar(100) NOT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `precio_compra` decimal(10,2) NOT NULL,
  `moneda` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `foto_compra` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id_direccion` int(11) NOT NULL,
  `direccion_1` varchar(50) NOT NULL,
  `direccion_2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`id_direccion`, `direccion_1`, `direccion_2`) VALUES
(1, 'Av Principal', 'Urb altos prados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moneda`
--

CREATE TABLE `moneda` (
  `id_moneda` int(11) NOT NULL,
  `id_tipo_moneda` int(11) NOT NULL,
  `monto_moneda` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_usuario`
--

CREATE TABLE `nombre_usuario` (
  `id_nombre_usuario` int(11) NOT NULL,
  `primer_nombre` varchar(50) NOT NULL,
  `segundo_nombre` varchar(50) DEFAULT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nombre_usuario`
--

INSERT INTO `nombre_usuario` (`id_nombre_usuario`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`) VALUES
(1, 'Leonel', NULL, 'Linares', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `producto_detalle` varchar(50) NOT NULL,
  `titulo_producto` varchar(50) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `moneda` int(11) NOT NULL,
  `foto_producto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `rol`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_moneda_table`
--

CREATE TABLE `tipo_moneda_table` (
  `id_tipo_moneda` int(11) NOT NULL,
  `moneda` varchar(10) NOT NULL,
  `descripcion_moneda` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_moneda_table`
--

INSERT INTO `tipo_moneda_table` (`id_tipo_moneda`, `moneda`, `descripcion_moneda`) VALUES
(1, '$', 'Dollar'),
(2, '€', 'Euro'),
(3, 'Bs', 'Bolívares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_nombre_usuario` int(11) NOT NULL,
  `id_cedula` int(11) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `codigo_postal` varchar(4) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_nombre_usuario`, `id_cedula`, `telefono`, `id_direccion`, `codigo_postal`, `username`, `password`, `id_rol`) VALUES
(9, 1, 1, '55584739217', 1, '9102', 'leoadmin', 'leoadmin123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta_detalle` int(11) NOT NULL,
  `venta_detalle` varchar(50) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cedula_table`
--
ALTER TABLE `cedula_table`
  ADD PRIMARY KEY (`id_cedula`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compras`),
  ADD KEY `compras_ibfk_1` (`moneda`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id_direccion`);

--
-- Indices de la tabla `moneda`
--
ALTER TABLE `moneda`
  ADD PRIMARY KEY (`id_moneda`),
  ADD KEY `id_tipo_moneda` (`id_tipo_moneda`);

--
-- Indices de la tabla `nombre_usuario`
--
ALTER TABLE `nombre_usuario`
  ADD PRIMARY KEY (`id_nombre_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `moneda` (`moneda`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipo_moneda_table`
--
ALTER TABLE `tipo_moneda_table`
  ADD PRIMARY KEY (`id_tipo_moneda`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_nombre_usuario` (`id_nombre_usuario`),
  ADD KEY `id_cedula` (`id_cedula`),
  ADD KEY `id_direccion` (`id_direccion`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta_detalle`),
  ADD KEY `producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cedula_table`
--
ALTER TABLE `cedula_table`
  MODIFY `id_cedula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compras` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `moneda`
--
ALTER TABLE `moneda`
  MODIFY `id_moneda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nombre_usuario`
--
ALTER TABLE `nombre_usuario`
  MODIFY `id_nombre_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_moneda_table`
--
ALTER TABLE `tipo_moneda_table`
  MODIFY `id_tipo_moneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`moneda`) REFERENCES `moneda` (`id_moneda`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `moneda`
--
ALTER TABLE `moneda`
  ADD CONSTRAINT `moneda_ibfk_1` FOREIGN KEY (`id_tipo_moneda`) REFERENCES `tipo_moneda_table` (`id_tipo_moneda`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`moneda`) REFERENCES `moneda` (`id_moneda`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_nombre_usuario`) REFERENCES `nombre_usuario` (`id_nombre_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_cedula`) REFERENCES `cedula_table` (`id_cedula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
