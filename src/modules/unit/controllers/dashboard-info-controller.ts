import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IDashboardInfoUseCase } from "../../../shared/interfaces/modules/unit/useCases/IDashboardInfoUseCase";
import DashboardInfoUseCase from "../useCases/dashboard-info-useCase";

export default class DashboardInfoController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { unitId } = req.params
            
            const token = req.headers["authorization"] as string;

            const instanceOfDashboardInfoUseCase = container.resolve<IDashboardInfoUseCase>(DashboardInfoUseCase)

            const data = await instanceOfDashboardInfoUseCase.execute(token, unitId);

            return res.status(200).json(data);
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
