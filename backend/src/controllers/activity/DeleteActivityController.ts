import { Request, Response } from "express";
import { DeleteActivityService } from "../../services/activity/DeleteActivityService";

class DeleteActivityController {
    async handle(request: Request, response: Response){
        const activity_id = request.query.activity_id as string;
        const deleteProdcutService = new DeleteActivityService();

        const activityDeleted = await deleteProdcutService.execute({ activity_id });
        return response.json(activityDeleted);
    }
}

export { DeleteActivityController }