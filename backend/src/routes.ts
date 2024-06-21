import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController} from "./controllers/auth/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { EditUserController } from "./controllers/user/EditUserController";
import { ForgotPasswordController } from "./controllers/password/ForgotPasswordController";
import { ValidateTokenController } from "./controllers/password/ValidateTokenController";
import { ResetPasswordController } from "./controllers/password/ResetPasswordController";
import { LinkFirstAccessController } from "./controllers/password/LinkFirstAccessController";
import { ValidateFirstAccessController } from "./controllers/password/ValidateFirstAccessController";
import { ListAllUsersController } from "./controllers/user/ListAllUsersController";
import { ListAllTypesController } from "./controllers/user/ListAllTypesController";
import { ResetForgotPasswordController } from "./controllers/password/ResetForgotPasswordController";


const router = Router();

// User Routers
router.post('/user', new CreateUserController().handle);
router.delete('/user/remove', isAuthenticated, new RemoveUserController().handle);
router.put('/user/edit', isAuthenticated, new EditUserController().handle);
router.get('/user/change-password', new ResetPasswordController().handle);
router.get('/user/change-password-forgot', new ResetForgotPasswordController().handle);
router.post('/user/session', new AuthUserController().handle);
router.get('/user/detail', isAuthenticated, new DetailUserController().handle);
router.get('/user/list-types', new ListAllTypesController().handle);
router.get('/user/list-all', isAuthenticated, new ListAllUsersController().handle); 
router.get('/token/validate_forgot', new ValidateTokenController().handle);
router.get('/token/validate_first', new ValidateFirstAccessController().handle);
router.post('/token/forgot_password', new ForgotPasswordController().handle);
router.post('/token/first_access', new LinkFirstAccessController().handle);

export { router };