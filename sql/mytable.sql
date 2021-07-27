-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 30 2021 г., 17:37
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `users_info`
--

-- --------------------------------------------------------

--
-- Структура таблицы `mytable`
--

CREATE TABLE `mytable` (
  `id` int(11) NOT NULL,
  `personalID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reg_time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sername` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone1` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone2` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone3` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seconedEmail` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `mytable`
--

INSERT INTO `mytable` (`id`, `personalID`, `role`, `email`, `password`, `name`, `reg_time`, `sername`, `photo`, `birthday`, `gender`, `bio`, `phone1`, `phone2`, `phone3`, `seconedEmail`) VALUES
(5, '4a93b790', 'ADMIN', 'kill2lolka@gmail.com', '$2b$07$nAxuDi5QYRojFoVMaxU09Oq2Qr0BAB0Kc11cKUwLwmDvSuxltDCw6', 'Egor', '1613674284.856', 'Borodavkin', 'http://localhost:3000/images/avatar/4a93b790-fa2780fe86b53e3fe9334f0da42aaf60.jpeg', '2002-09-19', NULL, 'I am from Minsk! Hi my dear friend!', '+37544775231', '', '', NULL),
(6, '7fe073f4', 'USER', 'asdasd@asdas.er', '$2b$07$TzeW3uBOGa3HDakltuCkcOX2nJjcqDiZTDeFkKrkcBsLFpvacaCmi', 'egor', '1613676893.453', NULL, 'https://www.blast.hk/attachments/64805/', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `mytable`
--
ALTER TABLE `mytable`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personalID` (`personalID`(100)),
  ADD UNIQUE KEY `email` (`email`(100));

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `mytable`
--
ALTER TABLE `mytable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
