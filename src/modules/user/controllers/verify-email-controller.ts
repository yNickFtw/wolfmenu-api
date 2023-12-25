import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IVerifyEmailUseCase } from "../../../shared/interfaces/modules/user/useCases/IVerifyEmailUseCase";
import VerifyEmailUseCase from "../useCases/verify-email-useCase";

export default class VerifyEmailController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { token } = req.params

            const instanceOfVerifyEmailUseCase = container.resolve<IVerifyEmailUseCase>(VerifyEmailUseCase)

            await instanceOfVerifyEmailUseCase.execute(token);

            return res.status(200).json({ message: "Seu e-mail foi verificado com sucesso!" });
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                        "Estamos passando por instabilidades, por favor tente novamente mais tarde.",
                        errorMessage: error.message
                    });
            }
        }
    }
}
