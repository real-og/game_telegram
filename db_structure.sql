create database management;

CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            id_tg bigint,
            name varchar(50) default NULL,
            score int default 0
);