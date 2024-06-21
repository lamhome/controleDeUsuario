import { Request, Response } from "express";
import { RemoveUserService } from "../../services/user/RemoveUserService";

class RemoveUserController{
    async handle(request: Request, response: Response) {

        try {
            const user_id = request.query.user_id as string;
            const removeUserService = new RemoveUserService();
            const result = await removeUserService.execute({ user_id });
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { RemoveUserController }
