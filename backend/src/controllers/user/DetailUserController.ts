import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(request: Request, response: Response){
        try{
            const user_id = request.query.user_id as string;
            const detailUserService = new DetailUserService();
            const result = await detailUserService.execute(user_id);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { DetailUserController };