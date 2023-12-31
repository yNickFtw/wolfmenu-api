import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFetchAllPlansUseCase } from "../../../shared/interfaces/modules/plan/useCases/IFetchAllPlansUseCase";
import FetchAllPlansUseCase from "../useCases/fetch-all-plans-useCase";

export default class FetchAllPlansController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfFetchAllPlansUseCase = container.resolve<IFetchAllPlansUseCase>(FetchAllPlansUseCase)

            const plans = await instanceOfFetchAllPlansUseCase.execute();

            return res.status(200).json(plans);
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
