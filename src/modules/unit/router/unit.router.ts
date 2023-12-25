import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateUnitController from "../controllers/create-unit-controller";
import { container } from "tsyringe";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";

export default class UnitRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new AuthGuardMiddleware().execute, new CreateUnitController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}