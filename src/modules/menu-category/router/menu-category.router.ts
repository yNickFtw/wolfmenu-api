import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AddCategoryToMenuController from "../controllers/add-category-to-menu-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllMenuCategoriesController from "../controllers/find-all-menu-categories-controller";

export default class MenuCategoryRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/add/category/to/:menuId', new AuthGuardMiddleware().execute, new AddCategoryToMenuController().execute);
        this.router.get('/find/all/:menuId', new FindAllMenuCategoriesController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}