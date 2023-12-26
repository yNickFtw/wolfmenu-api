import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IStripeWebhookUseCase } from "../../../shared/interfaces/modules/stripe/useCases/IStripeWebhookUseCase";
import stripe from 'stripe'

@injectable()
export default class StripeWebhookUseCase implements IStripeWebhookUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(body: any, sig: any): Promise<any> {
        let event;

        try {
            event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_SECRET_KEY!);

            console.log(event.type);

            console.log("Chegou aqui")
        } catch (error: any) {
            console.log("Chegou aqui erro")
            const errorE: IAppError = {
                statusCode: 400,
                message: error.message
            }

            throw errorE
        }
    }
}
