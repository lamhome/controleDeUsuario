import { Request, Response } from 'express';
import { ResetPasswordWithTokenRequest } from '../../models/interfaces/user/password/ResetPasswordWithTokenRequest'; 
import { ResetPasswordWithTokenService } from '../../services/user/ResetPasswordWithTokenService';

class ResetPasswordWithTokenController {
    async handle(request: Request, response: Response) {

        try {
            const { user_id, newPassword } : ResetPasswordWithTokenRequest = request.body;
            const resetPasswordWithTokenService = new ResetPasswordWithTokenService();
            const result = await resetPasswordWithTokenService.execute({
                user_id, newPassword
            });
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { ResetPasswordWithTokenController }