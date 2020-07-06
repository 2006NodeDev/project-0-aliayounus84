

import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTOtoReimbursementConverter } from "../utils/reimbursementDTO-to-reimbursement";
import {UserNotFoundError} from "../errors/UserNotFoundError"




//Get user by Id
export async function getReimbursementbyStatusId(id: number):Promise<Reimbursement[]>{
    let client: PoolClient
    try {
        //get a connection
        client = await connectionPool.connect()
        //send the query
        
        let results = await client.query('select r."reimbursementId", r."author",  r."amount", r."dateSubmitted", r."dateResolved", r."description", r."resolver", rs."statusId", rs."status", rt."typeId", rt."type" from project_0_ers.reimbursement r left join project_0_ers.reimbursementstatus rs on r."status" = rs."statusId" left join project_0_ers.reimbursementtype rt on r."type" = rt."typeId" left join project_0_ers.users u on r."author" = u."user_id" where u.user_id = $1 by r."dateSubmitted"'[id]);

        
        return results.rows.map(ReimbursementDTOtoReimbursementConverter)
    
      
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





// // Delete a Reimbursement
// export async function deleteReimbursement(deletedReimbursement: Reimbursement): Promise<Reimbursement>{
    
//     let client: PoolClient
    
//     try{
//         client = await connectionPool.connect()
      
//         let results = await client.query(`delete from project_0_ers.reimbursement where "reimbursementId" = $1`, [deletedReimbursement.reimbursementId])

//         if(results.rowCount === 0){
//             throw new Error('Reimbursement not found')
//         }

//         return deletedReimbursement

//     }catch(e){
//         if(e.message === 'Reimbursement not found'){
//             throw new ResourceNotFoundError()
//         }
//         console.log(e)
//         throw new Error('Unhandled Error Occured')
        
//     }finally{
//         client && client.release();
//     }
// }

