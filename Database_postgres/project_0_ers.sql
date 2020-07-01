create schema project_0_ers;
set schema 'project_0_ers';

drop table users;
drop table roles;
drop table ReimbursementStatus;
drop table ReimbursementType;
drop table Reimbursement;


create table roles(
"role_id" serial primary key,
 role text not null unique

);

create table users(
   "user_id" int primary key,
   "username" text not null unique,
   "password" text not null,
   "firstname" text not null,
   "lastname" text not null,
    "email" text,
   "role" int references roles("role_id") not null--FK to a role table,
   
);



  create table ReimbursementStatus(
  
  "statusId" serial primary key,
  "status" text not null unique
 
  );
 
 
   
   create table ReimbursementType(
  
  "typeId" serial primary key,
  "type" text not null unique
 
  );
 
  create table Reimbursement(
    
  "reimbursementId" int primary key,
  "author" int not null,
  "amount" int not null,
  "dateSubmitted" int not null,
  "dateResolved" int not null,
  "description" text not null,
  "resolver" int,
  "status" int  references ReimbursementStatus("statusId"), -- foriegn key  reimbursement status not null 
  "type" int references ReimbursementType("typeId")
   ); 
  
 select * from user;

   
