import { ListAllUsersService } from "../../services/user/ListAllUsersService";
import { Request, Response} from "express";

export class ListAllUsersController {
    async handle(request: Request, response: Response){
        const listAllUsersService = new ListAllUsersService();
        const listUsers = await listAllUsersService.execute();

        return response.json(listUsers);
    }
}