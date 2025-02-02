import { Request, Response } from "express"
import { AuthUserService } from "../../services/auth/AuthUserService"
import { AuthRequest } from "../../models/interfaces/auth/AuthRequest"

class AuthUserController {

    async handle( request: Request, response: Response) {
        const { email, password }: AuthRequest = request.body;
        const authUserService = new AuthUserService();
        const auth = await authUserService.execute({
            email, password
        });

        return response.json(auth);
    }
}

export { AuthUserController }