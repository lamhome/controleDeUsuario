import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";
import { EditUserRequest } from "../../models/interfaces/user/EditUserRequest";

class EditUserController {
    async handle(request: Request, response: Response){
        
        const {name, type_id, user_id}:EditUserRequest = request.body; 
        const editUserService = new EditUserService();
        
        const UserEdited = editUserService.execute({ name, type_id, user_id })
        return response.json(UserEdited);
    }
}

export { EditUserController }