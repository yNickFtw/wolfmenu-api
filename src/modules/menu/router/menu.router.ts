import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateMenuByUnitIdController from "../controllers/create-menu-by-unitId-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindMenuByUnitIdController from "../controllers/find-menu-by-unitId-controller";


export default class MenuRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, new CreateMenuByUnitIdController().execute);
        this.router.get('/find/:unitId', new AuthGuardMiddleware().execute, new FindMenuByUnitIdController().execute);
    //@NewController
    

    }

    public init(): Router {
        return this.router;
    }
}