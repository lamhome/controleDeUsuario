import { CreateActivityRequest } from "../../models/interfaces/activity/CreateActivityRequest";
import { CreateActivityService } from "../../services/activity/CreateActivityService";
import { Response, Request} from "express";

export class CreateActivityController {
    async handle(request: Request, response: Response){
        const {description, category_id, dt_inicial, dt_final, user_id}: CreateActivityRequest = request.body;
        const createActivityService = new CreateActivityService();
        const activity = await createActivityService.execute({
            description, category_id, dt_inicial, dt_final, user_id
        });

        return response.json(activity);
    }
}
