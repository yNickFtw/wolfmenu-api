import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateCategoryController from "../controllers/create-category-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";


export default class CategoryRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, new CreateCategoryController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}