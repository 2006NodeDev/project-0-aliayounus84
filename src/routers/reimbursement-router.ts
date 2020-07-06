import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from "../middleware/authentication-middleware";
import { getReimbursementbyStatusId } from "../daos/reimbursement-dao";
import { authorizationMiddleware } from "../middleware/authorization-middleware"

export const reimbursementRouter = express.Router()

// this applies this middleware to the entire router beneath it
reimbursementRouter.use(authenticationMiddleware)



//get by id
reimbursementRouter.get('/author/userid/:id',authorizationMiddleware(['Finance-Manager']), async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    if (isNaN(+id)) {
        // send a response telling them they need to give us a number
        res.status(400).send('Id needs to be a number')
    } else {
        try {
            let reimbursement = await getReimbursementbyStatusId(+id)
            res.json(reimbursement)
        } catch (e) {
            next(e)
        }
    }
})
