import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import StripeWebhookController from "../controllers/stripe-webhook-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import CreateSessionCheckoutController from "../controllers/create-session-checkout-controller";


export default class StripeRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/webhook', new StripeWebhookController().execute);
        this.router.post('/create/session/checkout', new AuthGuardMiddleware().execute, new CreateSessionCheckoutController().execute);
        //@NewController


    }

    public init(): Router {
        return this.router;
    }
}