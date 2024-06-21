import { Request, Response } from 'express';
import { ResetPasswordRequest } from '../../models/interfaces/password/ResetPasswordRequest'; 
import { ResetPasswordService } from '../../services/password/ResetPasswordService';

class ResetPasswordController {
    async handle(request: Request, response: Response) {

        try {
            const { user_id, password } : ResetPasswordRequest = request.body;
            console.log(user_id);
            console.log(password);
            const resetPasswordService = new ResetPasswordService();
            const result = await resetPasswordService.execute({
                user_id, password
            });
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { ResetPasswordController }