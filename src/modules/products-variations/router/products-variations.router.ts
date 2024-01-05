import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateProductVariationController from "../controllers/create-product-variation-controller";
import FetchAllProductsVariationsController from "../controllers/fetch-all-products-variations-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";

export default class ProductsVariationsRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new AuthGuardMiddleware().execute, new CreateProductVariationController().execute);
        this.router.get('/find/all', new AuthGuardMiddleware().execute, new FetchAllProductsVariationsController().execute);
    //@NewController
    

    }

    public init(): Router {
        return this.router;
    }
}