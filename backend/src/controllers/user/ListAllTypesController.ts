import { Request, Response } from "express";
import { ListAllTypesService } from "../../services/user/ListAllTypesService";

class ListAllTypesController {
    async handle(request: Request, response: Response) {
        const listAllTypesService = new ListAllTypesService();
        try {
            const types = await listAllTypesService.execute();
            return response.json(types);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export { ListAllTypesController };