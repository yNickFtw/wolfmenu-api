import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AddProductToMenuCategoryController from "../controllers/add-product-to-menu-category-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
//@ImportNewController

export default class MenuProductRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/add/product/to/:menuId', new AuthGuardMiddleware().execute, new AddProductToMenuCategoryController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}