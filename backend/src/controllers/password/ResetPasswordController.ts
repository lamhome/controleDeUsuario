import { Request, Response } from 'express';
import { ResetPasswordRequest } from '../../models/interfaces/password/ResetPasswordRequest'; 
import { ResetPasswordService } from '../../services/password/ResetPasswordService';

class ResetPasswordController {
    async handle(request: Request, response: Response) {

        try {
            const { user_id, newPassword } : ResetPasswordRequest = request.body;
            const resetPasswordWithTokenService = new ResetPasswordService();
            const result = await resetPasswordWithTokenService.execute({
                user_id, newPassword
            });
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { ResetPasswordController }