import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateUserController from "../controllers/create-user-controller";
import VerifyEmailController from "../controllers/verify-email-controller";
import AuthenticateUserController from "../controllers/authenticate-user-controller";
//@ImportNewController

export default class UserRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new CreateUserController().execute);
        this.router.put('/verify/email/:token', new VerifyEmailController().execute);
        this.router.post('/authenticate', new AuthenticateUserController().execute);
        //@NewController


    }

    public init(): Router {
        return this.router;
    }
}