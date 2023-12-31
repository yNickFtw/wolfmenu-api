import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateSessionCheckoutUseCase } from "../../../shared/interfaces/modules/stripe/useCases/ICreateSessionCheckoutUseCase";
import CreateSessionCheckoutUseCase from "../useCases/create-session-checkout-useCase";

export default class CreateSessionCheckoutController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfCreateSessionCheckoutUseCase = container.resolve<ICreateSessionCheckoutUseCase>(CreateSessionCheckoutUseCase)

            return res.status(201).json();
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
