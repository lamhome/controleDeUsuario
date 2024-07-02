import { ListActivityByUserService } from "../../services/activity/ListActivityByUserService";
import { Request, Response } from "express";

export class ListActivityByUserController {
  async handle(request: Request, response: Response) {
    try {
      const user_id = request.query.user_id as string; // Converte para string
      if (!user_id) {
        throw new Error("User ID não fornecido");
      }
      const listActivityByUserService = new ListActivityByUserService();
      const result = await listActivityByUserService.execute(user_id);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
