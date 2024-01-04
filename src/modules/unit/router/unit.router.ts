import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateUnitController from "../controllers/create-unit-controller";
import { container } from "tsyringe";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FetchAllUnitiesOfUserController from "../controllers/fetch-all-unities-of-user-controller";
import FetchUnitByIdController from "../controllers/fetch-unit-by-id-controller";

export default class UnitRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new AuthGuardMiddleware().execute, new CreateUnitController().execute);
        this.router.get('/find/all', new AuthGuardMiddleware().execute, new FetchAllUnitiesOfUserController().execute);
        this.router.get('/find/:unitId', new AuthGuardMiddleware().execute, new FetchUnitByIdController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}