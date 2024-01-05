import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";


export default class MenuRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        //@NewController
    }

    public init(): Router {
        return this.router;
    }
}