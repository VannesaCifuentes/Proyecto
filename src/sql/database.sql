create database royecto;
use royecto;
create table usuarios2(
    id int not null PRIMARY KEY auto_increment,
    nombre varchar (50) not null, 
    apellido varchar (50) not null,
    correo varchar (255) not null,
    telefono int (15) not null,
    pass varchar (255) not null,
    subject varchar(25)
    );
    describe usuarios2;