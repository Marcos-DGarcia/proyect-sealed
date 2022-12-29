-- Database para la APP completa 
create database sealed;
use sealed;
create table viajes(
	idViaje int unsigned not null auto_increment,
    nombre varchar(150) not null,
    primary key (idViaje)
);
