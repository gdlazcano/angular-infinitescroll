-- Active: 1669760802863@@127.0.0.1@3306@prueba

-- create review TABLE
CREATE TABLE IF NOT EXISTS `reviews` (
  -- uuid
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `score` float NOT NULL,
  `image` varchar(255) NOT NULL,
  
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
