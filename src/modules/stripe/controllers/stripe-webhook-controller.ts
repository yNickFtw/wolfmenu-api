import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IStripeWebhookUseCase } from "../../../shared/interfaces/modules/stripe/useCases/IStripeWebhookUseCase";
import StripeWebhookUseCase from "../useCases/stripe-webhook-useCase";

export default class StripeWebhookController implements IController {
    public async execute(req: any, res: Response): Promise<Response> {
        try {
            const sig = req.headers['stripe-signature'];

            const instanceOfStripeWebhookUseCase = container.resolve<IStripeWebhookUseCase>(StripeWebhookUseCase)

            await instanceOfStripeWebhookUseCase.execute(req.rawBody, sig)

            return res.status(200).json();
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Estamos passando por instabilidades, tente novamente mais tarde!",
                        errorMessage: error.message
                    });
            }
        }
    }
}
