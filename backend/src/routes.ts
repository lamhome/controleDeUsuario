import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController} from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { EditUserController } from "./controllers/user/EditUserController";
import { ForgotPasswordController } from "./controllers/user/ForgotPasswordController";
import { ValidateTokenController } from "./controllers/user/ValidateTokenController";
import { ResetPasswordWithTokenController } from "./controllers/user/ResetPasswordWithTokenController";


const router = Router();

router.get("/test", (request: Request, response: Response ) => {
    return response.json({ ok: true });
});

// User Routers
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', isAuthenticated, isAdmin, new RemoveUserController().handle);
router.put('/user/edit', isAuthenticated, isAdmin, new EditUserController().handle);
router.post('/forgot-password', new ForgotPasswordController().handle);
router.get('/validate-token', new ValidateTokenController().handle);
router.post('/change-password', new ResetPasswordWithTokenController().handle);

export { router };