import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/reimbursement";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError"




// Delete a Reimbursement
export async function deleteReimbursement(deletedReimbursement: Reimbursement): Promise<Reimbursement>{
    
    let client: PoolClient
    
    try{
        client = await connectionPool.connect()
      
        let results = await client.query(`delete from project_0_ers.reimbursement where "reimbursementId" = $1`, [deletedReimbursement.reimbursementId])

        if(results.rowCount === 0){
            throw new Error('Reimbursement not found')
        }

        return deletedReimbursement

    }catch(e){
        if(e.message === 'Reimbursement not found'){
            throw new ResourceNotFoundError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occured')
        
    }finally{
        client && client.release();
    }
}

