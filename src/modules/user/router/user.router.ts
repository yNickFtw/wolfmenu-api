import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateUserController from "../controllers/create-user-controller";
import VerifyEmailController from "../controllers/verify-email-controller";
import AuthenticateUserController from "../controllers/authenticate-user-controller";
import FetchLoggedUserController from "../controllers/fetch-logged-user-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import ForgotPasswordController from "../controllers/forgot-password-controller";
    //@ImportNewController

export default class UserRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new CreateUserController().execute);
        this.router.put('/verify/email/:token', new VerifyEmailController().execute);
        this.router.post('/authenticate', new AuthenticateUserController().execute);
        this.router.get('/fetch/logged/user', new AuthGuardMiddleware().execute, new FetchLoggedUserController().execute);
        this.router.post('/forgot/password', new ForgotPasswordController().execute);
    //@NewController
    

    }

    public init(): Router {
        return this.router;
    }
}