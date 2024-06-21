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
router.post('/user', new CreateUserController().handle); // ok
router.get('/token/validate_first', new ValidateFirstAccessController().handle);
router.post('/token/first_access', new LinkFirstAccessController().handle); //ok
router.post('/user/session', new AuthUserController().handle); // ok
router.get('/user/detail', isAuthenticated, new DetailUserController().handle); // ok
router.put('/user/edit', isAuthenticated, new EditUserController().handle); // ok
router.delete('/user/remove', isAuthenticated, new RemoveUserController().handle); // ok
router.get('/user/list-types', new ListAllTypesController().handle); // ok
router.get('/user/list-all', isAuthenticated, new ListAllUsersController().handle); //ok
router.get('/user/change-password', new ResetPasswordController().handle); // ok
router.post('/token/forgot_password', new ForgotPasswordController().handle); //ok
router.get('/token/validate_forgot', new ValidateTokenController().handle); //ok
router.get('/user/change-password-forgot', new ResetForgotPasswordController().handle); //ok

export { router };