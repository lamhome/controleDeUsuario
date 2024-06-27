import { Request, Response } from "express";
import { UnlockUserService } from "../../services/user/UnlockUserService";
import { UnlockUserRequest } from "../../models/interfaces/user/UnlockUserRequest";

class UnlockUserController{
    async handle(request: Request, response: Response) {

        try {
            const user_id:UnlockUserRequest = request.body;
            const unlockUserService = new UnlockUserService();
            const result = await unlockUserService.execute( user_id );
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { UnlockUserController }
