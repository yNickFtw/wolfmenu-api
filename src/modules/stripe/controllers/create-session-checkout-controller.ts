import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateSessionCheckoutUseCase } from "../../../shared/interfaces/modules/stripe/useCases/ICreateSessionCheckoutUseCase";
import CreateSessionCheckoutUseCase from "../useCases/create-session-checkout-useCase";

export default class CreateSessionCheckoutController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { planId } = req.body;
            
            const token = req.headers["authorization"] as string;

            const instanceOfCreateSessionCheckoutUseCase = container.resolve<ICreateSessionCheckoutUseCase>(CreateSessionCheckoutUseCase)

            const url = await instanceOfCreateSessionCheckoutUseCase.execute(token, planId);

            return res.status(201).json({ message: "Checkout criado com sucesso", session: url });
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
