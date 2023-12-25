import { Router } from "express";
import { IRouter } from "../interfaces/globals/IRouter";
import { container } from "tsyringe";
import UserRouter from "../../modules/user/router/user.router";
import UnitRouter from "../../modules/unit/router/unit.router";
//@ImportRouter

export default class MainRouter implements IRouter {
    router: Router;

    constructor(
        private userRouter = container.resolve<IRouter>(UserRouter),
        private unitRouter = container.resolve<IRouter>(UnitRouter),
        //@InstanceRouter

    ) {
        this.router = Router();
        this.router.use('/users', this.userRouter.init());
        this.router.use('/unities', this.unitRouter.init());
        //@NewInitInstance
    }

    public init(): Router {
        return this.router;
    }
}
