import { Request, Response } from "express";
import { ValidateTokenService } from "../../services/password/ValidateTokenService";


class ValidateTokenController {
    async handle(request: Request, response: Response) {

        try {
            const token = request.query.token as string;
            const validateTokenService = new ValidateTokenService();
            const result = await validateTokenService.execute({token});
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { ValidateTokenController }