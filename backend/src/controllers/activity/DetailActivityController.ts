import { Request, Response } from "express";
import { DetailActivityService } from "../../services/activity/DetailActivityService";

class DetailActivityController {
    async handle(request: Request, response: Response){
        try{
            const activity_id = request.query.activity_id as string;
            const detailActivityService = new DetailActivityService();
            const result = await detailActivityService.execute(activity_id);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { DetailActivityController };