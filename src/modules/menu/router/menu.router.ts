import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateMenuByUnitIdController from "../controllers/create-menu-by-unitId-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindMenuByUnitIdController from "../controllers/find-menu-by-unitId-controller";
import { upload } from "../../../shared/middlewares/MulterMiddleware/multer-middleware";
import ChangeBannerImageController from "../controllers/change-banner-image-controller";


export default class MenuRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, upload.single('file'), new CreateMenuByUnitIdController().execute);
        this.router.get('/find/:unitId', new AuthGuardMiddleware().execute, new FindMenuByUnitIdController().execute);
        this.router.put('/change/banner/image/:menuId', new AuthGuardMiddleware().execute, upload.single('file'), new ChangeBannerImageController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}