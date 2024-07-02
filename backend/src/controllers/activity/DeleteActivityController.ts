import { Request, Response } from "express";
import { DeleteActivityService } from "../../services/activity/DeleteActivityService";
import { DeleteActivityRequest } from "../../models/interfaces/activity/DeleteActivityRequest";

class DeleteActivityController {
    async handle(request: Request, response: Response){
        try {
            const activity_id:DeleteActivityRequest = request.body;
            const deleteProdcutService = new DeleteActivityService();
            const activityDeleted = await deleteProdcutService.execute( activity_id );
            response.status(200).json(activityDeleted);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { DeleteActivityController }