-- Active: 1669760802863@@127.0.0.1@3306@prueba

-- create user table

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- create review TABLE

CREATE TABLE IF NOT EXISTS `reviews` (
  -- uuid id
  `id` varchar(36) NOT NULL,
  `user_id` int(11),
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `score` float NOT NULL,
  `image` varchar(255) NOT NULL,

  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- add title column to reviews

DELETE FROM reviews;
