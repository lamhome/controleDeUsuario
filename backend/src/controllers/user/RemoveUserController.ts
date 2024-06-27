import { Request, Response } from "express";
import { RemoveUserService } from "../../services/user/RemoveUserService";
import { RemoveUserRequest } from "../../models/interfaces/user/RemoveUserRequest";

class RemoveUserController{
    async handle(request: Request, response: Response) {

        try {
            const user_id:RemoveUserRequest = request.body;
            const removeUserService = new RemoveUserService();
            const result = await removeUserService.execute( user_id );
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { RemoveUserController }
