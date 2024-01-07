import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateCategoryController from "../controllers/create-category-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllCategoriesByUnitIdController from "../controllers/find-all-categories-by-unitId-controller";

export default class CategoryRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, new CreateCategoryController().execute);
        this.router.get('/find/all/:unitId/:page', new AuthGuardMiddleware().execute, new FindAllCategoriesByUnitIdController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}