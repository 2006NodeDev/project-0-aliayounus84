
create schema project_0_ers;
set schema 'project_0_ers';


insert into roles("role") 
	values ('ADMIN'), --strings in sql are single qouted
		   ('MANAGER'),
		   ('USER');
	  
insert into reimbursementstatus("status")
	values ('PENDING'),
			('APPROVED'),
			('DENIED');
	
insert into reimbursementtype("type")
	values ('LODGING'),
			('TRAVEL'),
			('FOOD'),
			('OTHER');
		     	  
insert into users (user_id, username, "password", firstname, lastname, email,"role")
	  values ('1','Inna', 'password34', 'morey', 'inna Morey','imorey@gmail.com','admin'),
	         ('10','John', 'password21', 'david', 'john', 'david@gmail.com','user'),
	         ('11','Jerry', 'password22', 'Jerry', 'Tom', 'tjerry@gmail.com','admin'),
	         ('12','John', 'password', 'rose', 'john', 'jrose@gmail.com','manager',
		  

insert into users("user_id","username","password",firstName, lastName, "email", role)
	values	('1','johnd','password','david','john','johnd@gmail.com','1'),
			('2','rosetaylor','password','rose','taylor','rosetaylor@gmail.com','2'),
			('4','alexa','password','fork','alexa','alexafork@gmail.com','3'),
			('5','melisa','password','Li','melisa','melisali@gmail.com','2'),
			('6','marryc','password','Clark','Marry','marryc@gmail.com','1'),
			('7','sara','password','william','Sara','sarawilliam@mail.com','1'),
			('8','richardf','password','richard','fery','richardf@gmail.com','3'),
			('9','heidi','password','richard','heidi','heidir@gmail.com','1');
			

