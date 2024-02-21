import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
//@ImportNewController

export default class ViewLinkRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        //@NewController
    }

    public init(): Router {
        return this.router;
    }
}