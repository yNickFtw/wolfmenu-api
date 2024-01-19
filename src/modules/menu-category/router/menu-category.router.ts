import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AddCategoryToMenuController from "../controllers/add-category-to-menu-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllMenuCategoriesController from "../controllers/find-all-menu-categories-controller";
import ChangePositionByMenuCategoryController from "../controllers/change-position-by-menu-category-controller";

export default class MenuCategoryRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/add/category/to/:menuId', new AuthGuardMiddleware().execute, new AddCategoryToMenuController().execute);
        this.router.get('/find/all/:menuId', new AuthGuardMiddleware().execute, new FindAllMenuCategoriesController().execute);
        this.router.put('/change/position/:menuCategoryId/to/:menuCategoryIdToChange/:menuId', new AuthGuardMiddleware().execute, new ChangePositionByMenuCategoryController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}