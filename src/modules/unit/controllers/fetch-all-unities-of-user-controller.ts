import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFetchAllUnitiesOfUserUseCase } from "../../../shared/interfaces/modules/unit/useCases/IFetchAllUnitiesOfUserUseCase";
import FetchAllUnitiesOfUserUseCase from "../useCases/fetch-all-unities-of-user-useCase";

export default class FetchAllUnitiesOfUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const instanceOfFetchAllUnitiesOfUserUseCase = container.resolve<IFetchAllUnitiesOfUserUseCase>(FetchAllUnitiesOfUserUseCase)

            const unities = await instanceOfFetchAllUnitiesOfUserUseCase.execute(token);

            return res.status(200).json(unities);
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
