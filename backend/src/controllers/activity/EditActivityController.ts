import { Request, Response } from "express";
import { EditActivityService } from "../../services/activity/EditActivityService";
import { EditActivityRequest } from "../../models/interfaces/activity/EditActivityRequest";

class EditActivityController {
    async handle(request: Request, response: Response){
        
        const { activity_id, description, category_id, dt_inicial, dt_final }:EditActivityRequest = request.body; 
        const editActivityService = new EditActivityService();
        
        const ActivityEdited = editActivityService.execute({ activity_id, description, category_id, dt_inicial, dt_final })
        
        return response.json(ActivityEdited);
    }
}

export { EditActivityController }