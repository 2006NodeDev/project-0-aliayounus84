import { Pool } from 'pg'
//entrypoint for all of the database files
// things/ config that all database files need to be completed

//build a connection pool
//a secret is any value you don't want to share with the public
export const connectionPool:Pool = new Pool({
    host: '34.73.141.171',// the public ip address of you sql instance
    user:'postgres',//user on your database ( probably postgres)
    password:'nodedev2006',//password
    database:'postgres',//name of database
    port:5432,// the database's port
    max:5//maximum number of connections
})