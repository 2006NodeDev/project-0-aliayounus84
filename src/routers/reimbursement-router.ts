import { ReimbursementDTO } from "../dtos/reimbursement-dto";
import { Reimbursement } from "../models/reimbursement";


export function ReimbursementDTOtoReimbursementConverter(rdto: ReimbursementDTO): Reimbursement{
    return {
        reimbursementId: rdto.reimbursement_id,
        author: rdto.author,
        amount: rdto.amount,
        dateSubmitted: rdto.dateSubmitted.getDate(),
        dateResolved: rdto.dateResolved.getDate(),
        description: rdto.description,
        resolver: rdto.resolver,
        status: rdto.status,
        type: rdto.type
    }

}

