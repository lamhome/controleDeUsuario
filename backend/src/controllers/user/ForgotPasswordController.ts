import { Request, Response } from 'express';
import { ForgotPasswordRequest } from '../../models/interfaces/user/password/ForgotPasswordRequest';
import { ForgotPasswordService } from '../../services/user/ForgotPasswordService';

export class ForgotPasswordController {
    async handle(request: Request, response: Response) {
        try {
            const { email }: ForgotPasswordRequest = request.body;
            const forgotPasswordService = new ForgotPasswordService();
            const requestData: ForgotPasswordRequest = { email };
            const result = await forgotPasswordService.execute(requestData);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}
