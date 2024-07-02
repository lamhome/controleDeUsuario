import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/auth/AuthUserController";
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
import { ListActivityByUserController } from "./controllers/activity/ListActivityByUserController";
import { DetailActivityController } from "./controllers/activity/DetailActivityController";

const router = Router();

// User Routers
router.post('/user', new CreateUserController().handle);
router.get('/token/validate_first', new ValidateFirstAccessController().handle);
router.post('/token/first_access', new LinkFirstAccessController().handle);
router.post('/user/session', new AuthUserController().handle);
router.get('/user/detail', isAuthenticated, new DetailUserController().handle);
router.put('/user/edit', isAuthenticated, new EditUserController().handle);
router.put('/user/remove', isAuthenticated, new RemoveUserController().handle);
router.put('/user/unlock', isAuthenticated, new UnlockUserController().handle);
router.get('/user/list-types', new ListAllTypesController().handle);
router.get('/user/list-all', isAuthenticated, new ListAllUsersController().handle);
router.get('/user/change-password', new ResetPasswordController().handle);
router.post('/token/forgot_password', new ForgotPasswordController().handle);
router.get('/token/validate_forgot', new ValidateTokenController().handle);
router.get('/user/change-password-forgot', new ResetForgotPasswordController().handle);
router.post('/activity', isAuthenticated, new CreateActivityController().handle);
router.put('/activity/edit', isAuthenticated, new EditActivityController().handle);
router.put('/activity/delete', isAuthenticated, new DeleteActivityController().handle);
router.get('/activity/list-categories', isAuthenticated, new ListAllCategoriesController().handle);
router.get('/activity/list-all', isAuthenticated, new ListActivityByUserController().handle);
router.get('/activity/detail', isAuthenticated, new DetailActivityController().handle);

export { router };
