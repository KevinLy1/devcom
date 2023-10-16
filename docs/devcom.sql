CREATE DATABASE IF NOT EXISTS devcom CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE devcom;

CREATE TABLE IF NOT EXISTS users (
  id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F', 'O') NULL,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  avatar VARCHAR(255) NULL,
  biography TEXT NULL,
  web_url VARCHAR(255) NULL,
  date_registration DATETIME NOT NULL,
  role ENUM('administrator', 'user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS skills (
  id_skill INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS social_networks (
  id_social_network INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publications (
  id_publication INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type ENUM('article', 'discussion') NOT NULL DEFAULT 'article',
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  content TEXT NOT NULL,
  image VARCHAR(255) NULL,
  id_user INT NULL,
  date_creation DATETIME NOT NULL,
  date_update DATETIME NULL,
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  id_category INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comments (
  id_comment INT NOT NULL AUTO_INCREMENT,
  id_user INT NULL,
  id_publication INT NOT NULL,
  content TEXT NOT NULL,
  parent_comment INT NULL,
  date_creation DATETIME NOT NULL,
  date_update DATETIME NULL,
  PRIMARY KEY (id_comment),
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (id_publication) REFERENCES publications (id_publication) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (parent_comment) REFERENCES comments (id_comment) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_skills (
  id_user INT NOT NULL,
  id_skill INT NOT NULL,
  PRIMARY KEY (id_user, id_skill),
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_skill) REFERENCES skills (id_skill) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_social_networks (
  id_user INT NOT NULL,
  id_social_network INT NOT NULL,
  link VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_user, id_social_network),
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_social_network) REFERENCES social_networks (id_social_network) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_favorite_publications (
  id_user INT NOT NULL,
  id_publication INT NOT NULL,
  PRIMARY KEY (id_user, id_publication),
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_publication) REFERENCES publications (id_publication) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publication_categories (
  id_publication INT NOT NULL,
  id_category INT NOT NULL,
  PRIMARY KEY (id_publication, id_category),
  FOREIGN KEY (id_publication) REFERENCES publications (id_publication) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publication_reputations (
  id_user INT NOT NULL,
  id_publication INT NOT NULL,
  reputation_value INT NOT NULL,
  PRIMARY KEY (id_user, id_publication),
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_publication) REFERENCES publications (id_publication) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Contraintes sur les réputations
ALTER TABLE publication_reputations
  ADD CONSTRAINT constraint_reputation_value CHECK (reputation_value = 1 OR reputation_value = -1);
