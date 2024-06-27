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
import { UnlockUserController } from "./controllers/user/UnlockUserController";
import { CreateActivityController } from "./controllers/activity/CreateActivityController";
import { EditActivityController } from "./controllers/activity/EditActivityController";
import { DeleteActivityController } from "./controllers/activity/DeleteActivityController";
import { ListAllCategoriesController } from "./controllers/activity/ListAllCategoriesController";


const router = Router();

// User Routers
router.post('/user', new CreateUserController().handle); // ok
router.get('/token/validate_first', new ValidateFirstAccessController().handle);
router.post('/token/first_access', new LinkFirstAccessController().handle); //ok
router.post('/user/session', new AuthUserController().handle); // ok
router.get('/user/detail', isAuthenticated, new DetailUserController().handle); // ok
router.put('/user/edit', isAuthenticated, new EditUserController().handle); // ok
router.put('/user/remove', isAuthenticated, new RemoveUserController().handle); // ok
router.put('/user/unlock', isAuthenticated, new UnlockUserController().handle); // ok
router.get('/user/list-types', new ListAllTypesController().handle); // ok
router.get('/user/list-all', isAuthenticated, new ListAllUsersController().handle); //ok
router.get('/user/change-password', new ResetPasswordController().handle); // ok
router.post('/token/forgot_password', new ForgotPasswordController().handle); //ok
router.get('/token/validate_forgot', new ValidateTokenController().handle); //ok
router.get('/user/change-password-forgot', new ResetForgotPasswordController().handle); //ok
router.post('/activity', isAuthenticated, new CreateActivityController().handle); // ok
router.put('/activity/edit', isAuthenticated, new EditActivityController().handle); // ok
router.delete('/activity/delete', isAuthenticated, new DeleteActivityController().handle) //ok
router.get('/user/list-categories', new ListAllCategoriesController().handle) //ok

export { router };