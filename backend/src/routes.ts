import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController} from "./controllers/auth/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { EditUserController } from "./controllers/user/EditUserController";
import { ForgotPasswordController } from "./controllers/password/ForgotPasswordController";
import { ValidateTokenController } from "./controllers/password/ValidateTokenController";
import { ResetPasswordController } from "./controllers/password/ResetPasswordController";
import { LinkFirstAccessController } from "./controllers/password/LinkFirstAccessController";
import { ValidateFirstAccessController } from "./controllers/password/ValidateFirstAccessController";


const router = Router();

router.get("/test", (request: Request, response: Response ) => {
    return response.json({ ok: true });
});

// User Routers
router.post('/user', new CreateUserController().handle);
router.delete('/user/remove', isAuthenticated, isAdmin, new RemoveUserController().handle);
router.put('/user/edit', isAuthenticated, isAdmin, new EditUserController().handle);
router.post('/user/change-password', new ResetPasswordController().handle);
router.post('/user/activate', new ValidateFirstAccessController().handle);
router.post('/user/session', new AuthUserController().handle);
router.get('/user/me', isAuthenticated, new DetailUserController().handle);
router.get('/token/validate_forgot', new ValidateTokenController().handle);
router.get('/token/validate_first', new ValidateFirstAccessController().handle);
router.post('/token/forgot_password', new ForgotPasswordController().handle);
router.post('/token/first_access', new LinkFirstAccessController().handle);

export { router };