import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFetchLoggedUserUseCase } from "../../../shared/interfaces/modules/user/useCases/IFetchLoggedUserUseCase";
import FetchLoggedUserUseCase from "../useCases/fetch-logged-user-useCase";

export default class FetchLoggedUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfFetchLoggedUserUseCase = container.resolve<IFetchLoggedUserUseCase>(FetchLoggedUserUseCase)

            const user = await instanceOfFetchLoggedUserUseCase.execute(req.headers["authorization"] as string);

            return res.status(200).json(user);
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
