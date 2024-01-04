import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFetchUnitByIdUseCase } from "../../../shared/interfaces/modules/unit/useCases/IFetchUnitByIdUseCase";
import FetchUnitByIdUseCase from "../useCases/fetch-unit-by-id-useCase";

export default class FetchUnitByIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const instanceOfFetchUnitByIdUseCase = container.resolve<IFetchUnitByIdUseCase>(FetchUnitByIdUseCase)

            const unit = await instanceOfFetchUnitByIdUseCase.execute(token, unitId);

            return res.status(200).json(unit);
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
