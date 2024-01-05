import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import { upload } from "../../../shared/middlewares/MulterMiddleware/multer-middleware";
import CreateProductController from "../controllers/create-product-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";

export default class ProductRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new AuthGuardMiddleware().execute, upload.single('file'), new CreateProductController().execute);
        //@NewController


    }

    public init(): Router {
        return this.router;
    }
}