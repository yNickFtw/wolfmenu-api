import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IForgotPasswordUseCase } from "../../../shared/interfaces/modules/user/useCases/IForgotPasswordUseCase";
import ForgotPasswordUseCase from "../useCases/forgot-password-useCase";

export default class ForgotPasswordController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body

            const instanceOfForgotPasswordUseCase = container.resolve<IForgotPasswordUseCase>(ForgotPasswordUseCase)

            await instanceOfForgotPasswordUseCase.execute(email)

            return res.status(200).json({ message: "Caso o email seja válido, um link será enviado em alguns instantes para o mesmo." });
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
