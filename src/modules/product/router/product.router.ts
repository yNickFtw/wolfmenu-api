import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import { upload } from "../../../shared/middlewares/MulterMiddleware/multer-middleware";
import CreateProductController from "../controllers/create-product-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllProductsByUnitIdController from "../controllers/find-all-product-by-unitId-controller";

export default class ProductRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, upload.single('file'), new CreateProductController().execute);
        this.router.get('/find/all/:unitId/:page/:totalRows', new AuthGuardMiddleware().execute, new FindAllProductsByUnitIdController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}