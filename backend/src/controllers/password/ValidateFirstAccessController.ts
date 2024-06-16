import { Response, Request } from "express";
import { ValidateFirstAccessService } from "../../services/password/ValidateFirstAccessService";

class ValidateFirstAccessController {
    async handle(request: Request, response: Response) {
        try {
            const token = request.query.token as string;
            const validateFirstAccessService = new ValidateFirstAccessService();
            const result = await validateFirstAccessService.execute({ token });
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { ValidateFirstAccessController };