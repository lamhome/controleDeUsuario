import { Request, Response } from 'express';
import { ResetForgotPasswordRequest } from '../../models/interfaces/password/ResetForgotPasswordRequest'; 
import { ResetForgotPasswordService } from '../../services/password/ResetForgotPasswordService';

class ResetForgotPasswordController {
    async handle(request: Request, response: Response) {
        try {
            // Extrai os valores de token e password dos parâmetros de query
            const token = request.query.token as string;
            const password = request.query.password as string;
  
            // Cria um objeto com os tipos corretos
            const requestData: ResetForgotPasswordRequest = {
                token,
                password
            };
    
            const resetForgotPasswordService = new ResetForgotPasswordService();
            const result = await resetForgotPasswordService.execute(requestData);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    } 
}

export { ResetForgotPasswordController }