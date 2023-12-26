import { IRouter } from "../../../shared/interfaces/globals/IRouter";
  import { Router } from "express";
import StripeWebhookController from "../controllers/stripe-webhook-controller";
  

export default class StripeRouter implements IRouter {
    router: Router;
  
    constructor() {
        this.router = Router()
        this.router.post('/webhook', new StripeWebhookController().execute);
    //@NewController
    
    }
  
    public init(): Router {
        return this.router;
    }
}