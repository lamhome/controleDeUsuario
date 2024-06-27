import { Request, Response } from "express";
import { ListAllCategoriesService } from "../../services/activity/ListAllCategoriesService";

class ListAllCategoriesController {
    async handle(request: Request, response: Response) {
        const listAllCategoriesService = new ListAllCategoriesService();
        try {
            const categories = await listAllCategoriesService.execute();
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export { ListAllCategoriesController };