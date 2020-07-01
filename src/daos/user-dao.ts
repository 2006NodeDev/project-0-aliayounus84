import { PoolClient } from "pg";
import { connectionPool } from ".";
import { UserDTOtoUserConvertor } from "../utils/UserDTO-to-User-convertor";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { User } from "../models/User";
import { AuthFailureError} from '../errors/AuthFailureError'
import { UserUserInputError } from "../errors/UserUserInputError";

// Get All user 
export async function getAllUsers():Promise<User[]> {
    //first thing is declare a client
    let client: PoolClient = newFunction();
    try {
        //get a connection
        client = await connectionPool.connect()
        //send the query
        let results = await client.query(`select u.user_id, u.username , u."password" , u.email ,r.role_id , r."role" from project_0_ers.users u left join project_0_ers.roles r on u."role" = r.role_id;`)
        return results.rows.map(UserDTOtoUserConvertor)//return the rows
    } catch (e) {
        //for unknown error
        console.log(e)
        throw new Error('Unhandled Error Occured')
    } finally {
        //let the connectiopn go back to the pool
        client && client.release()
    }

    function newFunction() {
        let client: PoolClient;
        return client;
    }
}

//Get user by Id
export async function getUserById(id: number):Promise<User> {
    let client: PoolClient
    try {
        //get a connection
        client = await connectionPool.connect()
        //send the query
        let results = await client.query(`select u.user_id, 
                u.username , 
                u."password" , 
                u.email ,
                r.role_id , 
                r."role" 
                from project_0_ers.users u left join project_0_ers.users.roles r on u."role" = r.role_id 
                where u.user_id = $1;`,
            [id])

        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])//there should only ever be one row
    } catch (e) {
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        //if we get an error we don't know 
        console.log(e)
        throw new Error('Unhandled Error Occured')
    } finally {
        //let the connectiopn go back to the pool
        client && client.release()
    }
}


//find user by username and password ( login )

export async function getUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client: PoolClient
    try {
        //get a connection
        client = await connectionPool.connect()
        //send the query
        let results = await client.query(`select u."user_id", 
                u."username" , 
                u."password" , 
                u."email" ,
                r."role_id" , 
                r."role" 
                from project_0_ers.users u left join project_0_ers.roles r on u."role" = r.role_id 
                where u."username" = $1 and u."password" = $2;`,
            [username, password])
            
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])//there should only ever be one row
    } catch (e) {
        if(e.message === 'User Not Found'){
            throw new AuthFailureError()
        }
        //if we get an error we don't know 
        console.log(e)
        throw new Error('Unhandled Error Occured')
    } finally {
        //let the connectiopn go back to the pool
        client && client.release()
    }
}


// save one user
export async function saveOneUser(newUser:User):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        //if you have multiple querys, you should make a transaction
        await client.query('BEGIN;')//start a transaction
        let roleId = await client.query(`select r."role_id" from project_0_ers.roles r where r."role" = $1`, [newUser.role])
        if(roleId.rowCount === 0){
            throw new Error('Role Not Found')
        }
        roleId = roleId.rows[0].role_id
        let results = await client.query(`insert into project_0_ers.users ("username", "password","email","role")
                                            values($1,$2,$3,$4) returning "user_id" `,//allows you to return some values from the rows in an insert, update or delete
                                            [newUser.username, newUser.password, newUser.email, roleId])
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')//ends transaction
        return newUser

    }catch(e){
        client && client.query('ROLLBACK;')//if a js error takes place, undo the sql
        if(e.message === 'Role Not Found'){
            throw new UserUserInputError()// role not found error
        }
        //if we get an error we don't know 
        console.log(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}




