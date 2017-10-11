DROP DATABASE IF EXISTS testdb_portfolio;
CREATE DATABASE testdb_portfolio;
USE testdb_portfolio;
CREATE TABLE Projects (
  Name VARCHAR(50) NOT NULL,
  Category JSON,
  tags JSON,
  PRIMARY KEY (Name)
);
INSERT INTO Projects (Name, Category, tags) VALUES("Fire the Chef", '["School"]', '{"tools": ["git", "ps", "sass", "js"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("Machina Tutorial", '["School"]', '{"tools": ["git", "ps", "sass", "js"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("Photography Portfolio Website", '["School", "Client"]', '{"tools": ["git", "ps", "sass", "js", "wordpress", "xd", "ai", "php"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("The End Tree", '["Personal", "Client"]', '{"tools": ["git", "ps", "sass", "js", "wordpress", "xd", "ai", "php"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("RSVP App", '["Personal"]', '{"tools": ["git", "sass", "js", "es6", "react"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("Portfolio", '["Personal"]', '{"tools": ["git", "sass", "js", "es6", "react", "express", "sql"]}');
INSERT INTO Projects (Name, Category, tags) VALUES("Hours Tracker", '["Personal"]', '{"tools": ["js", "es6", "node"]}');
