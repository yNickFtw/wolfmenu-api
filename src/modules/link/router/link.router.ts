import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AddLinkController from "../controllers/add-link-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllLinksByUnitIdController from "../controllers/find-all-links-by-unit-id-controller";
import UpdatePositionsController from "../controllers/update-positions-controller";
//@ImportNewController

export default class LinkRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:unitId', new AuthGuardMiddleware().execute, new AddLinkController().execute);
        this.router.get('/find/all/:unitId', new AuthGuardMiddleware().execute, new FindAllLinksByUnitIdController().execute);
        this.router.put('/update/positions/:unitId', new AuthGuardMiddleware().execute, new UpdatePositionsController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}