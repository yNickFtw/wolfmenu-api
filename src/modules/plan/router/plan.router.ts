import { IRouter } from "../../../shared/interfaces/globals/IRouter";
  import { Router } from "express";
import CreatePlanController from "../controllers/create-plan-controller";
  

export default class PlanRouter implements IRouter {
    router: Router;
  
    constructor() {
        this.router = Router()
        this.router.post('/create', new CreatePlanController().execute);
    //@NewController
    
    }
  
    public init(): Router {
        return this.router;
    }
}